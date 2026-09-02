import type { FuseResult } from "fuse.js";

interface HighlightableItem {
  id: string | null;
  textContent: string | null;
}

interface HighlightedResult {
  id: string;
  snippets: string[];
}

// Distanza (in caratteri) entro cui due corrispondenze vicine vengono unite
// in un unico frammento di contesto, ed entro cui si espande il contesto
// attorno a ogni corrispondenza.
const CONTEXT_DISTANCE = 100;

function hightlight(
  results: FuseResult<HighlightableItem>[]
): HighlightedResult[] {
  return results.map((e) => {
    const id: string = e.item.id!;
    const text: string = e.item.textContent!;

    const rawMatches: number[][] = (e.matches ?? [])
      .flatMap((m) => m.indices.map((range) => [range[0], range[1]]))
      .sort(compareNumbers);

    const mergedMatches = mergeMatches(rawMatches, CONTEXT_DISTANCE);

    // Il frammento HTML (con <span>) viene costruito PER OGNI porzione di
    // testo già ritagliata dal testo semplice: così gli indici usati per
    // ritagliare il contesto e quelli usati per inserire i tag <span> non si
    // mescolano mai, ed è impossibile ottenere un tag aperto senza la
    // relativa chiusura (come poteva succedere prima, quando i tag venivano
    // inseriti nel testo intero PRIMA di calcolare il contesto).
    const snippets = mergedMatches.map((match) => buildSnippet(text, match));

    return { id, snippets };
  });
}

// ORDINAMENTO PER POSIZIONE DI INIZIO
function compareNumbers(a: number[], b: number[]): number {
  return a[0] - b[0];
}

// UNISCE CORRISPONDENZE VICINE (entro `distance` caratteri) IN UN UNICO INTERVALLO
function mergeMatches(matches: number[][], distance: number): number[][] {
  if (matches.length === 0) return [];
  const merged: number[][] = [[...matches[0]]];
  for (let i = 1; i < matches.length; i++) {
    const last = merged[merged.length - 1];
    const [start, end] = matches[i];
    if (start - last[1] <= distance) {
      last[1] = Math.max(last[1], end);
    } else {
      merged.push([start, end]);
    }
  }
  return merged;
}

// COSTRUISCE UN FRAMMENTO DI TESTO CON CONTESTO ATTORNO ALLA CORRISPONDENZA,
// EVIDENZIANDO SOLO LA PARTE EFFETTIVAMENTE TROVATA
function buildSnippet(text: string, match: number[]): string {
  const [matchStart, matchEnd] = match;

  const windowStart = expandToBoundary(
    text,
    Math.max(matchStart - CONTEXT_DISTANCE, 0),
    -1
  );
  const windowEnd = expandToBoundary(
    text,
    Math.min(matchEnd + CONTEXT_DISTANCE, text.length - 1),
    1
  );

  const snippet = text.substring(windowStart, windowEnd + 1);
  const localStart = matchStart - windowStart;
  const localEnd = matchEnd - windowStart;

  return addSpan(snippet, localStart, localEnd);
}

// ESPANDE UN INDICE FINO AL PROSSIMO SEPARATORE (spazio, virgola, punto e
// virgola, due punti) PER NON TAGLIARE UNA PAROLA A METÀ.
// direction: -1 verso sinistra, +1 verso destra.
function expandToBoundary(
  text: string,
  index: number,
  direction: -1 | 1
): number {
  const isBoundary = (char: string | undefined) =>
    char === undefined || /[\s,;:]/.test(char);
  while (
    index > 0 &&
    index < text.length - 1 &&
    !isBoundary(text[index + direction])
  ) {
    index += direction;
  }
  return index;
}

// INSERISCE UN UNICO <span class="highlight"> ATTORNO ALLA CORRISPONDENZA
function addSpan(text: string, start: number, end: number): string {
  const before = text.substring(0, start);
  const match = text.substring(start, end + 1);
  const after = text.substring(end + 1);
  return `${before}<span class="highlight">${match}</span>${after}`;
}

export default hightlight;
export type { HighlightedResult };
