export type JsonNode = {
  tagName: string | null;
  isText: boolean;
  text: string | null;
  attributes: Array<{ name: string; value: string }> | null;
  childNodes: Array<JsonNode> | null;
};

export type Settings = {
  showTranslation: boolean,
  showApparatus: boolean,
  showNotes: boolean
}

export type NavInfos = {
  next: string | undefined | null,
  prev: string | undefined | null,
  active: string | undefined | null
}