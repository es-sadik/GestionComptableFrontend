import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Fournisseur } from 'src/app/entities/fournisseur';
import { FournisseurService } from '../fournisseur.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { SweetAlert } from 'src/app/Utils/sweet-alert';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-edit-Fournisseur',
  templateUrl: './add-edit-Fournisseur.component.html',
  styleUrls: ['./add-edit-Fournisseur.component.css']
})
export class AddEditFournisseurComponent implements OnInit {

  sweetAlert : SweetAlert = new SweetAlert();
  villes: Array<any> = new Array();
  infosGeneralFormGroup: FormGroup;
  adresseFormGroup: FormGroup;
  contactsFormGroup: FormGroup;
  honorairesFormGroup: FormGroup;
  fournisseur: Fournisseur = new Fournisseur();
  imageUrl: String ="/assets/imgs/avatar.png"
  selectedImage: File  ;
  isAddMode: boolean;
  id : number;
  nameBtn:string;
  isSelected : boolean;
  matcher = new MyErrorStateMatcher();


  constructor(private _formBuilder: FormBuilder, private fournisseurService: FournisseurService,private router: Router,private route: ActivatedRoute ) {}

  ngOnInit() {
    this.isSelected = false;
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.declareForms();
    this.loadVillesJson();

    if(this.isAddMode){
      this.nameBtn = "Ajoute"
    }else{
      this.nameBtn ="Edite"
      this.getFournisseur();
    }

  }

  declareForms(){
    this.infosGeneralFormGroup = this._formBuilder.group({
      nom: ['', Validators.required],
      siteWeb: null,
      ifi : null,
      ice: null,
      tp: null,
      cnss: null,
      rc: null

    });

    this.adresseFormGroup = this._formBuilder.group({
      ville: null,
      adresse: null,
      codePostale: null,

    });
    this.contactsFormGroup = this._formBuilder.group({
      email: ['', Validators.email],
      telePortable: null,
      teleFix: null

    });

  }

  loadVillesJson(){

    fetch('./assets/jsons/villes.json').then(res => res.json())
    .then(jsonData => {
      console.log(jsonData)
      this.villes = jsonData;
    });
  }



  getFournisseur(){

    this.fournisseurService.getFournisseurById(this.id).subscribe( data =>{

      this.fournisseur = data;
      this.fillFormGroup();

      if(this.fournisseur.image != null){
      this.fournisseurService.getImage().subscribe( data  =>{
        
        this.imageUrl =data;
        console.log(this.imageUrl);
      });
    }

      
    }); 

    console.log(this.imageUrl); 
  }

  fillFormGroup(){
    
    this.infosGeneralFormGroup.patchValue({
      nom: this.fournisseur.nom,
      siteWeb: this.fournisseur.siteWeb,
      ifi : this.fournisseur.ifi,
      ice: this.fournisseur.ice,
      tp: this.fournisseur.tp,
      cnss: this.fournisseur.cnss,
      rc: this.fournisseur.rc
    });

    this.adresseFormGroup.patchValue({
      ville: this.fournisseur.ville,
      adresse: this.fournisseur.adresse,
      codePostale: this.fournisseur.codePostale,

    });
    this.contactsFormGroup.patchValue({
      email: this.fournisseur.email,
      telePortable: this.fournisseur.telePortable,
      teleFix: this.fournisseur.teleFix

    });

  }

  /*async defaultUploadImage(path :string ){
    console.log("1")
    const response = await fetch(path)
    const myBlob  =  await response.blob();
    let blob : any;
    
    blob = myBlob;
    blob.name = 'avatar.png';
    blob.lastModified = new Date();
    const myFile = new File([blob], 'avatar.png', {type: blob.type});
    console.log("2") ; 

    return myFile;

  }*/

  onSelectFile(event: any){
    
    if (event.target.files.length > 0)
    {
      this.selectedImage = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) =>{
        this.imageUrl = event.target.result;
      }
    
    }
    
  }


 

   onSubmit(){

    if(this.isAddMode){
      this.createFournisseur();
      
    }
    else{
      this.editFournisseur();
     
    }

  }
  
   createFournisseur(){

    this.fournisseur = {...this.infosGeneralFormGroup.value , ...this.adresseFormGroup.value, ...this.contactsFormGroup.value};
    
    this.fournisseurService.addFournisseur(this.fournisseur).subscribe( (data: any) => {

      if(this.selectedImage !== undefined){

        const uploadImageData = new FormData();
        uploadImageData.append('file', this.selectedImage);
        this.fournisseurService.putImage(uploadImageData).subscribe( (data: any)=> {
 
        });
        
      }

      this.sweetAlert.alertSuccessTimer("Le fournisseur : " +this.fournisseur.nom+" a été ajouté")
      this.router.navigateByUrl('fournisseur');
      
    },erro =>{

      this.sweetAlert.alertErrorOk("Le fournisseur  " +this.fournisseur.nom+" n'a pas été ajouté")
      
    });
  }

  


    editFournisseur(){
    
    this.fournisseur = {...this.infosGeneralFormGroup.value , ...this.adresseFormGroup.value, ...this.contactsFormGroup.value};
    

    this.fournisseurService.updateFournisseur(this.id,this.fournisseur).subscribe( (data: any)=> {
      
      if(this.selectedImage !== undefined){

        const uploadImageData = new FormData();
        uploadImageData.append('file', this.selectedImage);

        this.fournisseurService.putImage(uploadImageData).subscribe( (data: any)=> {

          
        });
      }

      this.sweetAlert.alertSuccessTimer("Le fournisseur : " +this.fournisseur.nom+" a été modifié")
      this.router.navigateByUrl('fournisseur');
      
    },erro =>{
      this.sweetAlert.alertErrorOk("Le fournisseur  " +this.fournisseur.nom+" n'a pas été modifié")
    });


  }


}

