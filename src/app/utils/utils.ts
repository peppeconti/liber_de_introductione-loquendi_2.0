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
  // MERGING ADIACENT MATCHES
  function mergeMatches(
    matches: Array<number[]>,
    distance: number,
    // deep copy of nested array
    copyMatches: Array<number[]> = JSON.parse(JSON.stringify(matches))
  ): Array<number[]> {
    for (let i = 0; i < matches.length; i++) {
      if (matches[i + 1]) {
        if (matches[i + 1][0] - matches[i][1] <= distance) {
          copyMatches[i][1] = copyMatches[i + 1][1];
          copyMatches.splice(i + 1, 1);
          return mergeMatches(copyMatches, distance);
        }
      }
    }
    return copyMatches;
  }
  // EXOANDING MATCHES
  function expandMatches(
    matches: Array<number[]>,
    distance: number,
    text: string
  ): Array<number[]> {
    for (let i = 0; i < matches.length; i++) {
      matches[i][0] - distance < 0
        ? (matches[i][0] = 0)
        : (matches[i][0] = matches[i][0] - distance);

      while (text[matches[i][0] - 1] !== " ") {
        if (matches[i][0] === 0) {
          break;
        } else {
          matches[i][0] = matches[i][0] - 1;
        }
      }

      matches[i][1] + distance > text.length
        ? (matches[i][1] = text.length)
        : (matches[i][1] = matches[i][1] + distance);

      while (text[matches[i][1] + 1] !== " ") {
        if (matches[i][1] === text.length) {
          break;
        } else {
          matches[i][1] = matches[i][1] + 1;
        }
      }
    }
    return matches;
  }
  // ADDING SPAN WITH HIGHLIGHT CLASS
  function addSpan(
    text: string,
    matches: Array<number[]>,
    accumulator: number = 0
  ) {
    matches.forEach((e) => {
      const match = text.substring(e[0] + accumulator, e[1] + 1 + accumulator);
      const hightlightedMatch = `<span class="highlight">${match}</span>`;
      const previous = text.substring(0, e[0] + accumulator);
      const last = text.substring(e[1] + 1 + accumulator, text.length);
      text = previous + hightlightedMatch + last;
      // UPDATING INDEXES
      e[0] = e[0] + accumulator;
      accumulator = accumulator + hightlightedMatch.length - match.length;
      e[1] = e[1] + accumulator;
      // UPDATED INDEXES
    });
    return text;
  }
  // RETURN AN OBJECT
  return results.map((e) => {
    const id: string = e.item.id;
    const text: string = e.item.textContent;
    /*const mergedMatches: Array<number[]> = mergeMatches(
      e.matches[0].indices.sort(compareNumbers)
    );*/
    const matches: Array<number[]> = e.matches[0].indices.sort(compareNumbers);
    const hightlightedText = addSpan(text, matches);
    //console.log(hightlightedText.substring(mergedMatches[i][0], mergedMatches[i][1]+1));
    const mergedMatches: Array<number[]> = mergeMatches(matches, 100);
    const expandedMatches: Array<number[]> = expandMatches(
      mergedMatches,
      100,
      hightlightedText
    );

    expandedMatches.forEach((e) =>
      console.log(hightlightedText.substring(e[0], e[1] + 1))
    );
    return { id, text: hightlightedText, matches: expandedMatches };
  });
}

export { nextUntil, findAttributeValue, isSubset, hightlight };
