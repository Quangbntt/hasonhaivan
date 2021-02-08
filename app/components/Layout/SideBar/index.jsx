/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { memo, useState } from "react";
import { Layout, Menu, Card } from "antd";
import { DropboxOutlined, CodepenOutlined } from "@ant-design/icons";
import styled from "styled-components";
import PropTypes from "prop-types";
import * as style from "components/Variables";
import classNames from "classnames";
import { Link, useHistory } from "react-router-dom";
import _ from "lodash";
import Icon from "images/avatar.png";
import IconMenu from "images/ezgif.com-gif-maker(1).gif";
import { $Cookies } from "utils/cookies";
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const SideBar = memo(({ className, appConfig, collapsed }) => {
  const proFile = $Cookies.get("ERP_REPORT")
    ? JSON.parse($Cookies.get("ERP_REPORT"))
    : {};
  const nameProject = _.get(proFile, "projectName");
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{ height: "calc(100vh - 0px)", overflowY: "auto" }}
    >
      <div
        className={classNames({
          [className]: true,
        })}
      >
        {collapsed ? (
          <p
            className="d-flex justify-content-center"
            style={{ color: "#001529", fontWeight: "bold" }}
          >
            <img
              src={Icon}
              alt="ERP REPORT"
              style={{ height: 40, width: 45, borderRadius: 40, marginTop: 10 }}
            />
          </p>
        ) : (
          <div
            className="log d-flex justify-content-center mt_10"
            style={{
              background: "#001529",
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          >
            <img
              src={Icon}
              alt="ERP REPORT"
              style={{ height: 40, width: 45, borderRadius: 40, marginTop: 10 }}
            />
            <b
              style={{
                display: "flex",
                alignItems: "center",
                color: "#fff",
                marginLeft: 10,
              }}
            >
              {nameProject}
            </b>
          </div>
        )}

        <Menu mode="inline" theme="dark">
          {_.map(appConfig, (item, index) => {
            let _render;
            if (item.children.length > 0) {
              _render = (
                <SubMenu
                  key={item.mod_id}
                  title={item.name}
                  icon={<CodepenOutlined />}
                >
                  {_.map(item.children, (_item, _index) => {
                    let linkNew = `/${_item.mod_folder}/${_item.path}`;
                    return (
                      <Menu.Item key={_item.mod_id}>
                        <Link to={linkNew} title={linkNew}>
                          <DropboxOutlined /> {_item.name}
                        </Link>
                      </Menu.Item>
                    );
                  })}
                </SubMenu>
              );
              return _render;
            }
            return (
              <Menu.Item key={item.mod_id} icon={<CodepenOutlined />}>
                <Link to={`${item.mod_folder}/${item.path}`} title={item.name}>
                  {item.name}
                </Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </div>
    </Sider>
  );
});
export default styled(SideBar)`
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: #1890ff;
  }

  .logo {
    height: 35px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }

  .site-layout .site-layout-background {
    background: red;
  }
  .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal)
    .ant-menu-item-selected {
    background: ${style.color.haiVan.bg};
  }
  .ant-menu-dark .ant-menu-item-selected > a,
  .ant-menu-dark .ant-menu-item-selected > span > a,
  .ant-menu-dark .ant-menu-item-selected > a:hover,
  .ant-menu-dark .ant-menu-item-selected > span > a:hover {
    color: black;
    font-weight: bold;
  }
  .ant-menu-dark .ant-menu-item-selected .anticon {
    color: black;
  }
  .ant-menu-dark .ant-menu-item:hover {
    background: ${style.color.haiVan.bg};
    font-weight: bold;
    a:hover {
      color: black;
    }
  }
  .ant-menu-dark .ant-menu-submenu-title:hover {
    color: ${style.color.haiVan.bg};
  }
  // chỉnh chiều dài của menu
  .ant-menu-dark.ant-menu-inline .ant-menu-item,
  .ant-menu-dark.ant-menu-inline .ant-menu-submenu-title {
    padding-left: 10px !important;
  }
  .ant-menu-dark .ant-menu-inline.ant-menu-sub {
    padding-left: 10px !important;
  }
`;
