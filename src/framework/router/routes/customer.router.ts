import { NextFunction, Request, Response, Router } from "express";

import customerDependencies from "../../dependencies/customer.dependencies";
import CustomerController from "../../../adapter/controller/customer.controller";


const router = Router();

const customer = new CustomerController(customerDependencies);

router.get("/:userId", (req: Request, res: Response, next: NextFunction) => customer.get_customer(req, res, next));
router.post("/add/:userId", (req: Request, res: Response, next: NextFunction) => customer.add_customer(req, res, next));
router.put("/edit/:customerId", (req: Request, res: Response, next: NextFunction) => customer.edit_customer(req, res, next));
router.delete("/delete/:customerId", (req: Request, res: Response, next: NextFunction) => customer.delete_customer(req, res, next));

export default router;