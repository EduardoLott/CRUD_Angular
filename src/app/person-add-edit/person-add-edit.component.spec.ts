import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatRadioModule} from '@angular/material/radio';

import { PersonAddEditComponent } from './person-add-edit.component';

describe('PersonAddEditComponent', () => {
  let component: PersonAddEditComponent;
  let fixture: ComponentFixture<PersonAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
