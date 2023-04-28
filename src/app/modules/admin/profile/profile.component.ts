import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SweetAlert } from 'src/app/Utils/sweet-alert';
import { AdminService } from '../admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../../user/user-auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  sweetAlert : SweetAlert = new SweetAlert ();
  formUser: FormGroup;
  hide1 = true;
  hide2 = true;
  id : number;
  passwordIsMatched : boolean  = true;
  user : User = new User();
  numberOfPermission : number;
  isChangePasswordMode : boolean = false ;
  originalUserName :string;

  constructor(private _formBuilder: FormBuilder, private adminService : AdminService, private router: Router,private route: ActivatedRoute,private userAuthService : UserAuthService) { }

  ngOnInit(): void {
    this.declareFormUser();
    this.setUser();
  }

  declareFormUser(){
    this.formUser = this._formBuilder.group({
      userName:['', Validators.required],
      userPassword: ['', Validators.required],
      confirmPassword:['', Validators.required],
      });
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

  setFormUser(){

    this.formUser.patchValue({
      userName:this.user.userName,
      etat:this.user.etat
    })

  }
  

  setUser(){
    
    this.adminService.getUserByUserName( this.userAuthService.getUserName() ).subscribe(data =>{
      if(data != null){
        this.user = data;
        this.originalUserName = this.user.userName;
        this.id = this.user.id;
        this.setFormUser();
      }
      else{
        this.sweetAlert.alertErrorOk("this utilisateur n'exist pas")
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

  updateAdmin(){
    this.adminService.updateAdmin(this.id, this.user).subscribe(data =>{
      this.sweetAlert.alertSuccessTimer("L'utilisateur " +this.user.userName+" a été modifié");
      setTimeout(() => {
        this.userAuthService.clear();
        this.router.navigateByUrl('/user/login');
      }, 1700);
      
    },error =>{
      this.sweetAlert.alertErrorOk("L'utilisateur  " +this.user.userName+" n'a pas été modifié");
    })
  }

  onValide(){
    if(this.originalUserName == this.formUser.controls['userName'].value){

      this.user = new User();
      this.user.userName = this.formUser.controls['userName'].value
      if(this.isChangePasswordMode){
        this.user.userPassword = this.formUser.controls['userPassword'].value
        
        this.passwordIsMatched = this.checkPasswordIsMatched();
        if(this.passwordIsMatched){     
          this.updateAdmin();
        }
      }
      else{
        this.updateAdmin();
      }

      

    }
    else{
      this.user = new User();
        this.user.userName = this.formUser.controls['userName'].value
        
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
               this.updateAdmin();
            }
          
          }
  
        },
        error =>{
          this.sweetAlert.alertErrorOk("");
        })
    }
    
  }


}
