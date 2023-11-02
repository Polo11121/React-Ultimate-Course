import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home, NotFound, Pricing, Product, AppLayout, Login } from "@/pages";
import { City, CityList, CountryList, Form } from "@/components";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="app" element={<AppLayout />}>
          <Route path="countries" element={<CountryList />} />
          <Route path="form" element={<Form />} />
          <Route index path="cities" element={<CityList />} />
          <Route index path="cities/:id" element={<City />} />
          <Route index element={<Navigate to="cities" replace />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
