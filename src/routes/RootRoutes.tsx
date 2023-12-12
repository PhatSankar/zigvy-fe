import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";

function RootRoutes() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default RootRoutes;
