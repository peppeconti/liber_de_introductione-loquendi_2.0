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

const fuse = new Fuse(data, options);

function run(label, query) {
  const results = fuse.search(query);
  console.log("=== " + label + " (" + query + ") ===");
  for (const r of results) {
    console.log(r.item.id, "score:", r.score, "indices:", JSON.stringify(r.matches?.[0]?.indices));
  }
  console.log("total:", results.length);
}

run("plain no-operator amen", "amen");
run("exact =amen", '="amen"');
run("include 'amen", "'amen");
run("exact phrase multi word", '="et amen"');
