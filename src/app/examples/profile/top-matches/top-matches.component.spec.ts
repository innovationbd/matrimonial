import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMatchesComponent } from './top-matches.component';

describe('TopMatchesComponent', () => {
  let component: TopMatchesComponent;
  let fixture: ComponentFixture<TopMatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopMatchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
