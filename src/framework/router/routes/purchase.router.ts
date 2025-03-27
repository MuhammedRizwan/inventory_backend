import { NextFunction, Request, Response, Router } from "express";
import PurchaseController from "../../../adapter/controller/purchase.controller";
import purchaseDependencies from "../../dependencies/purchase.dependencies";

const router = Router();

const purchase=new PurchaseController(purchaseDependencies)

router.post("/add", (req: Request, res: Response, next: NextFunction) => purchase.add_purchase(req, res, next));
router.get("/:userId", (req: Request, res: Response, next: NextFunction) => purchase.fetch_purchase(req, res, next));

export default router;