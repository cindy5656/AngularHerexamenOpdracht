import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupGetPostsComponent } from './group-get-posts.component';

describe('GroupGetPostsComponent', () => {
  let component: GroupGetPostsComponent;
  let fixture: ComponentFixture<GroupGetPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupGetPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupGetPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
