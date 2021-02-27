import React, { FC, ReactNode } from "react";
import { useHistory } from "react-router-dom";
import { PageHeader, Button } from "antd";

import {
  RouteKey,
  RouteTitle,
  RouteOnBackRoute,
  RoutePath
} from "../configs/routes";

import { Spinner } from "./Spinner";

export interface LayoutProps {
  active: RouteKey;
  children: ReactNode;
  isLoading?: boolean;
}

export const Layout: FC<LayoutProps> = props => {
  const history = useHistory();
  const routeOnBack = RouteOnBackRoute[props.active] || null;
  const onBackCallback = routeOnBack ? () => history.push(RoutePath[routeOnBack]) : undefined;

  const content = props.isLoading
    ? <Spinner />
    : props.children;

  return (
    <div className="layout">
      <div className="layout__container">
        <PageHeader
          ghost={false}
          onBack={onBackCallback}
          title={RouteTitle[props.active]}
          extra={[
            [RouteKey.INDEX, RouteKey.RECIPE].includes(props.active) && (
              <Button
                key="1"
                type="primary"
                danger={true}
                onClick={() => history.push(RoutePath[RouteKey.MANAGE_LIST])}
              >
                Admin
              </Button>
            ),
            [RouteKey.MANAGE_LIST].includes(props.active) && (
              <Button
                key="2"
                type="primary"
                onClick={() => history.push(RoutePath[RouteKey.MANAGE_CREATE])}
              >
                + Create
              </Button>
            )
          ]}
        />

        <main className="layout__main">{content}</main>
      </div>
    </div>
  )
}