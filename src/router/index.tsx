import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Login from "../pages/Login";
import Layout from "../layout";
import Home from "../pages/Home";
import News from "../pages/news";
import HeightCalculator from "../pages/HeightCalculator";
import Details from "../pages/HeightCalculator/Details";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/tin-tuc" element={<News />} />
        <Route path="/du-doan-chieu-cao" element={<HeightCalculator />} />
        <Route path="/du-doan-chieu-cao/:id" element={<Details />} />
      </Route>
    </>
  )
);

export default router;