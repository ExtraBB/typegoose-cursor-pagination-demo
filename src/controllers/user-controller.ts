import { Request, Response } from "express";
import { IPaginateOptions } from "typegoose-cursor-pagination";
import { UserModel } from "../models/user-model";

export async function getUsers(req: Request, res: Response) {
    const options: IPaginateOptions = {
        sortField: "email",
        sortAscending: true,
        limit: 10,
        next: req.query.next as string
    };
 
    return res.json(await UserModel.findPaged(options));
}