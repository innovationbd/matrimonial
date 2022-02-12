import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaleuserComponent } from './maleuser.component';

describe('MaleuserComponent', () => {
  let component: MaleuserComponent;
  let fixture: ComponentFixture<MaleuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaleuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaleuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
