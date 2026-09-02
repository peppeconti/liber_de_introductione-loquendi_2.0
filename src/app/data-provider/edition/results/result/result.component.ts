import { Component, computed, inject, input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-result',
    imports: [RouterLink, FontAwesomeModule],
    templateUrl: './result.component.html',
    styleUrl: './result.component.css',
    changeDetection: ChangeDetectionStrategy.Eager,
    encapsulation: ViewEncapsulation.None
})
export class ResultComponent {
  id=input.required<string>();
  text = input.required<string>();
  //sanitizer =  inject(DomSanitizer);
  link = faExternalLink;
}
