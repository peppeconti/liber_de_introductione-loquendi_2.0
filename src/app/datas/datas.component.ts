import { Component, signal, inject, OnInit, DestroyRef } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, throwError } from "rxjs";
import { LatinComponent } from "../latin/latin.component";

const headers = new HttpHeaders({ "Content-Type": "text/mxl" }).set("Accept", "text/xml");

@Component({
  selector: "app-datas",
  standalone: true,
  imports: [LatinComponent],
  templateUrl: "./datas.component.html",
  styleUrl: "./datas.component.css",
})
export class DatasComponent implements OnInit {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  data = signal<Document | undefined>(undefined);

  ngOnInit() {
    const subscription = this.httpClient
      .get("assets/data/liber_de_introductione_loquendi.xml", { 
        headers: headers,
        responseType: "text"
       })
      //.pipe(map((res) => this.parseXML(this.minifyXml(res))))
      .pipe(map((res) => this.parseXML(res)))
      .subscribe({
        next: (resData) => {
          this.data.set(resData);
          //console.log(this.data)
        },
        error: (error) => console.log(error.message),
        complete: () => {
          console.log("completed")
        },
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  minifyXml(xml: string): string {
    let minified: string;
    minified = xml
      .split(/(?<=>)\s*(?=<)/)
      .join("")
      .split(/\n/)
      .join("");
    return minified;
  }

  parseXML(res: string): Document {
    const parser: DOMParser = new DOMParser();
    const xml: Document = parser.parseFromString(res, "application/xml");
    return xml;
  }
  
}
