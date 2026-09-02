// verifica finale end-to-end con la stessa logica ora in results.component.ts
import Fuse from "./node_modules/fuse.js/dist/fuse.mjs";
const OPERATOR_PREFIX = /^['=!^]/;
function sanitizeBranch(branch) {
  const t = branch.trim();
  if (t === "") return null;
  if (OPERATOR_PREFIX.test(t) || t.endsWith("$")) return t;
  if (t.startsWith('"') && t.endsWith('"') && t.length > 1) return `'${t}`;
  return `'"${t}"`;
}
function toFuseQuery(search) {
  return search.split("|").map(sanitizeBranch).filter((b) => b !== null).join(" | ");
}
const data = [
  { id: "a", textContent: "In principio erat verbum, et amen dico vobis, gloria patri." },
  { id: "b", textContent: "Nihil hic continetur simile quaesito." },
  { id: "c", textContent: "Amenities are not a word here, but Amen is at the start." },
];
const options = { includeMatches: true, findAllMatches: true, ignoreLocation: true, useExtendedSearch: true, keys: ["textContent"], includeScore: true };
const fuse = new Fuse(data, options);
function run(raw) {
  const q = toFuseQuery(raw);
  const r = fuse.search(q);
  console.log(`"${raw}" -> ${r.length} risultati: ${r.map(x=>x.item.id).join(",") || "(nessuno)"}`);
}
run("amen|xyzxyz");
run("xyzxyz");
run("amen|nihil");
