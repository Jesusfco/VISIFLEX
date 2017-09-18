
export class Token {
    token:string = localStorage.getItem('token');;
    tokenRequest:string;

    constructor(){
        
        this.tokenRequest = "?token=" + this.token;
    }
}
