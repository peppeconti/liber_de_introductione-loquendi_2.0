import { UUID } from "angular2-uuid";

type SearchNode = {
  tagName: string | null;
  type: string | null;
  textContent: string | null;
  id: string | null;
};

function nextUntil(start: Element, container: Element[]) {
  while (
    start.nextElementSibling! &&
    start.nextElementSibling!.nodeName !== "pb"
  ) {
    container.push(start.nextElementSibling!);
    start = start.nextElementSibling!;
  }
  return container;
}

function isSubset(
  arr1: [{ name: string; value: string }],
  arr2: Array<{ name: string; value: string }> | null
) {
  if (arr1 && arr2) {
    return arr1.every((a: { name: string; value: string }) =>
      arr2.find(
        (b: { name: string; value: string }) =>
          a.name === b.name && a.value === b.value
      )
    );
  } else if (arr1 && (!arr2 || arr2.length < 1)) {
    return false;
  } else {
    return true;
  }
}

function findAttributeValue(
  attributes: Array<{ name: string; value: string }> | null,
  attribute: string
) {
  const val = attributes?.find((e) => e.name === attribute);
  return val?.value;
}

// HIGHLIGHT

function hightlight(results: any[]): any[] {
  // SORTING
  function compareNumbers(a: number[], b: number[]) {
    return a[0] - b[1];
  }
  // MARGIN ADIACENT MATCHES
  function mergeMatches(
    matches: Array<number[]>,
    // deep copy of nested array
    copyMatches: Array<number[]> = JSON.parse(JSON.stringify(matches))
  ): Array<number[]> {
    for (let i = 0; i < matches.length; i++) {
      if (matches[i + 1]) {
        if (matches[i + 1][0] - matches[i][1] <= 4) {
          copyMatches[i][1] = copyMatches[i + 1][1];
          copyMatches.splice(i + 1, 1);
          return mergeMatches(copyMatches);
        }
      }
    }
    return copyMatches;
  }
  // ADDING SPAN WITH HIGHLIGHT CLASS
  function addSpan(
    text: string,
    matches: Array<number[]>,
    accumulator: number = 0
  ) {
    matches.forEach((e) => {
      const match = text.substring(e[0]+accumulator, e[1]+1+accumulator);
      const hightlightedMatch = `<span id="${UUID.UUID()}" class="highlight">${match}</span>`;
      const previous = text.substring(0, e[0]+accumulator);
      const last = text.substring(e[1]+1+accumulator, text.length);
      text = previous + hightlightedMatch + last;
      accumulator = accumulator + hightlightedMatch.length - match.length;
      console.log(text)
    });
    return text;
  }
  // RETURN AN OBJ
  return results.map((e) => {
    const id = e.item.id;
    const text = e.item.textContent;
    const mergedMatches: Array<number[]> = mergeMatches(
      e.matches[0].indices.sort(compareNumbers)
    );
    const hightlightedText = addSpan(text, mergedMatches);
    return { id, text: hightlightedText };
  });
}

//const matches: Array<number[]> = e.matches[0].indices;
//const sortedMatsches: Array<number[]> =
//e.matches[0].indices.sort(compareNumbers);

export { nextUntil, findAttributeValue, isSubset, hightlight };
