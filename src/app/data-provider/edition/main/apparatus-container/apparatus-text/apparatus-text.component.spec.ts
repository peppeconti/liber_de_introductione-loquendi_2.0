import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApparatusTextComponent } from './apparatus-text.component';

describe('ApparatusTextComponent', () => {
  let component: ApparatusTextComponent;
  let fixture: ComponentFixture<ApparatusTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApparatusTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApparatusTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
