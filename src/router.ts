import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';
import { listCategories } from './app/useCases/categories/listCategories';
import { createCategory } from './app/useCases/categories/createCategory';
import { listProducts } from './app/useCases/products/listProducts';
import { createProduct } from './app/useCases/products/createProducts';
import { listProductsByCategories } from './app/useCases/categories/listProductsByCategory';
import { listOrders } from './app/useCases/orders/listOrders';
import { createOrder } from './app/useCases/orders/createOrder';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';
import { cancelOrder } from './app/useCases/orders/cancelOrder';
import { cancelCategory } from './app/useCases/categories/cancelCategory';
import { deleteProduct } from './app/useCases/products/deleteProducts';


export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '../upload'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  })

});

//list categories
router.get('/categories', listCategories);

//create categories
router.post('/categories', createCategory);

//delete categories
router.delete('/categories/:categoryId', cancelCategory);

//delete products
router.delete('/products/:productId', deleteProduct);

//list products
router.get('/products', listProducts);

//create products
router.post('/products', upload.single('image'), createProduct);

//get products by category
router.get('/categories/:categoryId/products', listProductsByCategories);

//list orders
router.get('/orders', listOrders);

//create order
router.post('/orders', createOrder);

//change order status
router.patch('/orders/:orderId', changeOrderStatus);

//delete/cancel order
router.delete('/orders/:orderId', cancelOrder);
