import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FemaleuserComponent } from './femaleuser.component';

describe('FemaleuserComponent', () => {
  let component: FemaleuserComponent;
  let fixture: ComponentFixture<FemaleuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FemaleuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FemaleuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
