import React from "react";
import { json, Navigate, Outlet } from "react-router-dom";

export default function StudentRouteGuard() {
  const userdata = JSON.parse(sessionStorage.getItem("userdata"));
  if (userdata != undefined) {
    if (userdata.role == "student") {
      return <Outlet />;
    }
  } else {
    return <Navigate to="/" />;
  }
}
