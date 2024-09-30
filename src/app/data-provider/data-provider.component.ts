import { Component, inject, OnInit, DestroyRef } from "@angular/core";
import { HttpService } from "../services/httpService.service";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-data-provider",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./data-provider.component.html",
  styleUrl: "./data-provider.component.css",
})
export class DataProviderComponent implements OnInit {
  private httpService = inject(HttpService);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.httpService.isFetching.set(true);
    const subscription = this.httpService.fetchService().subscribe({
      next: (res) => this.httpService.data.set(res),
      error: (err) => this.httpService.hasError.set(err.message),
      complete: () => {
        this.httpService.isFetching.set(false);
        console.log(this.httpService.data());
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}