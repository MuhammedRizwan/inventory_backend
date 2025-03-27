import { Router } from "express";
import user_route from './routes/user.router'
import product_route from './routes/product.router'
import customer_route from './routes/customer.router'
import purchase_route from './routes/purchase.router'
import JwtMiddleware from "../../adapter/middleware/jwt_handle.middleware";
const router = Router();

router.use('/',user_route)
router.use('/product',JwtMiddleware, product_route)
router.use('/customer',JwtMiddleware,customer_route)
router.use('/purchase',JwtMiddleware,purchase_route)

export default router;