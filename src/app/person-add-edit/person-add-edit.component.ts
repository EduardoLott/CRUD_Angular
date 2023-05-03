import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Person } from '../shared/person';
import { PersonService } from 'src/services/person.service';
import { HttpClient } from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CoreService } from 'src/services/core.service';

@Component({
  selector: 'app-person-add-edit',
  templateUrl: './person-add-edit.component.html',
  styleUrls: ['./person-add-edit.component.scss']
})
export class PersonAddEditComponent implements OnInit {
  personForm: FormGroup;

  constructor(
    private _fb: FormBuilder, 
    private _personService: PersonService,
    private _dialogRef: MatDialogRef <PersonAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    
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

  ngOnInit(): void {
    this.personForm.patchValue(this.data);
  }

  onFormSubmit(){
      

    if(this.personForm.valid){

      if(this.data){
        const formData = this.personForm.value;
        // Converter valores de string em booleanos
        formData.ehOrgaoPublico = JSON.parse(formData.ehOrgaoPublico);
        formData.isClient = JSON.parse(formData.isClient);
        formData.isCollaborator = JSON.parse(formData.isCollaborator);
        formData.isCollectionAgent = JSON.parse(formData.isCollectionAgent);
        formData.isHealthInsurance = JSON.parse(formData.isHealthInsurance);
        formData.isPatient = JSON.parse(formData.isPatient);
        formData.isProvider = JSON.parse(formData.isProvider);
        formData.isStaff = JSON.parse(formData.isStaff);
        formData.isPrestadora = JSON.parse(formData.isPrestadora);

        this._personService.updatePerson(this.data.id, this.personForm.value).subscribe({
          next: (val: any) => {
            
            this._coreService.openSnackBar('Person update successfully!', 'done');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })

      }else {
        const formData = this.personForm.value;
        // Converter valores de string em booleanos
        formData.ehOrgaoPublico = JSON.parse(formData.ehOrgaoPublico);
        formData.isClient = JSON.parse(formData.isClient);
        formData.isCollaborator = JSON.parse(formData.isCollaborator);
        formData.isCollectionAgent = JSON.parse(formData.isCollectionAgent);
        formData.isHealthInsurance = JSON.parse(formData.isHealthInsurance);
        formData.isPatient = JSON.parse(formData.isPatient);
        formData.isProvider = JSON.parse(formData.isProvider);
        formData.isStaff = JSON.parse(formData.isStaff);
        formData.isPrestadora = JSON.parse(formData.isPrestadora);

        this._personService.addPerson(this.personForm.value).subscribe({
          next: (val: any) => {
            
            this._coreService.openSnackBar('Person added successfully!', 'done');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      }
      
    }
  }
}
