import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, NotFound, Pricing, Product, AppLayout } from "@/pages";
import { PageNav } from "@/components";

export const App = () => (
  <BrowserRouter>
    <PageNav />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="product" element={<Product />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="app" element={<AppLayout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
