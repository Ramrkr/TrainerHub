export interface Feedback
{
    feedbackId?:number;
    userId:number;
    trainerId:number;
    category:string;
    feedbackText:string;
    date:Date;
}