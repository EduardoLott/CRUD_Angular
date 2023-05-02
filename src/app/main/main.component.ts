import { AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialog} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { PersonAddEditComponent } from '../person-add-edit/person-add-edit.component';
import { PersonService } from 'src/services/person.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{

  displayedColumns: string[] = ['id', 'name', 'nickname', 'cpf','district',"estadoCivilId","foneCelular","rg","birthday","sexo","notice_mail","personType","documentNumber","ehOrgaoPublico","isClient","isCollaborator","isCollectionAgent","isHealthInsurance","isPatient","isProvider","isStaff","isPrestadora"];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _personService: PersonService){

  }

  ngOnInit(): void {
    this.getPersonList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddEditPesonForm(){
    this._dialog.open(PersonAddEditComponent)
  }

  getPersonList(){
    this._personService.getPersonList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
