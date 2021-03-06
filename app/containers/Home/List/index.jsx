import React, {
  memo,
  useEffect,
  useMemo,
  Component,
  useState,
  useCallback,
} from "react";
import {
  Table,
  Badge,
  Menu,
  Dropdown,
  Space,
  Button,
  Input,
  Spin,
  Row,
  Col,
  TreeSelect,
  DatePicker,
  Divider,
  AutoComplete,
} from "antd";
import classNames from "classnames";
import moment from "moment";
import _, { isNull } from "lodash";
import styled from "styled-components";
import * as style from "components/Variables";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RightOutlined } from "@ant-design/icons";
import { $Cookies } from "utils/cookies";
import Axios from "axios";
import icon_phone1 from "images/icon_phone1.png";
import icon_phone2 from "images/icon_phone2.png";
import icon_phone3 from "images/icon_phone3.png";
import icon_clock from "images/icon_clock.png";

let time = null;
const { TreeNode } = TreeSelect;
const { Option } = AutoComplete;
const List = memo(
  ({ className, setParams, data, params, dataPlace, setDataPlace }) => {
    const [inputPlace, setInputPlace] = useState([]);
    const setCookie = (item, index) => {
      $Cookies.set("tuy_id", item.tuy_id);
    }
    _.map(dataPlace, (itemDatatPlace, index) => {
      itemDatatPlace.title = itemDatatPlace.name;
      itemDatatPlace.value = itemDatatPlace.id;
      _.map(itemDatatPlace.places, (item, key) => {
        item.title = item.name;
        item.value = item.name;
      });
      itemDatatPlace.children = itemDatatPlace.places;
    });

    const [value, setValue] = useState("");
    //Function covert phút => giờ phút
    function timeConvert(n) {
      var num = n;
      var hours = num / 60;
      var rhours = Math.floor(hours);
      var minutes = (hours - rhours) * 60;
      var rminutes = Math.round(minutes);
      return rhours + "h" + rminutes;
    }
    const [input, setInput] = useState([]);
    // const boweloadData = useCallback(async () => {
    //   //api điểm đến
    //   if (input === "") {
    //     setInputPlace([]);
    //   } else {
    //     if (input != "") {
    //       const urlPlace =
    //         "https://place.havaz.vn/api/v1/places?input=" +
    //         input +
    //         "&api_token=6tihDYHMeDKem5nvi2SnZ04o4cXRloZsyoMkJ6RsltPy5irdkCpR0QTyCk2v";
    //       Axios.get(urlPlace).then((repos) => {
    //         const result = repos.data.data;
    //         setInputPlace(result);
    //       });
    //     }
    //   }
    // }, [input]);
    // useEffect(() => {
    //   clearTimeout(time);
    //   time = setTimeout(boweloadData, 800);
    // }, [boweloadData]);
    const onSearch = (searchText) => {
      setInput(searchText);
      // onChangeInput(searchText);
    };

    const onSelect = (data) => {
      // console.log('onSelect', data);
    };

    const onChange = (data) => {
      setValue(data);
    };

    const getQuery = useCallback(
      (value, name) => {
        setParams((preState) => {
          let nextState = { ...preState };
          nextState[name] = value;
          return nextState;
        });
      },
      [params]
    );
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    };
    const day = moment();
    return (
      <div
        className={classNames({
          [className]: true,
        })}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ flex: "1", maxWidth: "1200px" }}>
            <h1 style={{ display: "none" }}>
              Đặt Xe Khách Bắc Ninh-Hà Nội-Sapa-Lào Cai | Nhà Xe Hà Sơn Hải Vân
            </h1>
            <Row style={{ flex: "1" }}>
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={8}
                justify="space-around"
                align="middle"
              >
                <img
                  src={icon_phone1}
                  style={{ with: "64px", height: "64px" }}
                  alt="Đặt vé dễ dàng"
                />
                <h3 className="h3_title">Đặt vé dễ dàng</h3>
                <div className="desciption">
                  Thao tác đơn giản, đặt vé giữ chỗ
                  <br />
                  nhanh chóng chỉ 30s
                </div>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={8}
                justify="space-around"
                align="middle"
              >
                <img
                  src={icon_phone2}
                  style={{ with: "64px", height: "64px" }}
                  alt="Đặt vé dễ dàng"
                />
                <h3 className="h3_title">Đa dạng dịch vụ</h3>
                <div className="desciption">
                  Hạng thấp đến cao, vé nào cũng có
                  <br />
                  Dòng xe đa dạng phục vụ mọi nhu cầu
                </div>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={8}
                justify="space-around"
                align="middle"
              >
                <img
                  src={icon_phone3}
                  style={{ with: "64px", height: "64px" }}
                  alt="Đặt vé dễ dàng"
                />
                <h3 className="h3_title">Phục vụ chu đáo</h3>
                <div className="desciption">
                  Dịch vụ chuyên nghiệp
                  <br />
                  nhân sự chu đáo, phục vụ tận tâm.
                </div>
              </Col>
              <Divider
                style={{
                  borderWidth: "1.5px",
                  borderColor: "rgba(0, 0, 0, 0.1)",
                }}
              />
              <Col xs={24} sm={24} md={24} lg={24}>
                <div
                  style={{
                    marginTop: "20px",
                    fontWeight: "500",
                    fontSize: "24px",
                    marginBottom: "32px",
                  }}
                >
                  Các tuyến phổ biến
                </div>
              </Col>
              <div style={{ marginBottom: "48px" }}>
                <Row style={{ margin: "-8px -8px 8px -8px" }}>
                  {_.map(data, (item, index) => {
                    return (
                      <Col
                        xs={24}
                        sm={24}
                        md={12}
                        lg={8}
                        style={{ padding: "8px" }}
                      >
                        <a
                          className="cardview d-flex flex-column"
                          target="_self"
                          href={`/xe-khach/${item.slug}`}
                          onClick={() => setCookie(item, index)}
                          style={{
                            borderRadius: "4px",
                            textDecoration: "none",
                            color: "rgb(88, 89, 91)",
                            position: "relative",
                          }}
                        >
                          <img
                            src={`https://cms.hasonhaivan.com/${
                              item.tuy_image
                            }`}
                            style={{
                              width: "100%",
                              height: "auto",
                              borderRadius: "4px",
                              objectFit: "cover",
                            }}
                          />
                          <div
                            className="d-flex flex-column"
                            style={{ padding: "12px 16px" }}
                          >
                            <h2
                              style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                marginBottom: "0px",
                              }}
                            >
                              {item.tuy_ten}
                            </h2>
                            <div
                              className="d-flex flex-row"
                              style={{ fontSize: "16px" }}
                            >
                              <div className="flex-fill">
                                {item.tuy_gia_nho_nhat}
                              </div>
                              <div className="d-flex flex-row justify-content-center align-items-center">
                                <img
                                  src={icon_clock}
                                  alt="Thời gian"
                                  style={{ width: "16px", height: "16px" }}
                                />
                                <div>
                                  {" "}
                                  {timeConvert(item.tuy_thoi_gian_chay)}{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              position: "absolute",
                              border: "2px solid rgb(255, 221, 43)",
                              backgroundColor: "rgb(200, 0, 0)",
                              borderRadius: "0px 40px 40px 0px",
                              top: "8px",
                              left: "-8px",
                              display: `${item.tuy_moi == 1 ? "" : "none"}`,
                            }}
                          >
                            <div
                              style={{
                                fontWeight: "700",
                                padding: "4px 12px",
                                color: "rgb(255, 221, 43)",
                                fontSize: "14px",
                              }}
                            >
                              Mới khai trương
                            </div>
                          </div>
                        </a>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </Row>
          </div>
        </div>
      </div>
    );
  }
);

