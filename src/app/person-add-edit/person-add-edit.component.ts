import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Person } from '../shared/person';
import { PersonService } from 'src/services/person.service';
import { HttpClient } from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-person-add-edit',
  templateUrl: './person-add-edit.component.html',
  styleUrls: ['./person-add-edit.component.scss']
})
export class PersonAddEditComponent {
  personForm: FormGroup;

  constructor(
    private _fb: FormBuilder, 
    private _personService: PersonService,
    private _dialogRef: MatDialogRef <PersonAddEditComponent>,
    
    ){
    this.personForm = this._fb.group({
      id: '',
      name: '', 
      district: '', 
      cpf: '',
      documentNumber: '',
      ehOrgaoPublico: '', 
      estadoCivilId: '', 
      foneCelular: '', 
      sexo: '',
      rg: '', 
      birthday: '', 
      isClient: '',
      isCollaborator: '',
      isCollectionAgent: '',
      isHealthInsurance: '',
      isPatient: '',
      isProvider: '',
      isStaff: '',
      nickname: '',
      notice_mail: '',
      personType: '',
      isPrestadora: '',

    })
  }

  onFormSubmit(){
    if(this.personForm.valid){
      this._personService.addPerson(this.personForm.value).subscribe({
        next: (val: any) => {
          alert('Person added successfully');
          this._dialogRef.close();
        },
        error: (err: any) => {
          console.error(err);
        }
      })
    }
  }
}
