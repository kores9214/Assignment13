import { Injectable } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private firebase: AngularFireDatabase) { }
 
  studentList: AngularFireList<any>;

  form = new FormGroup({
    $key: new FormControl(null),
    firstName: new FormControl('', [Validators.required,
                                  Validators.minLength(5),
                                  Validators.maxLength(10)]),
    lastName: new FormControl('', [Validators.required,
                                    Validators.minLength(5),
                                    Validators.maxLength(10)]),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, 
                                Validators.minLength(10)]),
    city: new FormControl('', [Validators.required,
                                Validators.minLength(5),
                                Validators.maxLength(10)]),
    zip: new FormControl('', [Validators.required,
                                  Validators.minLength(1),
                                  Validators.maxLength(10)]),                                
                                
    address: new FormControl('')
  });

  getStudents() 
  {
    this.studentList = this.firebase.list('student');
    return this.studentList.snapshotChanges();
  }


}
