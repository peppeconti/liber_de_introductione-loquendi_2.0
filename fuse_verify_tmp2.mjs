import Fuse from "./node_modules/fuse.js/dist/fuse.mjs";

// Riproduce toFuseQuery("parola1|parola2") con la logica attuale (bacata)
const EXTENDED_SYNTAX = /^['=!^]/;
function toFuseQueryOld(search) {
  if (EXTENDED_SYNTAX.test(search) || search.endsWith("$") || search.includes("|")) {
    return search;
  }
  return `'"${search}"`;
}

const data = [
  { id: "a", textContent: "In principio erat verbum, et amen dico vobis, gloria patri." },
  { id: "b", textContent: "Nihil hic continetur simile quaesito." },
  { id: "c", textContent: "Amenities are not a word here, but Amen is at the start." },
];
const options = { includeMatches: true, findAllMatches: true, ignoreLocation: true, useExtendedSearch: true, keys: ["textContent"], includeScore: true };
const fuse = new Fuse(data, options);

const raw = "amen|xyzxyz";
const q = toFuseQueryOld(raw);
const results = fuse.search(q);
console.log(`OLD: typed "${raw}" -> query "${q}" -> ${results.length} result(s): ${results.map(r=>r.item.id+":"+r.score).join(", ")}`);
