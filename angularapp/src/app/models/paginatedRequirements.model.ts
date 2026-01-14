import { Requirement } from "./requirement.model";

export interface PaginatedRequirements
{
    content:Requirement[];
    totalPages:number;
    totalElements:number;
    size:number;
    pageNo:number;
    first:boolean;
    last:boolean;
}