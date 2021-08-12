import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAddPostComponent } from './group-add-post.component';

describe('GroupAddPostComponent', () => {
  let component: GroupAddPostComponent;
  let fixture: ComponentFixture<GroupAddPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupAddPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAddPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
