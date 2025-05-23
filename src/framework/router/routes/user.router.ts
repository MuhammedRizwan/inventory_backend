import { NextFunction, Request, Response, Router } from "express";

import UserController from "../../../adapter/controller/user.controller";
import UserDependencies from "../../dependencies/user.dependencies";

const router = Router();
const user=new UserController(UserDependencies)

router.post("/login", (req:Request, res:Response, next:NextFunction) => {
    return user.login(req, res, next);
  });
router.post("/signup", (req:Request, res:Response, next:NextFunction) => {
    return user.signup(req, res, next);
  });
router.post("/logout", (req:Request, res:Response, next:NextFunction) => {
    return user.logout(req, res, next);
  });
router.post("/refresh", (req:Request, res:Response, next:NextFunction) => {
    return user.refresh_token(req, res, next);
  });


export default router;