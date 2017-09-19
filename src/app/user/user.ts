export class User {

    public id: number;
    public name: string;
    public email: string;
    public phone: string;
    public password: string;
    public enterprise: string;
    public type: number;
    public typeView: string;
    public active: boolean;
    public created_at: string;
    public update_at: string;

    public modify: boolean;
    public view: boolean;

    
    constructor(){
        this.enterprise = '';
        this.phone = '';
        this.modify = false;
        this.view = false;
    }
}


