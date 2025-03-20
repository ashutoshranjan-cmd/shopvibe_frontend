
// import { Route, Routes } from "react-router-dom";
// import AuthSendEmail from "./pages/auth/sendEmail"
// import AuthForget from "./pages/auth/forget"
// import AuthLayout from "./components/auth/layout";
// import AuthLogin from "./pages/auth/login";
// import AuthRegister from "./pages/auth/register";
// import AdminLayout from "./components/admin-view/layout";
// import AdminDashboard from "./pages/admin-view/dashboard";
// import AdminProducts from "./pages/admin-view/products";
// import AdminOrders from "./pages/admin-view/orders";
// import AdminFeatures from "./pages/admin-view/features";
// import ShoppingLayout from "./components/shopping-view/layout";
// import NotFound from "./pages/not-found";
// import ShoppingHome from "./pages/shopping-view/home";
// import ShoppingListing from "./pages/shopping-view/listing";
// import ShoppingCheckout from "./pages/shopping-view/checkout";
// import ShoppingAccount from "./pages/shopping-view/account";
// import CheckAuth from "./components/common/check-auth";
// import UnauthPage from "./pages/unauth-page";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { checkAuth } from "./store/auth-slice";
// import { Skeleton } from "@/components/ui/skeleton";
// import PaypalReturnPage from "./pages/shopping-view/paypal-return";
// import PaymentSuccessPage from "./pages/shopping-view/payment-success";
// import SearchProducts from "./pages/shopping-view/search";

// function App() {
//   const { user, isAuthenticated, isLoading } = useSelector(
//     (state) => state.auth
//   );
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(checkAuth());
//   }, [dispatch]);

//   if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

//   console.log(isLoading, user);

//   return (
//     <div className="flex flex-col overflow-hidden">
//       <Routes>
//         {/* Default route for Shopping Layout and Shopping Home */}
//         <Route path="/" element={<ShoppingLayout />}>
//           <Route index element={<ShoppingHome />} /> {/* Default child route */}
//           <Route path="listing" element={<ShoppingListing />} />
//           <Route path="checkout" element={<ShoppingCheckout />} />
//           <Route path="account" element={<ShoppingAccount />} />
//           <Route path="paypal-return" element={<PaypalReturnPage />} />
//           <Route path="payment-success" element={<PaymentSuccessPage />} />
//           <Route path="search" element={<SearchProducts />} />
//         </Route>

//         {/* Authentication routes */}
//         <Route
//           path="/auth"
//           element={
//             <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//               <AuthLayout />
//             </CheckAuth>
//           }
//         >
//           <Route path="login" element={<AuthLogin />} />
//           <Route path="register" element={<AuthRegister />} />
//           <Route path="send" element={<AuthSendEmail />} />
//           <Route path="forget" element={<AuthForget />} />
         

//         </Route>

//         {/* Admin routes */}
//         <Route
//           path="/admin"
//           element={
//             <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//               <AdminLayout />
//             </CheckAuth>
//           }
//         >
//           <Route path="dashboard" element={<AdminDashboard />} />
//           <Route path="products" element={<AdminProducts />} />
//           <Route path="orders" element={<AdminOrders />} />
//           <Route path="features" element={<AdminFeatures />} />
//         </Route>

//         {/* Unauthenticated and Not Found routes */}
//         <Route path="/unauth-page" element={<UnauthPage />} />
//         <Route path="*" element={<NotFound />} />
//         <Route path="/forget" element={<AuthForget />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

