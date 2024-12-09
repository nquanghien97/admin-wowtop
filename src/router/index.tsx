import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Login from "../pages/Login";
import Layout from "../layout";
import Home from "../pages/Home";
import News from "../pages/news";
import HeightCalculator from "../pages/HeightCalculator";
import Details from "../pages/HeightCalculator/Details";
import Order from "../pages/Order";
import AccumulatePoints from "../pages/AccumulatePoints";
import UsersManagement from "../pages/UsersManagement";

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
        <Route path="/don-hang" element={<Order />} />
        <Route path="/ma-tich-diem" element={<AccumulatePoints />} />
        <Route path="/quan-ly-nguoi-dung" element={<UsersManagement />} />
      </Route>
    </>
  )
);

export default router;