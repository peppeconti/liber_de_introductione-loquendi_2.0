import Fuse from "./node_modules/fuse.js/dist/fuse.mjs";

const OPERATOR_PREFIX = /^['=!^]/;

function sanitizeTerm(term) {
  if (term === "") return term;
  if (OPERATOR_PREFIX.test(term) || term.endsWith("$")) {
    return term; // l'utente ha già usato un operatore esplicito
  }
  if (term.startsWith('"') && term.endsWith('"') && term.length > 1) {
    return `'${term}`; // frase già tra virgolette: la rendiamo "include-match"
  }
  return `'"${term}"`; // parola/token semplice: cercata alla lettera
}

function tokenize(branch) {
  return branch.match(/"[^"]*"|\S+/g) ?? [];
}

function toFuseQuery(search) {
  return search
    .split("|")
    .map((branch) => branch.trim())
    .filter((branch) => branch !== "")
    .map((branch) => tokenize(branch).map(sanitizeTerm).join(" "))
    .join(" | ");
}

// --- test della sola funzione (senza Fuse) ---
const cases = [
  "amen",
  "amen dico",
  "amen|xyzxyz",
  "amen | dico",
  '="scheme language"',
  "!amen",
  "^In",
  "mundi$",
  '"amen dico"',
  "'amen",
];
for (const c of cases) {
  console.log(`"${c}" -> "${toFuseQuery(c)}"`);
}

console.log("\n--- verifica con Fuse reale ---");
const data = [
  { id: "a", textContent: "In principio erat verbum, et amen dico vobis, gloria patri." },
  { id: "b", textContent: "Nihil hic continetur simile quaesito." },
  { id: "c", textContent: "Amenities are not a word here, but Amen is at the start." },
];
const options = { includeMatches: true, findAllMatches: true, ignoreLocation: true, useExtendedSearch: true, keys: ["textContent"], includeScore: true };
const fuse = new Fuse(data, options);
function run(raw) {
  const q = toFuseQuery(raw);
  const results = fuse.search(q);
  console.log(`typed "${raw}" -> query "${q}" -> ${results.length}: ${results.map(r=>r.item.id).join(",")}`);
}
run("amen|xyzxyz");
run("amen");
run("xyzxyz");
run("amen dico");
run("amen|nihil");
run("!amen");
