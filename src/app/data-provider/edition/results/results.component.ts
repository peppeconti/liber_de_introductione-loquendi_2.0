import {
  Component,
  computed,
  input,
  Input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges
} from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { SearchComponent } from "../shared/search/search.component";
import hightlight from "../../../utils/highlight";
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
  threshold: 1,
  ignoreLocation: true,
  useExtendedSearch: true,
  keys: ["textContent"],
  includeScore: true,
};

@Component({
  selector: "app-results",
  standalone: true,
  imports: [HeaderComponent, SearchComponent, ResultComponent],
  templateUrl: "./results.component.html",
  styleUrl: "./results.component.css"
})
export class ResultsComponent implements OnInit, OnChanges {
  @Input({ required: true }) data: Document | undefined;
  s = input<string | null>();
  searchField = computed<SearchNode[]>(() => this.getSearchField(this.data!));
  results = signal<any[] | undefined>(undefined);
  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty("s") && changes["s"].currentValue) {
      const text = this.searchField();
      const search = this.s()?.trim();
      const full_search = `'"${search}"`;
      // FUSE
      const fuse = new Fuse(text, options);
      const results = fuse.search(full_search!);
      // SETTING RESULT OUTPUT
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
      nodeObj.textContent = text!
        .split(" ")
        .filter((e: string) => e !== "")
        .map((e: string) => e.replaceAll("\n", ""))
        .join(" ");
      nodeObj.type = (<Element>node).getAttribute("type");
      nodeObj.id = (<Element>node).getAttribute("id");
      return <SearchNode>nodeObj;
    });
    return result;
  }
}

//const splittedSearch = search?.split(" ");
//search = splittedSearch?.map((e) => "'" + e).join(" ");
// `'"${search}"`
