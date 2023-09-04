import Register from "../pages/register";
import AllProducts from "../pages/allProducts/AllProducts";
import {
  Login,
  ForgotPassword,
  ResetPassword,
  ErrorPage,
  Dashboard,
  MainLayout,
  Users,
  ProductDetails,
  Orders,
  Inventory,
  Games,
  Gears,
  MyOrders,
  Favorites,
} from "./../pages";
import { Complain } from "../pages/comaplians";
import Chat from "../components/chat/chat";
import Profile from "../pages/Profile/Profile";
import MyJoined from "../pages/MyJoined/MyJoined";

export const path = {
  login: "/login",
  complain: "/complains",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  dashboard: "/dasboard",
  errorPage: "/error",
  users: "/users",
  inventory: "/inventory",
  allProducts: "/allProducts",
  allOrders: "/allOrders",
  games: "/games",
  gears: "/gears",
  myEvents: "/myEvents",
  productDetails: "/productDetails",
  favorites: "/favorites",
  chat: "/chat",
  profile: "/profile",
  myJoined: "/myJoined",
};
export const routes = {
  login: "login",
  register: "register",
  forgotPassword: "forgotPassword",
  resetPassword: "ResetPassword",
  dashboard: "dasboard",
  errorPage: "error",
  users: "users",
  inventory: "inventory",
  allProducts: "allProducts",
  allOrders: "allOrders",
  complain: "complains",
  games: "games",
  gears: "gears",
  myEvents: "myEvents",
  productDetails: "productDetails",
  favorites: "favorites",
  chat: "chat",
  profile: "profile",
  myJoined: "myJoined",
};

export const privatePageRoutes = {
  [routes.dashboard]: {
    name: routes.dashboard,
    path: path.dashboard,
    component: MainLayout,
    subPage: Dashboard,
    selectedId: 0,
  },
  [routes.users]: {
    name: routes.users,
    path: path.users,
    component: MainLayout,
    subPage: Users,
    selectedId: 1,
  },
  [routes.inventory]: {
    name: routes.inventory,
    path: path.inventory,
    component: MainLayout,
    subPage: Inventory,
    selectedId: 2,
  },
  [routes.complain]: {
    name: routes.complain,
    path: path.complain,
    component: MainLayout,
    subPage: Complain,
    selectedId: 4,
  },
  [routes.allProducts]: {
    name: routes.allProducts,
    path: path.allProducts,
    component: MainLayout,
    subPage: AllProducts,
    selectedId: 2,
  },
  [routes.allOrders]: {
    name: routes.allOrders,
    path: path.allOrders,
    component: MainLayout,
    subPage: Orders,
    selectedId: 3,
  },
  [routes.myEvents]: {
    name: routes.myEvents,
    path: path.myEvents,
    component: MainLayout,
    subPage: AllProducts,
    selectedId: 2,
  },
  [routes.productDetails]: {
    name: routes.productDetails,
    path: path.productDetails,
    component: MainLayout,
    subPage: ProductDetails,
    selectedId: 3,
  },
  [routes.favorites]: {
    name: routes.favorites,
    path: path.favorites,
    component: MainLayout,
    subPage: Favorites,
    selectedId: 3,
  },
  [routes.chat]: {
    name: routes.chat,
    path: path.chat,
    component: MainLayout,
    subPage: Chat,
    selectedId: 3,
  },
  [routes.profile]: {
    name: routes.profile,
    path: path.profile,
    component: MainLayout,
    subPage: Profile,
    selectedId: 3,
  },
  [routes.myJoined]: {
    name: routes.myJoined,
    path: path.myJoined,
    component: MainLayout,
    subPage: MyJoined,
    selectedId: 3,
  },
};
export const publicPageRoutes = {
  [routes.login]: {
    name: routes.login,
    path: path.login,
    component: Login,
  },
  [routes.register]: {
    name: routes.register,
    path: path.register,
    component: Register,
  },
};
export const errorPageRoute = {
  [routes.errorPage]: {
    name: routes.errorPage,
    path: path.errorPage,
    component: ErrorPage,
  },
};

export const privatePaths = [
  //All Private Routes Should be place here
  path.dashboard,
];

export const publicPaths = [path.login];
