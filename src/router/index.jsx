import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { getRouteConfig } from "./route.utils";

// Layouts
import Root from "@/layouts/Root";
import Layout from "@/components/organisms/Layout";

// Pages - Lazy loaded
const HomePage = lazy(() => import("@/components/pages/HomePage"));
const SearchResultsPage = lazy(() => import("@/components/pages/SearchResultsPage"));
const ProductDetailPage = lazy(() => import("@/components/pages/ProductDetailPage"));
const CategoryPage = lazy(() => import("@/components/pages/CategoryPage"));
const CreateListingPage = lazy(() => import("@/components/pages/CreateListingPage"));
const MyListingsPage = lazy(() => import("@/components/pages/MyListingsPage"));
const CartPage = lazy(() => import("@/components/pages/CartPage"));
const ProductsPage = lazy(() => import("@/components/pages/ProductsPage"));
const WishlistPage = lazy(() => import("@/components/pages/WishlistPage"));
const LoginPage = lazy(() => import("@/components/pages/LoginPage"));
const SignUpPage = lazy(() => import("@/components/pages/SignUpPage"));
const DashboardPage = lazy(() => import("@/components/pages/DashboardPage"));
const SellerDashboardPage = lazy(() => import("@/components/pages/SellerDashboardPage"));
const MyOrdersPage = lazy(() => import("@/components/pages/MyOrdersPage"));
const AccountSettingsPage = lazy(() => import("@/components/pages/AccountSettingsPage"));
const Callback = lazy(() => import("@/components/pages/Callback"));
const ErrorPage = lazy(() => import("@/components/pages/ErrorPage"));
const ResetPassword = lazy(() => import("@/components/pages/ResetPassword"));
const PromptPassword = lazy(() => import("@/components/pages/PromptPassword"));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="text-center space-y-4">
      <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </div>
  </div>
);

const createRoute = ({
  path,
  index,
  element,
  access,
  children,
  ...meta
}) => {
  let configPath;
  if (index) {
    configPath = "/";
  } else {
    configPath = path.startsWith('/') ? path : `/${path}`;
  }

  const config = getRouteConfig(configPath);
  const finalAccess = access || config?.allow;

  const route = {
    ...(index ? { index: true } : { path }),
    element: element ? <Suspense fallback={<LoadingFallback />}>{element}</Suspense> : element,
    handle: {
      access: finalAccess,
      ...meta,
    },
  };

  if (children && children.length > 0) {
    route.children = children;
  }

  return route;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          createRoute({
            index: true,
            element: <HomePage />,
          }),
          createRoute({
            path: "search",
            element: <SearchResultsPage />,
          }),
          createRoute({
            path: "products",
            element: <ProductsPage />,
          }),
          createRoute({
            path: "product/:id",
            element: <ProductDetailPage />,
          }),
          createRoute({
            path: "category/:categoryId",
            element: <CategoryPage />,
          }),
          createRoute({
            path: "sell",
            element: <CreateListingPage />,
          }),
          createRoute({
            path: "my-listings",
            element: <MyListingsPage />,
          }),
          createRoute({
            path: "cart",
            element: <CartPage />,
          }),
          createRoute({
            path: "wishlist",
            element: <WishlistPage />,
          }),
          createRoute({
            path: "dashboard",
            element: <DashboardPage />,
          }),
          createRoute({
            path: "seller-dashboard",
            element: <SellerDashboardPage />,
          }),
          createRoute({
            path: "orders",
            element: <MyOrdersPage />,
          }),
          createRoute({
            path: "account-settings",
            element: <AccountSettingsPage />,
          }),
        ],
      },
      createRoute({
        path: "login",
        element: <LoginPage />,
      }),
      createRoute({
        path: "signup",
        element: <SignUpPage />,
      }),
      createRoute({
        path: "callback",
        element: <Callback />,
      }),
      createRoute({
        path: "error",
        element: <ErrorPage />,
      }),
      createRoute({
        path: "reset-password/:appId/:fields",
        element: <ResetPassword />,
      }),
      createRoute({
        path: "prompt-password/:appId/:emailAddress/:provider",
        element: <PromptPassword />,
      }),
    ],
  },
]);

export default router;