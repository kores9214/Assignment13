import { Component, OnInit } from '@angular/core';
import { StudentService } from '../shared/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private studentService: StudentService) 
  { }
  public states=['MH','GJ','MP'];

  submitted: boolean;
  showSuccessMessage: boolean;
  formControls = this.studentService.form.controls;

  studentArray = [];
  showDeletedMessage: boolean;
  searchText: string = "";

  ngOnInit() {
    this.studentService.getStudents().subscribe(
      list => {
        this.studentArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });

      console.log("ngOnInit()...")
  }

  onSubmit() 
  {
    this.submitted = true;
  
    if (this.studentService.form.valid) 
    {         
      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 3000);
      this.submitted = false;
      this.studentService.form.reset();
      
      //this is to be done for proper reset operation
      this.studentService.form.setValue({
        $key: null,
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        address:'',
        city:'',
        state:'',
        zip:''
      });
    }
    console.log('onSubmit()');
  }

}
