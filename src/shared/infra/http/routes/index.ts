import { customersRoutes } from '@modules/customers/infra/http/routes/customers.route';
import { orderRoutes } from '@modules/orders/infra/http/routes/order.route';
import { productRoutes } from '@modules/products/infra/http/routes/products.routes';
import { userPasswordRoute } from '@modules/users/infra/http/routes/user-password.routes';
import { userRoute } from '@modules/users/infra/http/routes/user.routes';
import { Router } from 'express';

export const routes = Router();

routes.use('/products', productRoutes);

routes.use('/users', userRoute);

routes.use('/password', userPasswordRoute);

routes.use('/customers', customersRoutes);

routes.use('/orders', orderRoutes);

routes.get('/', (req, res) => {
  return res.status(200).json({ message: 'HELLO DEV' });
});
