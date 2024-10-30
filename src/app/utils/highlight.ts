function hightlight(results: any[]): any[] {
  // RETURN AN OBJECT
  return results.map((e) => {
    const id: string = e.item.id;
    const text: string = e.item.textContent;
    const matches: Array<number[]> = cutOverlappingInside(
      cutOverlappingRight(
        cutOverlappingLeft(e.matches[0].indices).sort(compareNumbers)
      )
    );
    const highlightedText = addSpan(text, matches);
    const mergedMatches: Array<number[]> = mergeMatches(matches, 100);
    const expandedMatches: Array<number[]> = expandMatches(
      mergedMatches,
      100,
      highlightedText
    );


    return { id, text: highlightedText, matches: expandedMatches };
  });
}

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

// EXPANDING MATCHES
function expandMatches(
    matches: Array<number[]>,
    distance: number,
    text: string
  ): Array<number[]> {
    for (let i = 0; i < matches.length; i++) {
      matches[i][0] - distance < 0
        ? (matches[i][0] = 0)
        : (matches[i][0] = matches[i][0] - distance);

      if (text[matches[i][0] - 1]) {
        while (!text[matches[i][0] - 1].match(/[\s,;:<>]/g)) {
          if (matches[i][0] === 0) {
            break;
          } else {
            matches[i][0] = matches[i][0] - 1;
          }
        }
      }

      matches[i][1] + distance > text.length
        ? (matches[i][1] = text.length)
        : (matches[i][1] = matches[i][1] + distance);

      if (text[matches[i][1] + 1]) {
        while (!text[matches[i][1] + 1].match(/[\s,;:<>]/g)) {
          if (matches[i][1] === text.length) {
            break;
          } else {
            matches[i][1] = matches[i][1] + 1;
          }
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

function cutOverlappingLeft(array: Array<number[]>): Array<number[]> {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (
        array[j][0] < array[i][0] &&
        array[j][1] <= array[i][1] &&
        array[j][1] >= array[i][0]
      ) {
        console.log(array[j]);
        console.log(array[i]);
        array[i][0] = array[j][0];
        array.splice(j, 1);
        return cutOverlappingLeft(array);
      }
    }
  }
  return array;
}

function cutOverlappingRight(array: Array<number[]>): Array<number[]> {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (
        array[j][1] > array[i][1] &&
        array[j][0] >= array[i][0] &&
        array[j][0] <= array[i][1]
      ) {
        console.log(array[j]);
        console.log(array[i]);
        array[i][1] = array[j][1];
        array.splice(j, 1);
        return cutOverlappingRight(array);
      }
    }
  }
  return array;
}

function cutOverlappingInside(array: Array<number[]>): Array<number[]> {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (
        (array[j][0] > array[i][0] && array[j][1] <= array[i][1]) ||
        (array[j][0] >= array[i][0] && array[j][1] < array[i][1]) ||
        (array[j][0] > array[i][0] && array[j][1] < array[i][1])
      ) {
        //array[j][1] = array[i][1];
        //array[j][0] = array[i][0];
        array.splice(j, 1);
        return cutOverlappingInside(array);
      }
    }
  }
  return array;
}

export default hightlight;
