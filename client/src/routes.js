import { ADMIN_ROUTE, BASKET_ROUTE } from "./utils/consts";
import Admin from "./pages/Admin";
import Basket from "./pages/Basket";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
];

export const publicRoutes = [];
