export type JsonNode = {
  tagName: string | null;
  isText: boolean;
  text: string | null;
  attributes: Array<{ name: string; value: string }> | null;
  childNodes: Array<JsonNode> | null;
  id: string;
  textContent: string | null;
};

export type Settings = {
  showTranslation: boolean;
  showApparatus: boolean;
  showNotes: boolean;
};

export type NavInfos = {
  next: string | undefined | null;
  prev: string | undefined | null;
  active: string | undefined | null;
};

export type Credits = {
  titles: JsonNode[] | undefined | null;
  responsability: JsonNode[] | undefined | null;
  publicationStmt: JsonNode[] | undefined | null;
};
