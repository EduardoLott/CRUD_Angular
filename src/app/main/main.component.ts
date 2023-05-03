import { AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialog} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { PersonAddEditComponent } from '../person-add-edit/person-add-edit.component';
import { PersonService } from 'src/services/person.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from 'src/services/core.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{

  displayedColumns: string[] = ['id', 'name', 'nickname', 'cpf','district',"estadoCivilId","foneCelular","rg","birthday","sexo","notice_mail","personType","documentNumber","ehOrgaoPublico","isClient","isCollaborator","isCollectionAgent","isHealthInsurance","isPatient","isProvider","isStaff","isPrestadora",'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _personService: PersonService, private _coreService: CoreService){

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
    const dialogRef = this._dialog.open(PersonAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getPersonList();
        }
      }
    })
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

  deletePerson(id: number){
    this._personService.deletePerson(id).subscribe({
      next: (res) => {
    
        this._coreService.openSnackBar('Person deleted!', 'done');
        this.getPersonList();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  openEditPesonForm(data: any){
    const dialogRef = this._dialog.open(PersonAddEditComponent, {
      data,
    });
    
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getPersonList();
        }
      }
    })

  }
}
