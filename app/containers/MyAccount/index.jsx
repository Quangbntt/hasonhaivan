import React, { memo, useState, useEffect, useCallback, useRef } from "react";
import { Spin, Select, Tabs } from "antd";
import _ from "lodash";
import moment from "moment";
import styled from "styled-components";
import PropTypes from "prop-types";
import * as style from "components/Variables";
import classNames from "classnames";
import { Ui } from "utils/Ui";
import ServiceBase from "utils/ServiceBase";
import Pagination from "components/Paginate/index";

// import List from "./List";
import Axios from "axios";

let time = null;
const { TabPane } = Tabs;

const Home = memo(({}) => {
  const [loading, setLoading] = useState(false);

  const [totalLength, setTotalLength] = useState(0);
  //   const [data, setData] = useState([]);
  const [params, setParams] = useState({
    page: 1,
    limit: 100,
  });
  //   const boweloadData = useCallback(async () => {
  //     // Api lấy danh sách các tuyến
  //     const urlHome = "https://cms.hasonhaivan.com/api/homeWayRoads";
  //     Axios.get(urlHome).then((repos) => {
  //       const response = repos.data;
  //       setTotalLength(_.get(response, "value.total"));
  //       setData(response);
  //     });

  //   }, [params]);
  //   useEffect(() => {
  //     clearTimeout(time);
  //     time = setTimeout(boweloadData, 800);
  //   }, [boweloadData]);
  return (
    <>
      <Tabs defaultActiveKey="1" tabPosition="left" style={{ height: 220 }}>
        <TabPane tab="Công Test" key="0">
          Content of tab 0
        </TabPane>
        <TabPane tab="Thông tin cá nhân" key="1">
          Content of tab 1
        </TabPane>
        <TabPane tab="Chuyến đi của tôi" key="2">
          Content of tab 2
        </TabPane>
        <TabPane tab="Đăng xuất" key="3" disabled>
          Content of tab 3
        </TabPane>
      </Tabs>
      {/* <List
        loading={loading}
        setLoading={setLoading}
        data={data}
        setData={setData}
        params={params}
        dataPlace={dataPlace}
        setDataPlace={setDataPlace}
        setParams={setParams}
      /> */}
    </>
  );
});
export default Home;
