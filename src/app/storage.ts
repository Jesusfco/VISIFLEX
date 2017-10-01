
export class Storage {
    token:string = localStorage.getItem('token');
    tokenRequest:string;
    userName: string = localStorage.getItem('userName');
    userEmail: string =  localStorage.getItem('userEmail');
    userId: string = localStorage.getItem('userId');
    userType: number;
    userActive: string = localStorage.getItem('userActive');
    userPhone: string = localStorage.getItem('userPhone');
    userEnterprise: string = localStorage.getItem('userEnterprise');


    constructor(){
        
        this.tokenRequest = "?token=" + this.token;
        this.userType =  parseInt(localStorage.getItem('userType'));
    }
}
