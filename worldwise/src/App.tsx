import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home, NotFound, Pricing, Product, AppLayout, Login } from "@/pages";
import {
  City,
  CityList,
  CountryList,
  Form,
  ProtectedRoute,
} from "@/components";
import { useAuthContext } from "@/contexts";

export const App = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="app" element={<AppLayout />}>
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
            <Route index path="cities" element={<CityList />} />
            <Route index path="cities/:id" element={<City />} />
            <Route index element={<Navigate to="cities" replace />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
