import { Component, signal, inject, OnInit, DestroyRef } from "@angular/core";
import { HttpService } from "../services/httpService.service";

@Component({
  selector: "app-data-provider",
  standalone: true,
  imports: [],
  templateUrl: "./data-provider.component.html",
  styleUrl: "./data-provider.component.css",
})
export class DatasComponent implements OnInit {
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
        console.log(this.data());
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
