import { Trainer } from "./trainer.model";

export interface PaginatedTrainers
{
    content:Trainer[];
    totalPages:number;
    totalElements:number;
    size:number;
    pageNo:number;
    first:boolean;
    last:boolean;
}