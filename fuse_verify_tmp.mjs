import Fuse from "./node_modules/fuse.js/dist/fuse.mjs";

const data = [
  { id: "a", textContent: "In principio erat verbum, et amen dico vobis, gloria patri." },
  { id: "b", textContent: "Nihil hic continetur simile quaesito." },
  { id: "c", textContent: "Amenities are not a word here, but Amen is at the start." },
];

const options = {
  includeMatches: true,
  findAllMatches: true,
  ignoreLocation: true,
  useExtendedSearch: true,
  keys: ["textContent"],
  includeScore: true,
};

const EXTENDED_SYNTAX = /^['=!^]/;
function toFuseQuery(search) {
  if (EXTENDED_SYNTAX.test(search) || search.endsWith("$") || search.includes("|")) {
    return search;
  }
  return `'"${search}"`;
}

const fuse = new Fuse(data, options);
function run(raw) {
  const q = toFuseQuery(raw);
  const results = fuse.search(q);
  console.log(`typed "${raw}" -> fuse query "${q}" -> ${results.length} result(s): ${results.map(r=>r.item.id).join(",")}`);
}

run("amen");
run("Amen");
run("!amen");
run("^In");
run("amen dico");
