import Fuse from "./node_modules/fuse.js/dist/fuse.mjs";

const OPERATOR_PREFIX = /^['=!^]/;

function sanitizeBranch(branch) {
  const b = branch.trim();
  if (b === "") return null;
  if (OPERATOR_PREFIX.test(b) || b.endsWith("$")) return b;
  if (b.startsWith('"') && b.endsWith('"') && b.length > 1) return `'${b}`;
  return `'"${b}"`;
}

function toFuseQuery(search) {
  return search.split("|").map(sanitizeBranch).filter(Boolean).join(" | ");
}

const cases = ["amen", "amen dico", "amen|xyzxyz", "amen | dico", "!amen", "^In", "mundi$", '"amen dico"', "'amen"];
for (const c of cases) console.log(`"${c}" -> "${toFuseQuery(c)}"`);

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
run("amen dico");
run("xyzxyz|amen");
run("amen|nihil");
run("!amen");
run("amen dico|xyzxyz");
