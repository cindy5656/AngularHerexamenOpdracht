import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyUserAddComponent } from './company-user-add.component';

describe('CompanyUserAddComponent', () => {
  let component: CompanyUserAddComponent;
  let fixture: ComponentFixture<CompanyUserAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyUserAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyUserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
