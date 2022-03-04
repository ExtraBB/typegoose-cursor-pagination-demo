/**
 * This controller contains all User related routes
 * @module Controllers/UserController
 */

import { Request, Response } from "express";

export async function getUsers(req: Request, res: Response) {
    return res.sendStatus(200);
}