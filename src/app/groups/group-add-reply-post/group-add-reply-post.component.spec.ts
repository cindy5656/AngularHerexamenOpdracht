import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAddReplyPostComponent } from './group-add-reply-post.component';

describe('GroupAddReplyPostComponent', () => {
  let component: GroupAddReplyPostComponent;
  let fixture: ComponentFixture<GroupAddReplyPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupAddReplyPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAddReplyPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
