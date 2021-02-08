/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import styled from 'styled-components';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { defineMessages, FormattedMessage } from 'react-intl';
import * as style from 'components/Variables';
import classNames from "classnames";
import { DownOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button, Row, Col } from 'antd';
import icon_nine_dot from "images/icon_nine_dot.png";
import logo from "images/logo.png";
const prefix = 'app.routing.';
const HeaderSidebar = memo(({ className }) => {
  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
          3rd menu item
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={classNames({
      [className]: true,
    })}>
      <div className="header">
        <Row className="row" style={{ flex: 1, maxWidth: "1200px" }} align="middle" >
          <Col xs={4} sm={4} md={4} lg={4} xl={4}>
            <a><img src={icon_nine_dot} style={{ width: "32px", height: "32px" }} /></a>
            <a><img src={logo} style={{ width: "144px", height: "30px" }} /></a>
          </Col>
          <Col xs={20} sm={20} md={20} lg={20} xl={20}>
            <Row justify="end" align="middle">
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  Tuyến đường <DownOutlined />
                </a>
              </Dropdown>
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  Khám phá <DownOutlined />
                </a>
              </Dropdown>
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  Dịch vụ <DownOutlined />
                </a>
              </Dropdown>
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  Chúng tôi <DownOutlined />
                </a>
              </Dropdown>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                Hỗ trợ
                </a>
              <div style={{ paddingLeft: "4px", paddingRight: "4px" }} className="ant-col">
                <div style={{ color: "#333", padding: "8px", borderRadius: "4px", border: "2px solid #CC9800" }} className="noselect">Đăng nhập</div>
              </div>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
});

HeaderSidebar.propTypes = {
  className: PropTypes.any,
  pathName: PropTypes.any,
};

export default memo(styled(HeaderSidebar)`
  padding: 1rem 0 1rem 0;
  a {
    color: ${style.color.haiVan.primary};
    font-weight: bold;
    font-size: ${style.fontsize.reg};
  }
  a:hover {
    color: ${style.color.haiVan.bg} !important;
  }
  .header {
    height: 64px;
    width: 100vw;
    background-color: #FFDD2B;
    display: flex;
    justify-content: center;
    flex-direction: row;
    position: fixed;
    top: 0;
    z-index: 1000;
  }
  .ant-dropdown-link {
    padding-right: 20px;
  }
`);
