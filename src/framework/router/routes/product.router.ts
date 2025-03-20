import { NextFunction, Request, Response, Router } from "express";
import ProductController from "../../../adapter/controller/product.controller";
import productDependencies from "../../dependencies/product.dependencies";

const router = Router();

const product = new ProductController(productDependencies);

router.get("/:userId", (req: Request, res: Response, next: NextFunction) => product.get_product(req, res, next));
router.post("/add/:userId", (req: Request, res: Response, next: NextFunction) => product.add_product(req, res, next));
router.put("/edit/:productId", (req: Request, res: Response, next: NextFunction) => product.edit_product(req, res, next));
router.delete("/delete/:productId", (req: Request, res: Response, next: NextFunction) => product.delete_product(req, res, next));

export default router;