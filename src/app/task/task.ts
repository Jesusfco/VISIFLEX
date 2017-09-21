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
    public progress: number;
    public created_at: string;
    public updated_at: string;
    public last_progress: string;

    public view:boolean;
    public modify:boolean;
    public delete:boolean;

    public taskProgress: Array<TaskProgress>;
    public taskProgressLenght: number;
    public taskProgressVerified: number;

    constructor(){
        this.view = false;
        this.modify = false;
        this.delete = false;
        this.taskProgressVerified = 0;
    }
}
