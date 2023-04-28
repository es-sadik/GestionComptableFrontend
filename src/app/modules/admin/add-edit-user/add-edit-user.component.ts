import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PagePermission } from 'src/app/entities/page-permission';
import { User } from 'src/app/entities/user';
import { SweetAlert } from 'src/app/Utils/sweet-alert';
import { AdminService } from '../admin.service';

export class CheckPermission{
  id: number;
  namePermission:string;
  checked:boolean;
}

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {
  sweetAlert : SweetAlert = new SweetAlert ();
  formUser: FormGroup;
  isAddMode: boolean;
  hide1 = true;
  hide2 = true;
  id : number;
  passwordIsMatched : boolean  = true;

  checkPermissions: CheckPermission[] =[];
  permissions: PagePermission[] = [];

  master_checked: boolean = false;
  master_indeterminate: boolean = false;
  user : User = new User();
  numberOfPermission : number;
  isChangePasswordMode : boolean = false ;
  originalUserName :string;

  constructor(private _formBuilder: FormBuilder, private adminService : AdminService, private router: Router,private route: ActivatedRoute) {
    
  }
  

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.isAddMode = !this.id;
    this.declareFormUser();
    this.getAllPermissions();
    if(this.isAddMode){
      this.isChangePasswordMode = true;

    }
    else{
      this.setUser();
    }
    
  }

  declareFormUser(){
    this.formUser = this._formBuilder.group({
      userName:['', Validators.required],
      etat:['', Validators.required],
      userPassword: ['', Validators.required],
      confirmPassword:['', Validators.required],
      });

  }
  

  
  

  getAllPermissions(){
    this.adminService.getAllPagePermission().subscribe(data =>{
      this.permissions = data;
      this.permissionsDefault();

    })
  }

  setFormUser(){

    this.formUser.patchValue({
      userName:this.user.userName,
      etat:this.user.etat
    })

  }
  

  setUser(){

    this.adminService.getUserByIdWithoutAdmin(this.id).subscribe(data =>{
      if(data != null){
        this.user = data;
        this.originalUserName = this.user.userName;
        this.setFormUser();
        this.setPermissions(this.user.pagePermissions);
      }
      else{
        this.sweetAlert.alertErrorOk("this utilisateur n'exist pas")
        this.router.navigateByUrl('/admin/gestionComptes');
      }
      
      
    },error =>{
      this.sweetAlert.alertErrorOk("")
      this.router.navigateByUrl('/admin/gestionComptes');
    });
    
  }

  checkPasswordIsMatched() :boolean{

    if(this.formUser.controls['userPassword'].value == this.formUser.controls['confirmPassword'].value){
      return true;
    }
    else{
      return false;
    }

  }

  


  permissionsDefault(){
    this.permissions.forEach(currentValue =>{
      this.checkPermissions.push({id:currentValue.id, namePermission: currentValue.namePermission , checked: false })
    })
    this.numberOfPermission = this.checkPermissions.length;

  }


  getPermissions(){
    let ListPermission : PagePermission[] = [];
    this.checkPermissions.forEach((currentValue,index) =>{

      if(currentValue.checked == true ){
        ListPermission.push({id:currentValue.id, namePermission: currentValue.namePermission})
      }

    })

    return ListPermission;
  }

  setPermissions(listPagePermissions: PagePermission[]){
    
    this.checkPermissions.forEach((currentValueCheck,i) =>{
      listPagePermissions.forEach( (currentValuePage,index) =>{
          if(currentValueCheck.namePermission == currentValuePage.namePermission){
            currentValueCheck.checked = true;
          }
      });
    });

  }

  registerUser(){

    this.user.pagePermissions = this.getPermissions(); 

    this.adminService.addUser(this.user).subscribe(data =>{
      this.router.navigateByUrl('admin/gestionComptes');
      this.sweetAlert.alertSuccessTimer("L'utilisateur " +this.user.userName+" a été ajouté")
    },error =>{

      this.sweetAlert.alertErrorOk("L'utilisateur  " +this.user.userName+" n'a pas été ajouté");
    })
  }

  updateUser(){
    this.user.pagePermissions = this.getPermissions();

    this.adminService.updateUser(this.id, this.user).subscribe(data =>{
      this.router.navigateByUrl('admin/gestionComptes');
      this.sweetAlert.alertSuccessTimer("L'utilisateur " +this.user.userName+" a été modifié")
    },error =>{

      this.sweetAlert.alertErrorOk("L'utilisateur  " +this.user.userName+" n'a pas été modifié");
    })
  }

  changePasswordMode(){
    if(this.isChangePasswordMode == true){
      this.isChangePasswordMode = false
      
      this.formUser.patchValue({
        userPassword: '',
        confirmPassword:''
      })
      
    }else{
      this.isChangePasswordMode = true
      
    }
  }

  onValide(){

    if(this.isAddMode){
      this.user.userName = this.formUser.controls['userName'].value
      this.user.etat = this.formUser.controls['etat'].value
      this.user.userPassword = this.formUser.controls['userPassword'].value
      
      this.adminService.checkIfExistUsername(this.user.userName).subscribe(data =>{
        
        if(data == true){
        this.sweetAlert.alertErrorOkTwo("L'utilisateur "+ this.user.userName+" existe déjà", "Choisir autre nom d'utilisateur");
        }
        else{

        this.passwordIsMatched = this.checkPasswordIsMatched();
        if(this.passwordIsMatched){
          this.registerUser();
        }
        
        }

      },
      error =>{
        this.sweetAlert.alertErrorOk("");
      })  
    }

    else{
      if(this.originalUserName == this.formUser.controls['userName'].value){

        this.user = new User();
        this.user.userName = this.formUser.controls['userName'].value
        this.user.etat = this.formUser.controls['etat'].value

        if(this.isChangePasswordMode){

          this.user.userPassword = this.formUser.controls['userPassword'].value
          this.passwordIsMatched = this.checkPasswordIsMatched();
            if(this.passwordIsMatched){     
              this.updateUser();
            }

        }

        else{
          this.updateUser();
        }

        
      } 
      else{

        this.user = new User();
        this.user.userName = this.formUser.controls['userName'].value
        this.user.etat = this.formUser.controls['etat'].value

        if(this.isChangePasswordMode){
          this.user.userPassword = this.formUser.controls['userPassword'].value
        }

        this.adminService.checkIfExistUsername(this.user.userName).subscribe(data =>{
        
          if(data == true){
              this.sweetAlert.alertErrorOkTwo("L'utilisateur "+ this.user.userName+" existe déjà", "Choisir autre nom d'utilisateur");
          }
          else{
  
            this.passwordIsMatched = this.checkPasswordIsMatched();
            if(this.passwordIsMatched){
              this.updateUser();
            }
          
          }
  
        },
        error =>{
          this.sweetAlert.alertErrorOk("");
        })

      }

      
    }
    
  }

  
  

  master_change() {
    for (let value of Object.values(this.checkPermissions)) {
      value.checked = this.master_checked;
    }
  }

  list_change(){
    let checked_count = 0;
    //Get total checked items
    for (let value of Object.values(this.checkPermissions)) {
      if(value.checked)
      checked_count++;
    }

    if(checked_count>0 && checked_count<this.checkPermissions.length){
      // If some checkboxes are checked but not all; then set Indeterminate state of the master to true.
      this.master_indeterminate = true;
    }else if(checked_count == this.checkPermissions.length){
      //If checked count is equal to total items; then check the master checkbox and also set Indeterminate state to false.
      this.master_indeterminate = false;
      this.master_checked = true;
    }else{
      //If none of the checkboxes in the list is checked then uncheck master also set Indeterminate to false.
      this.master_indeterminate = false;
      this.master_checked = false;
    }
  }



  

}
