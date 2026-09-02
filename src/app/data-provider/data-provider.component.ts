import { Component, inject, signal, OnInit, DestroyRef, ChangeDetectionStrategy } from "@angular/core";
import { HttpService } from "../services/httpService.service";
import { RouterOutlet } from "@angular/router";
import { EditionComponent } from "./edition/edition.component";
import { HomeComponent } from "./home/home.component";

@Component({
    selector: "app-data-provider",
    imports: [RouterOutlet],
    templateUrl: "./data-provider.component.html",
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: "./data-provider.component.css"
})
export class DataProviderComponent implements OnInit {
  isFetching = signal<boolean>(false);
  hasError = signal<string | undefined>(undefined);
  data = signal<Document | undefined>(undefined);
  private httpService = inject(HttpService);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.httpService.fetchService().subscribe({
      next: (res) => this.data.set(res),
      error: (err) => this.hasError.set(err.message),
      complete: () => {
        this.isFetching.set(false);
        //console.log(this.httpService.data());
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onActivate(component_1: EditionComponent, component_2: HomeComponent) {
    component_1.data = this.data();
    component_2.data = this.data();
  }
}
