import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ModalHeaderComponent } from "./modal-header/modal-header.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-modal',
    imports: [ModalHeaderComponent, RouterLink],
    templateUrl: './modal.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './modal.component.css'
})
export class ModalComponent {

}
