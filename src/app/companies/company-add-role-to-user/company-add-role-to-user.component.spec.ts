import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAddRoleToUserComponent } from './company-add-role-to-user.component';

describe('CompanyAddRoleToUserComponent', () => {
  let component: CompanyAddRoleToUserComponent;
  let fixture: ComponentFixture<CompanyAddRoleToUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyAddRoleToUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAddRoleToUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
