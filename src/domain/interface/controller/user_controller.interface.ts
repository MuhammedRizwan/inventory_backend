import { NextFunction, Request, Response } from "express";
import IuserUsecase from "../use_case/user_use_case.interface";

export default interface IuserController{
    login(req:Request,res:Response,next:NextFunction):Promise<void>
    signup(req: Request, res: Response, next: NextFunction): Promise<void> 
    logout(req: Request, res: Response, next: NextFunction): Promise<void>
}

export interface IuserControllerDependencies{
    userUsecase:IuserUsecase
}