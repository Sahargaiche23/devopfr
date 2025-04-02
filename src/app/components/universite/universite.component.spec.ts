import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversiteComponent } from './universite.component';

describe('UniversiteComponent', () => {
  let component: UniversiteComponent;
  let fixture: ComponentFixture<UniversiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UniversiteComponent]
    });
    fixture = TestBed.createComponent(UniversiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
