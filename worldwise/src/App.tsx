import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, NotFound, Pricing, Product, AppLayout, Login } from "@/pages";
import { CityList } from "@/components";
import { useGetCities } from "@/hooks";

export const App = () => {
  const { cities, isLoading } = useGetCities();

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="countries" element={<p>test</p>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
