import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JsonNode } from "./models";
import { nextUntil, isWhitespaceOnlyTextNode } from "../utils/utils";
import { catchError, map, throwError } from "rxjs";

const headers = new HttpHeaders({ "Content-Type": "text/mxl" }).set(
  "Accept",
  "text/xml"
);

const URL = "assets/data/liber_de_introductione_loquendi.xml";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  private httpClient = inject(HttpClient);
  private nodeCache = new WeakMap<Node, JsonNode>();

  fetchService() {
    return this.httpClient
      .get(URL, {
        headers: headers,
        responseType: "text",
      })
      .pipe(
        map((res) => this.parseXML(res)),
        map((res) => this.createPages(res)),
        catchError(() =>
          throwError(() => new Error("Sorry, we are unable to read the XML file..."))
        )
      );
  }

  private parseXML(res: string): Document {
    const parser: DOMParser = new DOMParser();
    const xml: Document = parser.parseFromString(res, "application/xml");
    return xml;
  }

  private createPages(xml: Document) {
    const pageBreakMarkers: NodeList = xml?.querySelectorAll("pb");
    const elements = Array.from(pageBreakMarkers).map((pb) => {
      return {
        pageBreak: <Element>pb,
        parent: document.createElement("div"),
        children: nextUntil(<Element>pb, []),
      };
    });

    const toBeReplaced = elements.map((el) => {
      el.children.forEach((child) => el.parent.appendChild(child));
      el.pageBreak.getAttributeNames().forEach((attr) => {
        attr === "xml:id"
          ? el.parent.setAttribute("id", el.pageBreak.getAttribute("xml:id")!)
          : el.parent.setAttribute(attr, el.pageBreak.getAttribute(attr)!);
      });
      return {
        pageBreak: el.pageBreak,
        div: el.parent,
      };
    });

    toBeReplaced.forEach((el) => el.pageBreak.replaceWith(el.div));

    const tranformedXLM = xml;

    return tranformedXLM;
  }

  parseNode(node: Node): JsonNode {
    const cached = this.nodeCache.get(node);
    if (cached) {
      return cached;
    }

    const nodeObj: JsonNode = {
      text: null,
      attributes: null,
      tagName: null,
      childNodes: null,
      isText: false,
      id: crypto.randomUUID(),
      textContent: ''
    };
    this.nodeCache.set(node, nodeObj);

    nodeObj.tagName = (<Element>node).tagName;
    nodeObj.textContent = (<Element>node).textContent;
    nodeObj.attributes = [];
    if ((<Element>node).attributes && (<Element>node).attributes.length > 0) {
      for (let i = 0; i < (<Element>node).attributes.length; i++) {
        nodeObj.attributes.push({
          name: (<Element>node).attributes[i].name,
          value: (<Element>node).attributes[i].value,
        });
      }
    }
    if (
      !node.childNodes ||
      (node.childNodes.length < 1 && node.textContent !== "")
    ) {
      nodeObj.text = node.textContent;
      nodeObj.isText = true;
    } else {
      nodeObj.childNodes = [];
      for (let n = 0; n < node.childNodes.length; n++) {
        const child = node.childNodes[n];
        if (isWhitespaceOnlyTextNode(child)) {
          // Pure indentation between tags (pretty-printing of the source
          // XML): dropped here instead of with a pre-parse regex, so we can
          // only ever discard a node proven to be 100% whitespace.
          continue;
        }
        nodeObj.childNodes.push(this.parseNode(child));
      }
    }
    return nodeObj;
  }
}
