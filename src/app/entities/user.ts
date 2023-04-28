import { PagePermission } from "./page-permission";

export class User {
    id : number;
    userName:string;
    userPassword:string;
    etat: boolean;
    pagePermissions : PagePermission[];
}
