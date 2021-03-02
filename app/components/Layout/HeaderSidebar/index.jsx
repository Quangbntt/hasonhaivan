/* eslint-disable no-underscore-dangle */
import PropTypes from "prop-types";
import React, { memo, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Breadcrumb, Modal } from "antd";
import { Link, useHistory } from "react-router-dom";
import { defineMessages, FormattedMessage } from "react-intl";
import * as style from "components/Variables";
import classNames from "classnames";
import { DownOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button, Row, Col } from "antd";
import icon_nine_dot from "images/icon_nine_dot.png";
import logo from "images/logo.png";
import ModalVerify from "./ModalVerify";
import ModalLogin from "./ModalLogin";
import { $Cookies } from "utils/cookies";
import Globals from "utils/globals";

const prefix = "app.routing.";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
let time = null;
const HeaderSidebar = memo(({ className, onLogOut }) => {
  const history = useHistory();
  const [visible, setVisible] = useState({
    isShow: false,
  });
  const [show, setShow] = useState({
    isShow: false,
    isLogin: false,
  });
  const [dataUser, setDataUser] = useState({});
  const [params, setParams] = useState({
    phone: undefined,
    captcha: undefined,
  });
  const [checkOut, setCheckout] = useState(false);
  const [row, setRow] = useState({
    data: [],
    arrKey: [],
    dataOld: [],
  });
  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://hasonhaivan.com/tuyen-duong/ha-noi-lao-cai"
        >
          Hà Nội - Lào Cai
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://hasonhaivan.com/tuyen-duong/ha-noi-bac-ha"
        >
          Hà Nội - Bắc Hà
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://hasonhaivan.com/tuyen-duong/ha-noi-sa-pa"
        >
          Hà Nội - SaPa
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://hasonhaivan.com/tuyen-duong/lao-cai-bac-ninh"
        >
          Lào Cai - Bắc Ninh
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://hasonhaivan.com/tuyen-duong/sa-pa-bac-ninh"
        >
          Sapa - Bắc Ninh
        </a>
      </Menu.Item>
    </Menu>
  );
  const menu1 = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://hasonhaivan.com/diem-den"
        >
          Điểm đến
        </a>
      </Menu.Item>
    </Menu>
  );
  const menu2 = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://hasonhaivan.com/dich-vu/xe-lien-tinh/tien-ich-tren-xe"
        >
          Xe liên tỉnh
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://hasonhaivan.com/dich-vu/hang-hoa/"
        >
          Hàng hóa
        </a>
      </Menu.Item>
    </Menu>
  );
  const menu3 = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://hasonhaivan.com/chung-toi/gioi-thieu"
        >
          Vế HASONHAIVAN
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://hasonhaivan.com/chung-toi/an-toan-chat-luong"
        >
          An toàn & chất lượng
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://hasonhaivan.com/chung-toi/phat-trien-ben-vung"
        >
          Phát triển bền vững
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://hasonhaivan.com/chung-toi/danh-gia-cua-khach-hang"
        >
          Đánh giá của khách hàng
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://hasonhaivan.com/chung-toi/doi-tac"
        >
          Đối tác
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://hasonhaivan.com/chung-toi/bao-chi-tin-tuc"
        >
          Tin tức
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://hasonhaivan.com/chung-toi/tuyen-dung"
        >
          Tuyển dụng
        </a>
      </Menu.Item>
    </Menu>
  );
  const menuUser = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Thông tin cá nhân
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Chuyến đi của tôi
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" onClick={() => test()}>
          Đăng xuất
        </a>
      </Menu.Item>
    </Menu>
  );
  
  const test = () => {
    Globals.clear();
    $Cookies.remove("TOKEN");
    setCheckout(true);
    // onLogOut();
  };
  useEffect(() => {
    clearTimeout(time);
    time = setTimeout(checkOut, 800);
  }, [checkOut]);
  
  return (
    <div
      className={classNames({
        [className]: true,
      })}
      style={{ height: "64px" }}
    >
      <ModalLogin
        visible={visible}
        setVisible={setVisible}
        setRow={setRow}
        row={row}
        forceRender={true}
        show={show}
        setShow={setShow}
        params={params}
        setParams={setParams}
        // data={data}
      />
      {_.get(show, "isShow") && (
        <ModalVerify
          checkOut={checkOut}
          setCheckout={setCheckout}
          show={show}
          setShow={setShow}
          params={params}
          setParams={setParams}
          dataUser={dataUser}
          setDataUser={setDataUser}
        />
      )}
      <div className="header">
        <Row
          className="row"
          style={{ flex: 1, maxWidth: "1200px" }}
          align="middle"
        >
          <Col xs={4} sm={4} md={4} lg={4} xl={4}>
            <a>
              <img
                src={icon_nine_dot}
                style={{ width: "32px", height: "32px" }}
              />
            </a>
            <a href="/">
              <img
                src={logo}
                style={{ width: "144px", height: "30px", marginLeft: "8px" }}
              />
            </a>
          </Col>
          <Col xs={20} sm={20} md={20} lg={20} xl={20}>
            <Row justify="end" align="middle">
              <Dropdown overlay={menu} placement="bottomRight">
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  Tuyến đường <DownOutlined />
                </a>
              </Dropdown>
              <Dropdown overlay={menu1} placement="bottomRight">
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  Khám phá <DownOutlined />
                </a>
              </Dropdown>
              <Dropdown overlay={menu2} placement="bottomRight">
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  Dịch vụ <DownOutlined />
                </a>
              </Dropdown>
              <Dropdown overlay={menu3} placement="bottomRight">
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  Chúng tôi <DownOutlined />
                </a>
              </Dropdown>
              <a
                className="ant-dropdown-link"
                href="https://hasonhaivan.com/ho-tro"
              >
                Hỗ trợ
              </a>
              {$Cookies.get("TOKEN") != null ? (
                <div
                  style={{
                    paddingLeft: "4px",
                    paddingRight: "4px",
                    cursor: "pointer",
                  }}
                  className="ant-col"
                >
                  <Dropdown
                    overlay={menuUser}
                    trigger={["click"]}
                    className="noselect"
                    placement="bottomRight"
                  >
                    <a
                      className="ant-dropdown-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      Tài khoản <DownOutlined />
                    </a>
                  </Dropdown>
                </div>
              ) : (
                <div
                  style={{
                    paddingLeft: "4px",
                    paddingRight: "4px",
                    cursor: "pointer",
                  }}
                  className="ant-col"
                  onClick={() => {
                    setVisible((preState) => {
                      let nextState = { ...preState };
                      nextState.isShow = true;
                      return nextState;
                    });
                  }}
                >
                  <div
                    style={{
                      color: "#333",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "2px solid #CC9800",
                    }}
                    className="noselect"
                  >
                    Đăng nhập
                  </div>
                </div>
              )}
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
});

HeaderSidebar.propTypes = {
  className: PropTypes.any.isRequired,
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
    background-color: #ffdd2b;
    display: flex;
    justify-content: center;
    flex-direction: row;
    position: fixed;
    top: 0;
    z-index: 1000;
  }
  .ant-dropdown-link {
    padding-right: 25px;
  }
  .ant-row.ant-row-end.ant-row-middle:hover a {
    color: #000 !important;
  }
  .ant-row.ant-row-end.ant-row-middle a {
    font-weight: 400;
  }
  a.ant-dropdown-trigger.ant-dropdown-link.noselect {
    background: #ffdd2b !important;
    color: rgb(51, 51, 51);
    padding: 10px;
    border-radius: 4px;
    border: 2px solid rgb(204, 152, 0);
  }
`);
