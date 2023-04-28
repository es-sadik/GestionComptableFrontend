import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from 'src/app/entities/categorie';
import { Produit } from 'src/app/entities/produit';
import { SweetAlert } from 'src/app/Utils/sweet-alert';
import { AddEditCategorieComponent } from '../categorie/add-edit-categorie/add-edit-categorie.component';
import { CategorieService } from '../categorie/categorie.service';
import { ProduitService } from '../produit.service';
@Component({
  selector: 'app-add-edit-produit',
  templateUrl: './add-edit-produit.component.html',
  styleUrls: ['./add-edit-produit.component.css']
})
export class AddEditProduitComponent implements OnInit {

  productForm :FormGroup ;
  imageUrl: string ="/assets/imgs/unnamed.png"
  selectedImage: any;
  produit :Produit = new Produit();
  categories :Categorie [] ;
  isAddMode: boolean;
  ref :string ;
  action: string;
  sweetAlert : SweetAlert = new SweetAlert();

  constructor(private produitService: ProduitService,private categorieService:  CategorieService , private _formBuilder: FormBuilder ,private route: ActivatedRoute ,private router: Router ,public dialog: MatDialog ) { }

  

  ngOnInit(): void {
  
    
    this.declareForms()
    this.getAllCategories()
    this.ref =this.route.snapshot.params['reference'];
    this.isAddMode =!this.ref;
    if(this.isAddMode){
         this.action="Ajouter"
    }else{
      this.action="Edite"
      this.getProduitByRef()

    }

  }
  declareForms(){
    this.productForm = this._formBuilder.group({
      reference: ['', Validators.required],
      designation: ['', Validators.required],
      tva :['', Validators.required],
      categorie :['', Validators.required],
      AddCategorie:null,
      marque :null,
      description:null,
      type:null,
      poids:null,
      volume:null,
      surface:null,
      longueur:null,
      largeur :null,
      hauteur :null,
      prixAchat :null,
      prixVente :null,
      prixRevient:null
    });
  }

  async getProduitByRef(){
    this.produitService.getProduitByRef(this.ref).subscribe(data => {
      this.produit =data;
    

      this.fillFormGroup();

      if(this.produit.image != null){
         this.produitService.getImageById().subscribe(data => {
           this.imageUrl = data;
         })
      }

    })
  }
  fillFormGroup(){
    this.productForm.patchValue({

      reference   : this.produit.reference,
      designation : this.produit.designation,
      tva         : this.produit.tva.toString(),
      categorie  : this.produit.categorie,
      marque      : this.produit.marque  ,
      description  : this.produit.description  ,
      type         : this.produit.type  ,
      poids      : this.produit.poids      ,
      volume     : this.produit.volume      , 
      surface  : this.produit.surface  ,
      longueur  : this.produit.longueur  ,
      largeur  : this.produit.largeur  ,
      hauteur  : this.produit.hauteur  ,
      prixAchat  : this.produit.prixAchat  ,
      prixVente  : this.produit.prixVente  ,
      prixRevient  : this.produit.prixRevient  
    })
  }
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
    this.addProduit() ;
    
  }
  else{
    this.updateProduit()
    
  }
 
}

addProduit(){


  this.produit = this.productForm.value ;

  
  this.produitService.addProduit(this.produit).subscribe((data : any) => {
    
    if(data == false){
      this.sweetAlert.alertErrorOkTwo("Cette référence : "+this.produit.reference+" existe déjà","Choisir un autre référence")
    }
    else{
      if(this.selectedImage !== undefined){
        const uploadImageData = new FormData();
        uploadImageData.append('file', this.selectedImage);
        this.produitService.putImage(uploadImageData).subscribe((data : any) => {
        });
      }
    
    
      this.sweetAlert.alertSuccessTimer("Le produit : " +this.produit.reference+" a été ajouté")
      this.router.navigateByUrl('produit');
    }

    

  },erro =>{
    console.log(erro)
    this.sweetAlert.alertErrorOk("L'utilisateur  " +this.produit.reference+" n'a pas été ajoué")
  });
  
}

updateProduit(){
  this.produit = this.productForm.value
  this.produitService.updateProduit(this.ref ,this.produit).subscribe((data : any) => {
    if(this.selectedImage !== undefined){

      const uploadImageData = new FormData();
      uploadImageData.append('file', this.selectedImage);

      this.produitService.putImage(uploadImageData).subscribe( (data: any)=> {
       
      });
    }
    
    this.sweetAlert.alertSuccessTimer("Le produit : " +this.produit.reference+" a été modifié")
    this.router.navigateByUrl('produit');

  },erro =>{
    this.sweetAlert.alertErrorOk("L'utilisateur  " +this.produit.reference+" n'a pas été modifié")
  });
}

 // calcule   prixVente or prixRevient :
 calculprixRevient = () =>{
   if(this.produit.prixVente < this.produit.prixAchat || this.produit.prixVente == 0){
    //this.productForm.get('prixRevient')?.disable()
    //this.productForm.get('prixRevient')?.reset()
   }else{
     this.produit.prixRevient = this.produit.prixVente - this.produit.prixAchat ;
     this.productForm.controls['prixRevient'].setValue(this.produit.prixRevient)
    }
   
 } 

 calculprixVente = () => this.produit.prixVente = this.produit.prixRevient + this.produit.prixAchat ;
 // get All Categories :

 getAllCategories(){
   this.categorieService.getAllCategories().subscribe(data =>{
    this.categories = data ;
   })
 }

 openDialogAddCategorie(){
  this.dialog.open(AddEditCategorieComponent,{
    width:'30%'
  }).afterClosed().subscribe(val =>{
    this.getAllCategories() ;
  });
 }
 compareCategoryObjects(object1: any, object2: any) {
  return object1 && object2 && object1.idCat == object2.idCat;
}


 

}