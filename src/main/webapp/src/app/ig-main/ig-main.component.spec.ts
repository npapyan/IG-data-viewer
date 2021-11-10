import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgMainComponent } from './ig-main.component';

describe('IgMainComponent', () => {
  let component: IgMainComponent;
  let fixture: ComponentFixture<IgMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IgMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IgMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
