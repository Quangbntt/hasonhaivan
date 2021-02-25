import React, { memo, useState, useEffect, useCallback } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
  Polyline,
  Polygon,
} from "react-google-maps";
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

const Home = memo(({progress, setProgress}) => {
  const [loading, setLoading] = useState(false);
  const [row, setRow] = useState({
    data: [],
    arrKey: [],
    arrKeyOld: [],
    dataOld: [],
  });
  const [totalLength, setTotalLength] = useState(0);
  const [data, setData] = useState([]);
  const [dataPlace, setDataPlace] = useState([]);
  const [inputPlace, setInputPlace] = useState([]);
  const [params, setParams] = useState({
    input: "",
    api_token: "6tihDYHMeDKem5nvi2SnZ04o4cXRloZsyoMkJ6RsltPy5irdkCpR0QTyCk2v",
    page: 1,
    limit: 100,
  });
  const boweloadData = useCallback(async () => {
    // //api điểm đến
    if (params.input === "") {
      setInputPlace([]);
    } else {
      const urlPlace =
        "https://place.havaz.vn/api/v1/places?input=" +
        params.input +
        "&api_token=6tihDYHMeDKem5nvi2SnZ04o4cXRloZsyoMkJ6RsltPy5irdkCpR0QTyCk2v";
      Axios.get(urlPlace).then((repos) => {
        const result = repos.data.data;
        setInputPlace(result);
      });
    }

    //api điểm bắt đầu
    const url = "https://apiweb.hasonhaivan.com/api/places";
    Axios.get(url).then((repos) => {
      const allRepos = repos.data;
      setDataPlace(allRepos);
      setProgress(100);
    });
  }, [params]);
  useEffect(() => {
    clearTimeout(time);
    time = setTimeout(boweloadData, 800);
  }, [boweloadData]);
  return (
    <>
      <List
        // inputPlace={inputPlace}
        // setInputPlace={setInputPlace}
        loading={loading}
        setLoading={setLoading}
        params={params}
        dataPlace={dataPlace}
        setDataPlace={setDataPlace}
        setParams={setParams}
      />
    </>
  );
});
export default Home;
