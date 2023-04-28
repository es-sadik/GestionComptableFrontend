import Swal from "sweetalert2";
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success ',
      cancelButton: 'btn btn-danger me-2',
    },
    buttonsStyling: false
  })

export class SweetAlert{
    


    alertSuccessTimer(message: string){
        Swal.fire({
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: 1700,
            scrollbarPadding: false,
            heightAuto: false
        })
    }

    alertErrorOk(message: string){
        Swal.fire({
            icon: 'error',
            title:'Error',
            text:message ,
            showConfirmButton: true,
            scrollbarPadding: false,
            heightAuto: false
            
        })
    }

    alertErrorOkTwo(title: string, message: string){
        Swal.fire({
            icon: 'error',
            title: title,
            text:message ,
            showConfirmButton: true,
            scrollbarPadding: false,
            heightAuto: false
            
        })
    }
}