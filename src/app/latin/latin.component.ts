import { Component, input, OnInit, signal } from '@angular/core';

type JsonNode = {
  tagName: string | null,
  isText: boolean,
  text: string | null,
  attributes: Array<{ name: string, value: string }> | null
  childNodes: Array<JsonNode> | null
}

@Component({
  selector: 'app-latin',
  standalone: true,
  imports: [],
  templateUrl: './latin.component.html',
  styleUrl: './latin.component.css'
})
export class LatinComponent implements OnInit {
  latin = input.required<Document | undefined>();
  latinJson = signal<JsonNode | undefined>(undefined);

  ngOnInit(): void {
    const latin_document: Element = this.latin()?.querySelector('[type=latin]')!;
    const latin_json = this.parseNode(latin_document);
    this.latinJson.set(latin_json);
    console.log(this.latinJson());
  }

  parseNode(node: Node) {
    const nodeObj: JsonNode = {
        text: null,
        attributes: null,
        tagName: null,
        childNodes: null,
        isText: false
    };
    nodeObj.tagName = (<Element>node).tagName;
    nodeObj.attributes = [];
    if ((<Element>node).attributes && (<Element>node).attributes.length > 0) {
        for (let i = 0; i < (<Element>node).attributes.length; i++) {
            nodeObj.attributes.push({ name: (<Element>node).attributes[i].name, value: (<Element>node).attributes[i].value });
        }
    };
    if (!node.childNodes || node.childNodes.length < 1 && node.textContent !== '') {
        nodeObj.text = node.textContent;
        nodeObj.isText = true;
    } else {
        nodeObj.childNodes = [];
        for (let n = 0; n < node.childNodes.length; n++) {
            nodeObj.childNodes.push(this.parseNode(node.childNodes[n]));
        };
    };
    return <JsonNode>nodeObj;
};
}
