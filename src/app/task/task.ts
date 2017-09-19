export class Task {

    public id: number;
    public userId: number;
    public title: string;
    public description: string;
    public level: number;
    public levelView: string;
    
    public status: boolean;
    public createBy: number;
    public created_at: string;
    public updated_at: string;

    constructor(){

    }
}
