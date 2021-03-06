import _ from "lodash";
import React from "react";
import { Route, Switch } from "react-router-dom";
import SignIn from "containers/SignIn/Loadable";

import Dashboard from "containers/Dashboard/Loadable";
import Home from "containers/Home/Loadable";
import TripRoute from "containers/TripRoute/Loadable";
import Map from "containers/Map/Loadable";
import MyAccount from "containers/MyAccount/Loadable";

import Profile from "containers/Profile/Loadable";
import NotFoundPage from "containers/NotFoundPage/Loadable";
import AuthorizedLayout from "components/Layout/AuthorizedLayout";
import GuestLayout from "components/Layout/GuestLayout";
import Public from "components/Layout/Public";
// Authorized router
export const MainRouter = (props) => {
  return (
    <Switch>
      {_.map(authorizedRoutes, (route, routeId) => {
        return <Route key={routeId} {...route} {...props} />;
      })}
    </Switch>
  );
};
// Các routes được public khi không đăng nhập

export const publicRouter = [
  {
    path: "/signin",
    exact: true,
    layout: GuestLayout,
    component: SignIn,
  },

  {
    path: "/",
    layout: AuthorizedLayout,
    component: MainRouter,
  },
];
export const authorizedRoutes = [
  {
    path: "/profile",
    exact: true,
    component: Profile,
  },
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/tai-khoan/thong-tin-ca-nhan",
    exact: true,
    component: MyAccount,
  },
  {
    path: "/map",
    exact: true,
    component: Map,
  },
  {
    path: "/xe-khach/:from/:to",
    exact: true,
    component: TripRoute,
  },
  {
    path: "*",
    exact: true,
    component: NotFoundPage,
  },
];
