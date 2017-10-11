export class TaskProgress {
    public id:number;
    public taskId: number;
    public message: string;
    public observation: string;
    public read: boolean;
    public progress: number;
    public modifyBy: number;
    public modifyByName: string;
    public createBy: number;
    public createByName: string;

    public readTime: string;
    public created_at: string;
    public updated_at: string;
    public edit: boolean;
    public delete: boolean

    constructor(){
        this.edit = false;
        this.delete = false;
    }
}
