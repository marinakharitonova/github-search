import {IRepository} from "./IRepository";

export interface IRepositories {
    total_count: number
    incomplete_results: boolean
    items: IRepository[]
}