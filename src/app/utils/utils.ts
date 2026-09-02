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

function isWhitespaceOnlyTextNode(node: Node): boolean {
  // True only for a Text node whose *entire* content is whitespace (spaces,
  // tabs, newlines) -- i.e. pure XML pretty-printing indentation between
  // tags. Never true for a node that mixes whitespace with real words, so
  // filtering these out can never merge two words together.
  return (
    node.nodeType === Node.TEXT_NODE && /^\s*$/.test(node.textContent ?? "")
  );
}

export { nextUntil, findAttributeValue, isSubset, isWhitespaceOnlyTextNode };