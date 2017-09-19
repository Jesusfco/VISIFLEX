
export class Storage {
    token:string = localStorage.getItem('token');
    tokenRequest:string;
    userName: string = localStorage.getItem('userName');
    userId: string = localStorage.getItem('userId');
    userType: string = localStorage.getItem('userType');
    userActive: string = localStorage.getItem('userActive');
    userPhone: string = localStorage.getItem('userPhone');
    userEnterprise: string = localStorage.getItem('userEnterprise');


    constructor(){
        
        this.tokenRequest = "?token=" + this.token;
    }
}
