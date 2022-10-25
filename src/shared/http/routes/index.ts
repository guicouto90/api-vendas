import { userRoute } from './../../../modules/users/routes/user.routes';
import { productRoutes } from './../../../modules/products/routes/products.routes';
import { Router } from 'express';

export const routes = Router();

routes.use('/products', productRoutes);

routes.use('/users', userRoute);

routes.get('/', (req, res) => {
  return res.status(200).json({ message: 'HELLO DEV' });
});
