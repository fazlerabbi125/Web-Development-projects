import express from "express";
import { UserDocument } from "../../models/User";

declare module "express" {
    export interface Request {
        user?: Pick<UserDocument, "_id" | "name" | "email" | "isAdmin">;
    }
}