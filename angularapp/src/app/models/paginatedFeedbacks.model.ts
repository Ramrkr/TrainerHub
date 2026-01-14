import { Feedback } from "./feedback.model";

export interface paginatedFeedbacks
{
    content:Feedback[];
    totalPages:number;
    totalElements:number;
    size:number;
    pageNo:number;
    first:boolean;
    last:boolean;

}