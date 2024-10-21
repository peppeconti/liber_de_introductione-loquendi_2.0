import {
  Component,
  computed,
  input,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { SearchComponent } from "../shared/search/search.component";
import Fuse from "fuse.js";

type SearchNode = {
  tagName: string | null;
  type: string | null;
  textContent: string | null;
  id: string | null;
};

@Component({
  selector: "app-results",
  standalone: true,
  imports: [HeaderComponent, SearchComponent],
  templateUrl: "./results.component.html",
  styleUrl: "./results.component.css",
})
export class ResultsComponent implements OnInit, OnChanges {
  @Input({ required: true }) data: Document | undefined;
  s = input<string | null>();
  searchField = computed<SearchNode[]>(() => this.getSearchField(this.data!));

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty("s") && changes['s'].currentValue) {
      const fuse = new Fuse(this.searchField(), {
        includeMatches: true,
        keys: ["textContent"],
      });
      console.log(fuse.search(this.s()!));
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
      nodeObj.textContent = (<Element>node).textContent;
      nodeObj.type = (<Element>node).getAttribute("type");
      nodeObj.id = (<Element>node).getAttribute("id");
      return <SearchNode>nodeObj;
    });
    return result;
  }
}