import React, { Suspense, lazy, useEffect } from "react";
import { Route, Routes,useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import { initGA, logPageView } from "./GoogleAnalytics";

// Eagerly loaded components
import ShoppingLayout from "./components/shopping-view/layout";
import CheckAuth from "./components/common/check-auth";

// Lazy loaded components
const AuthLayout = lazy(() => import("./components/auth/layout"));
const AdminLayout = lazy(() => import("./components/admin-view/layout"));
const NotFound = lazy(() => import("./pages/not-found"));
const UnauthPage = lazy(() => import("./pages/unauth-page"));

// Shopping routes
const ShoppingHome = lazy(() => import("./pages/shopping-view/home"));
const ShoppingListing = lazy(() => import("./pages/shopping-view/listing"));
const ShoppingCheckout = lazy(() => import("./pages/shopping-view/checkout"));
const ShoppingAccount = lazy(() => import("./pages/shopping-view/account"));
const PaypalReturnPage = lazy(() => import("./pages/shopping-view/paypal-return"));
const PaymentSuccessPage = lazy(() => import("./pages/shopping-view/payment-success"));
const SearchProducts = lazy(() => import("./pages/shopping-view/search"));

// Auth routes
const AuthLogin = lazy(() => import("./pages/auth/login"));
const AuthRegister = lazy(() => import("./pages/auth/register"));
const AuthSendEmail = lazy(() => import("./pages/auth/sendEmail"));
const AuthForget = lazy(() => import("./pages/auth/forget"));

// Admin routes
const AdminDashboard = lazy(() => import("./pages/admin-view/dashboard"));
const AdminProducts = lazy(() => import("./pages/admin-view/products"));
const AdminOrders = lazy(() => import("./pages/admin-view/orders"));
const AdminFeatures = lazy(() => import("./pages/admin-view/features"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="flex flex-col items-center gap-4">
      <Skeleton className="w-[800px] h-[600px] bg-gray-200" />
      <div className="text-gray-500">Loading...</div>
    </div>
  </div>
);

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    initGA(); // Initialize GA
    logPageView(); // Track initial page load
  }, []);

  useEffect(() => {
    logPageView(); // Track every route change
  }, [location]);


  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <LoadingFallback />;

  return (
    <div className="flex flex-col overflow-hidden">
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Default route for Shopping Layout and Shopping Home */}
          <Route path="/" element={<ShoppingLayout />}>
            <Route index element={
              <Suspense fallback={<Skeleton className="w-full h-[600px]" />}>
                <ShoppingHome />
              </Suspense>
            } />
            <Route path="listing" element={
              <Suspense fallback={<Skeleton className="w-full h-[600px]" />}>
                <ShoppingListing />
              </Suspense>
            } />
            <Route path="checkout" element={
              <Suspense fallback={<Skeleton className="w-full h-[500px]" />}>
                <ShoppingCheckout />
              </Suspense>
            } />
            <Route path="account" element={
              <Suspense fallback={<Skeleton className="w-full h-[400px]" />}>
                <ShoppingAccount />
              </Suspense>
            } />
            <Route path="paypal-return" element={
              <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
                <PaypalReturnPage />
              </Suspense>
            } />
            <Route path="payment-success" element={
              <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
                <PaymentSuccessPage />
              </Suspense>
            } />
            <Route path="search" element={
              <Suspense fallback={<Skeleton className="w-full h-[500px]" />}>
                <SearchProducts />
              </Suspense>
            } />
          </Route>

          {/* Authentication routes */}
          <Route
            path="/auth"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <Suspense fallback={<LoadingFallback />}>
                  <AuthLayout />
                </Suspense>
              </CheckAuth>
            }
          >
            <Route path="login" element={
              <Suspense fallback={<Skeleton className="w-full h-[400px]" />}>
                <AuthLogin />
              </Suspense>
            } />
            <Route path="register" element={
              <Suspense fallback={<Skeleton className="w-full h-[400px]" />}>
                <AuthRegister />
              </Suspense>
            } />
            <Route path="send" element={
              <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
                <AuthSendEmail />
              </Suspense>
            } />
            <Route path="forget" element={
              <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
                <AuthForget />
              </Suspense>
            } />
          </Route>

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <Suspense fallback={<LoadingFallback />}>
                  <AdminLayout />
                </Suspense>
              </CheckAuth>
            }
          >
            <Route path="dashboard" element={
              <Suspense fallback={<Skeleton className="w-full h-[500px]" />}>
                <AdminDashboard />
              </Suspense>
            } />
            <Route path="products" element={
              <Suspense fallback={<Skeleton className="w-full h-[500px]" />}>
                <AdminProducts />
              </Suspense>
            } />
            <Route path="orders" element={
              <Suspense fallback={<Skeleton className="w-full h-[500px]" />}>
                <AdminOrders />
              </Suspense>
            } />
            <Route path="features" element={
              <Suspense fallback={<Skeleton className="w-full h-[500px]" />}>
                <AdminFeatures />
              </Suspense>
            } />
          </Route>

          {/* Unauthenticated and Not Found routes */}
          <Route path="/unauth-page" element={
            <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
              <UnauthPage />
            </Suspense>
          } />
          <Route path="*" element={
            <Suspense fallback={<Skeleton className="w-full h-[400px]" />}>
              <NotFound />
            </Suspense>
          } />
          <Route path="/forget" element={
            <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
              <AuthForget />
            </Suspense>
          } />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;