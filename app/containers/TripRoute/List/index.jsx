import React, {
  memo,
  useEffect,
  useMemo,
  Component,
  useState,
  useCallback,
  useRef,
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
  Card,
  Carousel,
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
import { RightOutlined, DownOutlined } from "@ant-design/icons";
import bannerhv from "images/bannerhv.jpg";
import Axios from "axios";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

let time = null;
const { TreeNode } = TreeSelect;
const { Option } = AutoComplete;
const List = memo(
  ({
    className,
    setParams,
    data,
    params,
    dataPlace,
    setDataPlace,
    dataSlider,
    setDataSlider,
    dataTrip,
    setDataTrip,
  }) => {
    const sliderRef = useRef();
    const routeRef = useRef();
    //React light box
    const images = dataSlider.images;
    const [state, setState] = useState({
      photoIndex: 0,
      isOpen: false,
    });

    const [inputPlace, setInputPlace] = useState([]);
    const onLoadData = () => {
      // console.log("quang vip pro");
    };
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
          <div style={{ flex: "1 1 0%", maxWidth: "1200px" }}>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                marginTop: "-32px",
                marginBottom: "0px",
              }}
            >
              {_.map(dataTrip, (item, index) => {
                return "Xe Khách " + item.from.name + " - " + item.to.city.name;
              })}
            </h1>
            <div>
              <Row style={{ margin: "-8px -8px 8px" }}>
                <Col md={24} style={{ padding: "8px" }} />
                <Col xs={24} sm={24} md={24} lg={16} style={{ padding: "8px" }}>
                  <Row style={{ margin: "-1px -1px 16px" }}>
                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={24}
                      style={{ padding: "1px" }}
                    >
                      <img
                        src={dataSlider.images[0]}
                        alt="ve-xe-khach-bac-ninh-sapa"
                        style={{
                          width: "100%",
                          height: "auto",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          setState({ isOpen: true, photoIndex: 0 })
                        }
                      />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} style={{ padding: "1px" }}>
                      <img
                        src={dataSlider.images[1]}
                        alt="ve-xe-khach-bac-ninh-sapa"
                        style={{
                          width: "100%",
                          height: "auto",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          setState({ isOpen: true, photoIndex: 1 })
                        }
                      />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} style={{ padding: "1px" }}>
                      <img
                        src={dataSlider.images[2]}
                        alt="ve-xe-khach-bac-ninh-sapa"
                        style={{
                          width: "100%",
                          height: "auto",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          setState({ isOpen: true, photoIndex: 2 })
                        }
                      />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} style={{ padding: "1px" }}>
                      <img
                        src={dataSlider.images[3]}
                        alt="ve-xe-khach-bac-ninh-sapa"
                        style={{
                          width: "100%",
                          height: "auto",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          setState({ isOpen: true, photoIndex: 3 })
                        }
                      />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} style={{ padding: "1px" }}>
                      <img
                        src={dataSlider.images[4]}
                        alt="ve-xe-khach-bac-ninh-sapa"
                        style={{
                          width: "100%",
                          height: "auto",
                          cursor: "pointer",
                        }}
                      />
                      <div
                        style={{
                          background: "rgb(0 0 0 / 51%)",
                          width: "99%",
                          height: "98%",
                          top: "0px",
                          left: "0px",
                          marginTop: "1px",
                          position: "absolute",
                          zIndex: "2",
                        }}
                      />
                      <Row
                        style={{
                          width: "99%",
                          height: "98%",
                          top: "0",
                          left: "0",
                          marginTop: "1px",
                          position: "absolute",
                          zIndex: "3",
                          cursor: "pointer",
                        }}
                        justify="space-around"
                        align="middle"
                        onClick={() =>
                          setState({ isOpen: true, photoIndex: 4 })
                        }
                      >
                        <Col style={{ color: "#fff", textAlign: "center" }}>
                          {dataSlider.images.length - 4} ảnh khác
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  {state.isOpen && (
                    <Lightbox
                      mainSrc={images[state.photoIndex]}
                      nextSrc={images[(state.photoIndex + 1) % images.length]}
                      prevSrc={
                        images[
                          (state.photoIndex + images.length - 1) % images.length
                        ]
                      }
                      onCloseRequest={() =>
                        setState((preState) => {
                          let nextState = { ...preState };
                          nextState.isOpen = false;
                          return nextState;
                        })
                      }
                      onMovePrevRequest={() =>
                        setState((preState) => {
                          let nextState = { ...preState };
                          nextState.photoIndex =
                            (state.photoIndex + images.length - 1) %
                            images.length;
                          return nextState;
                        })
                      }
                      onMoveNextRequest={() =>
                        setState((preState) => {
                          let nextState = { ...preState };
                          nextState.photoIndex =
                            (state.photoIndex + 1) % images.length;
                          return nextState;
                        })
                      }
                    />
                  )}
                  {_.map(dataTrip, (item, key) => {
                    return (
                      <Card
                        title={item.from.name + " - " + item.to.city.name}
                        style={{
                          width: "100%",
                          cursor: "pointer",
                          boxShadow: "0 4px 8px rgb(0 0 0 / 10%)",
                          marginBottom: "20px",
                        }}
                        onClick={onLoadData}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            padding: "0px",
                            fontSize: "14px",
                            lineHeight: "17px",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <b>{item.product.name}</b>
                            <span style={{ fontSize: "20px" }}>
                              &nbsp;•&nbsp;
                            </span>
                            <span>{item.total_seat_free} chỗ trống</span>
                          </div>
                          <div style={{ textAlign: "end" }}>
                            <b style={{ color: "rgb(255, 194, 14)" }}>
                              {
                                (item.price_range.from = item.price_range.to
                                  ? item.price_range.from.toLocaleString() + "đ"
                                  : item.price_range.from.toLocaleString() +
                                    " - " +
                                    item.price_range.to.toLocaleString() +
                                    "đ")
                              }
                            </b>
                          </div>
                        </div>
                        <Row justify="center">
                          <Col justify="center">
                            <div style={{ height: "5px" }} />
                            <div
                              style={{
                                width: "6px",
                                height: "6px",
                                borderRadius: "3px",
                                backgroundColor: "rgb(88, 89, 91)",
                                marginTop: "1px",
                              }}
                            />
                            <div
                              style={{
                                width: "2px",
                                height: "35px",
                                backgroundColor: "rgb(88, 89, 91)",
                                margin: "2px",
                              }}
                            />
                            <div
                              style={{
                                width: "6px",
                                height: "6px",
                                backgroundColor: "rgb(88, 89, 91)",
                                marginTop: "1px",
                              }}
                            />
                            <div
                              style={{
                                height: "16px",
                                border: "1px dashed rgb(88, 89, 91)",
                                marginTop: "1px",
                                width: "3px",
                                marginLeft: "2px",
                              }}
                            />
                            <div
                              style={{
                                width: "6px",
                                height: "6px",
                                border: "1px solid rgb(88, 89, 91)",
                                marginTop: "1px",
                              }}
                            />
                            <div style={{ height: "5px" }} />
                          </Col>
                          <Col
                            style={{ marginLeft: "6px", marginRight: "15px" }}
                          >
                            <div
                              style={{ fontWeight: "bold", fontSize: "16px" }}
                            >
                              {item.departure_time}
                            </div>
                            <div
                              style={{ padding: "2px 0px", fontSize: "12px" }}
                            >
                              {timeConvert(item.duration)}
                            </div>
                            <div
                              style={{ fontWeight: "bold", fontSize: "16px" }}
                            >
                              {item.destination_time}
                            </div>
                            <div style={{ height: "21px" }} />
                          </Col>
                          <Col
                            style={{ marginLeft: "6px", marginRight: "15px" }}
                          >
                            <div
                              style={{ fontWeight: "bold", fontSize: "16px" }}
                            >
                              {item.from.name}
                            </div>
                            <div
                              style={{ padding: "2px 0px", fontSize: "12px" }}
                            >
                              Xe liên tỉnh
                            </div>
                            <div
                              style={{ fontWeight: "bold", fontSize: "16px" }}
                            >
                              {item.to.name}
                            </div>
                            <div style={{ height: "21px" }}>
                              {item.to.city.name} (Xe trung chuyển)
                            </div>
                          </Col>
                          <Col
                            style={{ marginLeft: "6px", marginRight: "15px" }}
                            flex="auto"
                          >
                            <Row
                              justify="end"
                              align="middle"
                              style={{ height: "100%" }}
                            >
                              <Col>
                                <DownOutlined />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card>
                    );
                  })}
                </Col>
                <Col xs={0} sm={0} md={0} lg={8} style={{ padding: "8px" }}>
                  <div
                    style={{
                      marginBottom: "16px",
                      boxShadow: "rgba(0,0,0,0.1) 0px 4px 8px",
                      borderRadius: "8px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <Carousel dots={false} ref={sliderRef}>
                      {_.map(
                        dataSlider.rating.ratings_merchant,
                        (item, key) => {
                          return (
                            <div
                              style={{ width: "100%", display: "inline-block" }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  padding: "8px 16px",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <img
                                    src="https://hasonhaivan.com/images/icons/icon_right_quote.svg"
                                    style={{
                                      width: "26px",
                                      height: "21px",
                                      transform: "rotate(180deg)",
                                    }}
                                  />
                                  <div className="text-rating">
                                    <span>{item.rating}</span>
                                  </div>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                  }}
                                >
                                  <span style={{ flex: "1 1 auto" }}>
                                    <b>{item.customer_name}</b>, {item.location}
                                  </span>
                                  <img
                                    src="https://hasonhaivan.com/images/icons/icon_right_quote.svg"
                                    style={{
                                      width: "26px",
                                      height: "21px",
                                      alignSelf: "flex-end",
                                    }}
                                  />
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "center",
                                    }}
                                    onClick={() => {
                                      sliderRef.current.prev();
                                    }}
                                  >
                                    <img
                                      src="https://hasonhaivan.com/images/icons/icon_arrow_right.png"
                                      style={{
                                        width: "32px",
                                        height: "32px",
                                        transform: "rotate(180deg)",
                                        cursor: "pointer",
                                      }}
                                    />
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "center",
                                      flex: "1 1 auto",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: "4px",
                                        background: "rgb(255, 221, 43)",
                                        padding: "2px 7px",
                                      }}
                                    >
                                      <b
                                        style={{
                                          lineHeight: "19px",
                                          fontSize: "16px",
                                        }}
                                      >
                                        {
                                          dataSlider.rating
                                            .avg_score_ratings_merchant
                                        }
                                      </b>
                                      <span style={{ lineHeight: "14px" }}>
                                        /5
                                      </span>
                                    </div>
                                    <div
                                      style={{
                                        lineHeight: "14px",
                                        marginLeft: "7px",
                                      }}
                                    >
                                      Dựa trên đánh giá của
                                      <br />
                                      {dataSlider.rating.number_reviews} khách
                                      hàng
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "center",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      sliderRef.current.next();
                                    }}
                                  >
                                    <img
                                      src="https://hasonhaivan.com/images/icons/icon_arrow_right.png"
                                      style={{ width: "32px", height: "32px" }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </Carousel>
                  </div>
                  <Row
                    style={{
                      background: "#fff",
                      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 8px",
                      borderRadius: "8px",
                      padding: "8px 0px",
                      marginBottom: "16px",
                    }}
                  >
                    {_.map(dataSlider.services, (item, key) => {
                      return (
                        <Col
                          xs={4}
                          sm={4}
                          md={4}
                          lg={4}
                          justify="space-around"
                          align="middle"
                        >
                          <img
                            src={item.image}
                            style={{
                              width: "32px",
                              height: "32px",
                              marginBottom: "4px",
                            }}
                          />
                          <div
                            style={{
                              textAlign: "center",
                              fontSize: "12px",
                              lineHeight: "14px",
                            }}
                          >
                            {item.name}{" "}
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                  <div style={{ height: "500px" }}>
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        margin: "0px",
                        padding: "0px",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          left: "0px",
                          top: "0px",
                          margin: "0px",
                          padding: "0px",
                          position: "absolute",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: "100%",
                            position: "absolute",
                            top: "0px",
                            left: "0px",
                            backgroundColor: "rgb(229, 227, 223)",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              zIndex: "0",
                              left: "0px",
                              top: "0px",
                              height: "100%",
                              width: "100%",
                              padding: "0px",
                              borderWidth: "0px",
                              margin: "0px",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <Carousel dots={false} ref={routeRef}>
                    {_.map(dataSlider.statistic_wayroad, (item, key) => {
                      return (
                        <div style={{ width: "100%", display: "inline-block" }}>
                          <div
                            style={{
                              padding: "11px 16px 9px",
                              lineHeight: "19px",
                              fontSize: "16px",
                            }}
                          >
                            Thống kê tuyến <b>{item.name}</b>
                          </div>
                          <div
                            style={{
                              width: "100%",
                              height: "1px",
                              backgroundColor: "rgb(237, 238, 238)",
                            }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <img
                                src="https://hasonhaivan.com/images/icons/icon_arrow_right.png"
                                style={{
                                  width: "26px",
                                  height: "21px",
                                  transform: "rotate(180deg)",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  routeRef.current.prev();
                                }}
                              />
                            </div>
                            <div
                              style={{
                                padding: "8px",
                                fontSize: "12px",
                                flex: "1 1 auto",
                              }}
                            >
                              <Row style={{ lineHeight: "150%" }}>
                                <div
                                  style={{
                                    width: "110px",
                                    marginRight: "24px",
                                  }}
                                >
                                  Chiều dài tuyến
                                </div>
                                <div>{item.distance}km</div>
                              </Row>
                              <Row style={{ lineHeight: "150%" }}>
                                <div
                                  style={{
                                    width: "110px",
                                    marginRight: "24px",
                                  }}
                                >
                                  Thời gian di chuyển
                                </div>
                                <div>{timeConvert(item.runtime)}</div>
                              </Row>
                              <Row style={{ lineHeight: "150%" }}>
                                <div
                                  style={{
                                    width: "110px",
                                    marginRight: "24px",
                                  }}
                                >
                                  Giá vé trung bình
                                </div>
                                <div>{item.price_avg}</div>
                              </Row>
                              <Row style={{ lineHeight: "150%" }}>
                                <div
                                  style={{
                                    width: "110px",
                                    marginRight: "24px",
                                  }}
                                >
                                  Số chuyến / ngày
                                </div>
                                <div>{item.trips_per_day} chuyến</div>
                              </Row>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <img
                                src="https://hasonhaivan.com/images/icons/icon_arrow_right.png"
                                style={{
                                  width: "26px",
                                  height: "21px",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  routeRef.current.next();
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </Carousel>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default styled(List)`
    .ant-card-head {
        min-height: 40px;
        border-bottom: 2px solid #e5e5e5;
        height: 40px;
    }
    .ant-card-head-title {
        padding: 0px;
        margin-top: 8px;
    }
    .text-rating {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      height: 64px;
      color: rgba(88, 89, 91, 0.6);
      line-height: 16px;
      padding: 0px 30px;
    }
    .ant-card-body {
        padding: 8px 15px;
    }
    .ant-card-head {
        padding-left: 15px;
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
  `;
