import Fuse from "./node_modules/fuse.js/dist/fuse.mjs";

const data = [
  { id: "a", textContent: "In principio erat verbum, et amen dico vobis, gloria patri." },
  { id: "b", textContent: "Nihil hic continetur simile quaesito." },
  { id: "c", textContent: "Amenities are not a word here, but Amen is at the start." },
  { id: "d", textContent: "Finis mundi." },
];

const options = {
  includeMatches: true,
  findAllMatches: true,
  ignoreLocation: true,
  useExtendedSearch: true,
  keys: ["textContent"],
  includeScore: true,
};

const fuse = new Fuse(data, options);

function run(label, query) {
  const results = fuse.search(query);
  console.log("=== " + label + " (" + query + ") ===");
  for (const r of results) {
    console.log(r.item.id, "score:", r.score, "indices:", JSON.stringify(r.matches?.[0]?.indices));
  }
  console.log("total:", results.length);
}

run("prefix ^In", "^In");
run("prefix ^amen (mid-string, should fail if anchored to field start)", "^amen");
run("suffix mundi$", "mundi$");
run("suffix patri$ (mid-string, should fail if anchored to field end)", "patri$");
run("exclude !amen", "!amen");
run("include quoted multi word 'et amen", "'\"et amen\"");
run("include quoted phrase not present 'et amen inversed", "'\"amen et\"");
