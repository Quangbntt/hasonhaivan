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
  import bannerhv from "images/bannerhv.jpg";
  import Axios from "axios";

  
  let timeout;
  let currentValue;
  let time = null;
  const { TreeNode } = TreeSelect;
  const { Option } = AutoComplete;
  const List = memo(
    ({ className, setParams, params, dataPlace, setDataPlace, searchData, setSearchData }) => {
      const [inputPlace, setInputPlace] = useState([]);
      const [treeInputPlace, setTreeInputPlace] = useState([]);
      _.map(dataPlace, (itemDatatPlace, index) => {
        itemDatatPlace.title = itemDatatPlace.name;
        itemDatatPlace.value = itemDatatPlace.id;
        _.map(itemDatatPlace.places, (item, key) => {
          item.title = item.name;
          item.value = item.name;
        });
        itemDatatPlace.children = itemDatatPlace.places;
      });
  
      const [rowPhone, setRowPhone] = useState({
        dataPhone: [],
        value: undefined,
        loadingPhone: false,
      });
      // tìm địa chỉ xuất phát trong Filter
      const onSearchPhone = (value) => {
        if (value) {
          fetch(value, (data) =>
            setRowPhone((preState) => {
              let nextState = { ...preState };
              nextState.dataPhone = data;
              nextState.value = value;
              return nextState;
            })
          );
        } else {
          setRowPhone((preState) => {
            let nextState = { ...preState };
            nextState.dataPhone = [];
            return nextState;
          });
        }
      };
      // call api điểm đến khi người dùng nhập
      const fetch = (value, callback) => {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        currentValue = value;
        // sdt
        const fake = async () => {
          if (value.length >= 3) {
            if (currentValue === "") {
              setTreeInputPlace([]);
            } else {
              if (currentValue != "") {
                const urlPlace =
                  "https://place.havaz.vn/api/v1/places?input=" +
                  currentValue +
                  "&api_token=6tihDYHMeDKem5nvi2SnZ04o4cXRloZsyoMkJ6RsltPy5irdkCpR0QTyCk2v";
                Axios.get(urlPlace).then((repos) => {
                  const result = repos.data.data;
                  setTreeInputPlace(result);
                });
              }
            }
          }
        };
        timeout = setTimeout(fake, 800);
      };
  
      // const onTreeSearch = (e) => {
      //   if (e === "") {
      //     setTreeInputPlace([]);
      //   } else {
      //     if (e != "") {
      //       const urlPlace =
      //         "https://place.havaz.vn/api/v1/places?input=" +
      //         e +
      //         "&api_token=6tihDYHMeDKem5nvi2SnZ04o4cXRloZsyoMkJ6RsltPy5irdkCpR0QTyCk2v";
      //       Axios.get(urlPlace).then((repos) => {
      //         const result = repos.data.data;
      //         setTreeInputPlace(result);
      //       });
      //     }
      //   }
      // };
      const [value, setValue] = useState("");
  
      const [input, setInput] = useState([]);
      // Hàm gọi API trả về data của điểm đến trong Fillter khi người dùng nhập
      const boweloadData = useCallback(async () => {
        //api điểm đến
        if (input === "") {
          setInputPlace([]);
        } else {
          if (input != "") {
            const urlPlace =
              "https://place.havaz.vn/api/v1/places?input=" +
              input +
              "&api_token=6tihDYHMeDKem5nvi2SnZ04o4cXRloZsyoMkJ6RsltPy5irdkCpR0QTyCk2v";
            Axios.get(urlPlace).then((repos) => {
              const result = repos.data.data;
              setInputPlace(result);
            });
          }
        }
      }, [input]);
      useEffect(() => {
        clearTimeout(time);
        time = setTimeout(boweloadData, 800);
      }, [boweloadData]);
      //Hàm lấy giá trị mà người dùng nhập vào trong Filter
      const onSearch = (searchText) => {
        setInput(searchText);
        // onChangeInput(searchText);
      };
      //Hàm lấy giá trị của điểm đến trong Filter
      const onSelect = (data) => {
        setSearchData((preState) => {
          let nextState = { ...preState };
          nextState.end = data;
          return nextState;
        });
      };
  
      const onChange = (data) => {
        setValue(data);
      };
      //Hàm setting thuộc tính của carousel
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
      const onSearchData = () => {
        // console.log(input);
      }
      //Func lấy điểm xuất phát từ Filter
      const onSelectStart = (item) => {
        setSearchData((preState) => {
          let nextState = { ...preState };
          nextState.start = item;
          return nextState;
        });
      }
      //Func lấy ngày từ Filter
      const getQuery = useCallback(
        (value, name) => {
          setSearchData((preState) => {
            let nextState = { ...preState };
            nextState.date = value.format("DD-MM-YYYY");
            return nextState;
          });
        },
        [params]
      );
      return (
        <div
          className={classNames({
            [className]: true,
          })}
          style={{ background: "#fff" }}
        >
          <Row>
            <Col sm={24} xs={24} md={24} lg={24}>
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    possition: "absolute",
                    top: "0",
                    width: "100%",
                  }}
                >
                  <Slider {...settings} className="sidebar-slider normal-slider">
                    <div style={{ width: "100%" }}>
                      <a style={{ width: "100%", height: "100%" }}>
                        <img className="slider" src={bannerhv} alt="banner" />
                      </a>
                    </div>
                  </Slider>
                </div>
              </div>
            </Col>
          </Row>
          <div className="header_search">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  flex: "1",
                  maxWidth: "1200px",
                  position: "relative",
                  background: "#fff",
                }}
              >
                <div className="search">
                  <div style={{ padding: "16px" }}>
                    <Row>
                      <Col
                        className="tree_select"
                        sm={24}
                        lg={24}
                        xs={24}
                        md={24}
                      >
                        <Row className="padding_input" gutter={16}>
                          <Col sm={6} lg={6} xs={24} md={6}>
                            <div
                              style={{ fontWeight: "bold", marginBottom: "8px" }}
                            >
                              Điểm xuất phát
                            </div>
                            <TreeSelect
                              // treeData={dataPlace}
                              showSearch
                              style={{ width: "100%" }}
                              showArrow={false}
                              // onSearch={(e) => onTreeSearch(e)}
                              onSearch={onSearchPhone}
                              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                              placeholder="Chọn điểm xuất phát"
                              allowClear
                              multiple={false}
                              switcherIcon={<RightOutlined />}
                              treeDefaultExpandAll={false}
                              onChange={(item) => onSelectStart(item)}
                            >
                              {treeInputPlace.length > 0
                                ? _.map(treeInputPlace, (item, index) => {
                                    return (
                                      <TreeNode
                                        key={item.id + index}
                                        value={item.name}
                                        title={
                                          <>
                                            <p
                                              style={{
                                                color: "#000",
                                                fontWeight: "600",
                                                margin: "0px",
                                                padding: "0px",
                                                width: "200px",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                              }}
                                            >
                                              {item.name}
                                            </p>
                                            <p
                                              style={{
                                                color: "#000",
                                                width: "200px",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                margin: "0px",
                                                padding: "0px",
                                              }}
                                            >
                                              {item.description}
                                            </p>
                                          </>
                                        }
                                      />
                                    );
                                  })
                                : _.map(dataPlace, (item, index) => {
                                    return (
                                      <TreeNode
                                        key={item.id * 10}
                                        title={item.name}
                                      >
                                        {_.map(
                                          item.children,
                                          (itemChild, key) => {
                                            return (
                                              <TreeNode
                                                value={itemChild.name}
                                                title={
                                                  <>
                                                    <p
                                                      style={{
                                                        color: "#000",
                                                        fontWeight: "500",
                                                        margin: "0px",
                                                        padding: "0px",
                                                      }}
                                                    >
                                                      {itemChild.name}
                                                    </p>
                                                    <p
                                                      style={{
                                                        color: "#000",
                                                        width: "200px",
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                        margin: "0px",
                                                        padding: "0px",
                                                      }}
                                                    >
                                                      {itemChild.address}
                                                    </p>
                                                  </>
                                                }
                                              />
                                            );
                                          }
                                        )}
                                      </TreeNode>
                                    );
                                  })}
                            </TreeSelect>
                          </Col>
                          <Col sm={24} lg={6} xs={24} md={6}>
                          <div
                              style={{ fontWeight: "bold", marginBottom: "8px" }}
                            >
                              Điểm đến
                            </div>
                            <AutoComplete
                              // options={inputPlace}
                              onSelect={onSelect}
                              onSearch={onSearch}
                              allowClear={true}
                              placeholder="Chọn điểm đến"
                            >
                              {inputPlace.map((e, key) => (
                                <Option key={key} value={e.name}>
                                  <b>{e.name}</b>
                                  <br />
                                  <small>{e.description}</small>
                                </Option>
                              ))}
                            </AutoComplete>
                          </Col>
                          <Col sm={24} lg={6} xs={24} md={6}>
                          <div
                              style={{ fontWeight: "bold", marginBottom: "8px" }}
                            >
                              Ngày đi
                            </div>
                            <DatePicker
                              size="large"
                              value={day}
                              placeholder={["Ngày"]}
                              onChange={(day) => {
                                if (day) {
                                  getQuery(day, "day");
                                } else {
                                  let day = moment();
                                  getQuery(day, "day");
                                }
                              }}
                            />
                          </Col>
                          <Col sm={24} lg={6} xs={24} md={6}>
                            <div
                              style={{ marginBottom: "30px" }}
                            />
                            <div
                              className="d-flex justify-content-center align-items-center noselect"
                              style={{
                                width: "100%",
                                height: "56px",
                                backgroundColor: "#FFDD2B",
                                borderRadius: "4px",
                                cursor: "pointer"
                              }}
                              onClick={() => onSearchData()}
                            >
                              <span style={{ fontSize: "24px" }}>Tìm vé</span>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  );
  
  export default styled(List)`
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
      .padding_input {
        margin-left: -8px;
        margin-right: -8px;
        margin-top: -4px;
        margin-bottom: 4px;
      }
      .tree_select {
        padding-left: 8px;
        padding-right: 8px;
        padding-top: 4px;
        padding-bottom: 4px;
      }
      .ant-picker-input {
        padding: 2px;
      }
      .ant-picker-large {
        padding: 14px;
      }
      span.ant-select-selection-placeholder {
        margin-top; 12px!important;
      }
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
      input#rc_select_0, input#rc_select_6 {
        height: 55px;
      }
      .header_search {
        position: relative; 
        top: -63px; 
        width: 100%;
      }
      @media only screen and (max-width: 576px){
        .slider{
            height: 200px;
        }
        .header_search {
          position: relative; 
          top: 0px; 
          width: 100%;
        }
      }
    `;
  