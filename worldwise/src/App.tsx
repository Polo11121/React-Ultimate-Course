import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  City,
  CityList,
  CountryList,
  Form,
  ProtectedRoute,
  SpinnerFull,
} from "@/components";
import { useAuthContext } from "@/contexts";

const HomePage = lazy(() => import("@/pages/Home/Home"));
const NotFoundPage = lazy(() => import("@/pages/NotFound/NotFound"));
const PricingPage = lazy(() => import("@/pages/Pricing/Pricing"));
const ProductPage = lazy(() => import("@/pages/Product/Product"));
const AppLayoutPage = lazy(() => import("@/pages/AppLayout/AppLayout"));
const LoginPage = lazy(() => import("@/pages/Login/Login"));

export const App = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <BrowserRouter>
      <Suspense fallback={<SpinnerFull />}>
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="app" element={<AppLayoutPage />}>
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
              <Route index path="cities" element={<CityList />} />
              <Route index path="cities/:id" element={<City />} />
              <Route index element={<Navigate to="cities" replace />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
