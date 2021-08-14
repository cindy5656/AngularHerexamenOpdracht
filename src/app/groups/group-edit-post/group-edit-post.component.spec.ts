import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupEditPostComponent } from './group-edit-post.component';

describe('GroupEditPostComponent', () => {
  let component: GroupEditPostComponent;
  let fixture: ComponentFixture<GroupEditPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupEditPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupEditPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
