import React, { useEffect } from "react";
import { Routes, Navigate, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveUser } from "../redux/Actions/user.action";

export function PrivateRoute({ children }) {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("auth"));
  const { user } = useSelector(({ User }) => User);
  useEffect(() => {
    if (token && !user) {
      dispatch(saveUser(token));
      console.log("done mfks");
    }
  }, [token, user]);

  return token ? children : <Navigate to="/authantication" replace />;
}
