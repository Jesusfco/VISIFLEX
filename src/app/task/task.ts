import { TaskProgress } from './task-progress';
export class Task {

    public id: number;

    public userId: number;
    public userName: string;

    public title: string;
    public description: string;
    public level: number;
    public levelView: string;

    public createBy: number;
    public createByName: string;

    public status: boolean;
    public created_at: string;
    public updated_at: string;

    public view:boolean;
    public modify:boolean;
    public delete:boolean;

    public taskProgress: Array<TaskProgress>;

    constructor(){
        this.view = false;
        this.modify = false;
        this.delete = false;
    }
}