export default styled(List)`
  input#rc_select_0, input#rc_select_6 {
    height: 55px;
  }
  input#control-ref_name {
    height: 55px!important;
  }
  .slider {
    height: 456px;
    background-color: rgb(62, 62, 62);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    width: 100%;
  }
  .search {
    background-color: #ffffff;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
    border-radius: 0px 4px 4px 4px;
  }
  // .padding_input {
  //   margin-left: -8px;
  //   margin-right: -8px;
  //   margin-top: -4px;
  //   margin-bottom: 4px;
  // }
  // .tree_select {
  //   padding-left: 8px;
  //   padding-right: 8px;
  //   padding-top: 4px;
  //   padding-bottom: 4px;
  // }
  // .ant-picker-input {
  //   padding: 2px;
  // }
  // .ant-picker-large {
  //   padding: 14px;
  // }
  // span.ant-select-selection-placeholder {
  //   margin-top; 12px!important;
  // }
  .ant-select-single .ant-select-selector .ant-select-selection-item, .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
    line-height: 55px;
  }
  input#rc_select_1 {
    height: 55px;
  }
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    height: 56px !important;
  }
  .h3_title {
    font-size: 24px;
    font-weight: bold;
    line-height: 28px;
    text-align: center;
    margin-top: 16px;
  }
  .description {
    font-size: 16px;
    lineheight: 19px;
    text-align: center;
    margin-top: 4px;
  }
  .ant-select-single.ant-select-lg:not(.ant-select-customize-input) .ant-select-selector::after, .ant-select-single.ant-select-lg:not(.ant-select-customize-input) .ant-select-selector .ant-select-selection-item, .ant-select-single.ant-select-lg:not(.ant-select-customize-input) .ant-select-selector .ant-select-selection-placeholder {
    line-height: 55px;
  }
  .cardview {
    box-shadow: 0 4px 8px rgb(0 0 0 / 10%);
    background-color: #fff;
    z-index: 9;
  }
  
`;
