import { Component, inject, DestroyRef, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, throwError } from "rxjs";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  httpClient = inject(HttpClient);
  destroyRef = inject(DestroyRef);

  ngOnInit() {
    const subscription = this.httpClient
      .get("assets/data/liber_de_introductione_loquendi.xml", {
        headers: new HttpHeaders()
          .set("Content-Type", "text/xml")
          .append("Access-Control-Allow-Methods", "GET")
          .append("Access-Control-Allow-Origin", "*")
          .append(
            "Access-Control-Allow-Headers",
            "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"
          ),
        responseType: "text",
      })
      .pipe(map((res) => this.parseXML(this.minifyXml(res))))
      .subscribe({
        next: (resData) => console.log(resData),
        error: (error) => console.log(error.message),
        complete: () => console.log("completed"),
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
