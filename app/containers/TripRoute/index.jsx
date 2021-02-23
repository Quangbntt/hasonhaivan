import React, { memo, useState, useEffect, useCallback } from "react";
import { Spin, Select } from "antd";
import _ from "lodash";
import moment from "moment";
import { Grid, Paper, Card, CardHeader, CardContent } from "@material-ui/core";
import styled from "styled-components";
import PropTypes from "prop-types";
import * as style from "components/Variables";
import classNames from "classnames";
import { Ui } from "utils/Ui";
import ServiceBase from "utils/ServiceBase";
import Pagination from "components/Paginate/index";
import List from "./List";
import Axios from "axios";

let time = null;

const Home = memo(({}) => {
  const [loading, setLoading] = useState(false);
  const [row, setRow] = useState({
    data: [],
    arrKey: [],
    arrKeyOld: [],
    dataOld: [],
  });
  const [totalLength, setTotalLength] = useState(0);
  const [data, setData] = useState([]);
  const [dataSlider, setDataSlider] = useState([]);
  const [dataPlace, setDataPlace] = useState([]);
  const [inputPlace, setInputPlace] = useState([]);
  const [params, setParams] = useState({
    input: "",
    api_token: "6tihDYHMeDKem5nvi2SnZ04o4cXRloZsyoMkJ6RsltPy5irdkCpR0QTyCk2v",
    page: 1,
    limit: 100,
  });
  const boweloadData = useCallback(async () => {
    setLoading(true);
    // //Api lấy danh sách các tuyến
    const urlHome = "https://cms.hasonhaivan.com/api/homeWayRoads";
    Axios.get(urlHome).then((repos) => {
      const response = repos.data;
      setTotalLength(_.get(response, "value.total"));
      setData(response);
      setLoading(false);
    });

    //Api lấy ảnh cho slide
    const urlSlider =
      "https://cms.hasonhaivan.com/api/intercity-listing?wayroad_id=7";
    Axios.get(urlSlider).then((repos) => {
      const resSlider = repos.data.data;
      setDataSlider(resSlider);
      setLoading(false);
    });

    //api điểm bắt đầu
    const url = "https://apiweb.hasonhaivan.com/api/places";
    Axios.get(url).then((repos) => {
      const allRepos = repos.data;
      setDataPlace(allRepos);
      setLoading(false);
    });
  }, [params]);
  useEffect(() => {
    clearTimeout(time);
    time = setTimeout(boweloadData, 800);
  }, [boweloadData]);
  return (
    <>
        {
          dataSlider.images && (
            <List
              loading={loading}
              setLoading={setLoading}
              data={data}
              setData={setData}
              params={params}
              dataPlace={dataPlace}
              setDataPlace={setDataPlace}
              setParams={setParams}
              dataSlider={dataSlider}
              setDataSlider={setDataSlider}
          />
          )
        }
    </>
  );
});
export default Home;
