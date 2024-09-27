import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JsonNode } from "./models";
import { catchError, map, throwError } from "rxjs";

const headers = new HttpHeaders({ "Content-Type": "text/mxl" }).set(
  "Accept",
  "text/xml"
);

const URL = "assets/data/liber_de_introductione_loquendi.xml";

@Injectable()
export class HttpService {
  private httpClient = inject(HttpClient);

  fetchService() {
    return this.httpClient
      .get(URL, {
        headers: headers,
        responseType: "text",
      })
      .pipe(
        map((res) => this.minifyXml(res)),
        map((res) => this.parseXML(res))
      );
  }

  private minifyXml(xml: string): string {
    let minified: string;
    minified = xml
      .split(/(?<=>)\s*(?=<)/)
      .join("")
      .split(/\n/)
      .join("");
    return minified;
  }

  private parseXML(res: string): Document {
    const parser: DOMParser = new DOMParser();
    const xml: Document = parser.parseFromString(res, "application/xml");
    return xml;
  }

  parseNode(node: Node) {
    const nodeObj: JsonNode = {
      text: null,
      attributes: null,
      tagName: null,
      childNodes: null,
      isText: false,
    };
    nodeObj.tagName = (<Element>node).tagName;
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
        nodeObj.childNodes.push(this.parseNode(node.childNodes[n]));
      }
    }
    return <JsonNode>nodeObj;
  }
}
