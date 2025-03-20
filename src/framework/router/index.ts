import { Router } from "express";
import user_route from './routes/user.router'
import product_route from './routes/product.router'
import customer_route from './routes/customer.router'

const router = Router();

router.use('/',user_route)
router.use('/product',product_route)
router.use('/customer',customer_route)

export default router;