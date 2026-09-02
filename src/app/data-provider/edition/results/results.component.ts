import {
  Component,
  computed,
  input,
  Input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
  ChangeDetectionStrategy
} from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { SearchComponent } from "../shared/search/search.component";
import hightlight, { HighlightedResult } from "../../../utils/highlight";
import Fuse from "fuse.js";
import { ResultComponent } from "./result/result.component";

type SearchNode = {
  tagName: string | null;
  type: string | null;
  textContent: string | null;
  id: string | null;
};

const options = {
  includeMatches: true,
  findAllMatches: true,
  ignoreLocation: true,
  useExtendedSearch: true,
  keys: ["textContent"],
  includeScore: true,
};

// Un termine/frase digitato senza operatori (', =, !, ^ come prefisso, $ come
// suffisso) viene cercato ALLA LETTERA (operatore ' di Fuse + virgolette),
// così digitare una parola o frase normale dà risultati precisi invece che
// "quasi tutto" (il comportamento di default di Fuse, senza operatori, è
// troppo permissivo su testi lunghi). L'operatore | (oppure) viene invece
// gestito qui: ogni "ramo" separato da | viene sanificato allo stesso modo,
// altrimenti un ramo senza operatore erediterebbe lo stesso problema.
const OPERATOR_PREFIX = /^['=!^]/;

function sanitizeBranch(branch: string): string | null {
  const trimmed = branch.trim();
  if (trimmed === "") {
    return null;
  }
  if (OPERATOR_PREFIX.test(trimmed) || trimmed.endsWith("$")) {
    return trimmed; // l'utente ha già usato la sintassi avanzata di Fuse
  }
  if (trimmed.startsWith('"') && trimmed.endsWith('"') && trimmed.length > 1) {
    return `'${trimmed}`; // frase già tra virgolette: la rendiamo "include-match"
  }
  return `'"${trimmed}"`; // parola/frase semplice: cercata alla lettera
}

function toFuseQuery(search: string): string {
  return search
    .split("|")
    .map(sanitizeBranch)
    .filter((branch): branch is string => branch !== null)
    .join(" | ");
}

@Component({
    selector: "app-results",
    imports: [HeaderComponent, SearchComponent, ResultComponent],
    templateUrl: "./results.component.html",
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: "./results.component.css"
})
export class ResultsComponent implements OnInit, OnChanges {
  @Input({ required: true }) data: Document | undefined;
  s = input<string | null>();
  searchField = computed<SearchNode[]>(() => this.getSearchField(this.data!));
  results = signal<HighlightedResult[] | undefined>(undefined);
  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty("s") && changes["s"].currentValue) {
      console.log(this.searchField()[0].textContent);
      const text = this.searchField();
      const search = this.s()?.trim();
      if (!search) {
        this.results.set([]);
        return;
      }
      const query = toFuseQuery(search);
      if (!query) {
        this.results.set([]);
        return;
      }
      const fuse = new Fuse(text, options);
      const results = fuse.search(query);
      this.results.set(hightlight(results));
    }
  }

  private getSearchField(xml: Document): SearchNode[] {
    const searchField: NodeList | null | undefined =
      xml.querySelectorAll("div[type=latin]");
    const json = this.parseNode(searchField);
    return json;
  }

  private parseNode(nodes: NodeList) {
    const nodesArray = Array.from(nodes);
    const result = nodesArray.map((node) => {
      const nodeObj: SearchNode = {
        tagName: null,
        type: null,
        textContent: "",
        id: "",
      };
      nodeObj.tagName = (<Element>node).tagName;
      const text = (<Element>node).textContent;
      // Normalizza qualsiasi sequenza di spazi, tab o a-capo in un singolo
      // spazio, invece di gestire solo lo spazio semplice come prima
      // (che poteva lasciare tabulazioni "nascoste" dentro le parole).
      nodeObj.textContent = text!.replace(/\s+/g, " ").trim();
      nodeObj.type = (<Element>node).getAttribute("type");
      nodeObj.id = (<Element>node).getAttribute("id");
      return <SearchNode>nodeObj;
    });
    return result;
  }
}
