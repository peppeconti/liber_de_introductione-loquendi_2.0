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