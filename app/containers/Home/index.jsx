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
  const [dataPlace, setDataPlace] = useState([]);
  const [inputPlace, setInputPlace] = useState([]);
  const [params, setParams] = useState({
    input: undefined,
    api_token: '6tihDYHMeDKem5nvi2SnZ04o4cXRloZsyoMkJ6RsltPy5irdkCpR0QTyCk2v',
    page: 1,
    limit: 100,
  });
  const boweloadData = useCallback(async () => {
    const [error, setError] = useState(null);
    const url = "https://apiweb.hasonhaivan.com/api/places";
    useEffect(() => {
      Axios.get(url).then((repos) => {
        const allRepos = repos.data;
        setDataPlace(allRepos);
      });
    }, [params]);
  if (error) {
    return Ui.showError(error.message);
  } else {
    // console.log(dataPlace);
  }
  });
  boweloadData();

  const boweloadPlace = useCallback(async () => {
    const [error, setError] = useState(null);
    const url = "https://place.havaz.vn/api/v1/places?input="+params.input+"&api_token=6tihDYHMeDKem5nvi2SnZ04o4cXRloZsyoMkJ6RsltPy5irdkCpR0QTyCk2v";
    useEffect(() => {
      Axios.get(url).then((repos) => {
        const allRepos = repos.data.data;
        setInputPlace(allRepos);
      });
    }, [params]);
  if (error) {
    return Ui.showError(error.message);
  } else {
    // console.log(dataPlace);
  }
  });
  boweloadPlace();

  const boweload = useCallback(async () => {
    let newParams = {
      // page: params.page,
      // limit: params.limit,
    };
    setLoading(true);
    let result = await ServiceBase.requestJson({
      url: "/homeWayRoads",
      method: "GET",
      data: newParams,
    });
    if (result.hasErrors) {
      Ui.showErrors(result.errors);
      setLoading(false);
    } else {
      setLoading(false);
      setTotalLength(_.get(result, "value.total"));
      let data = _.get(result, "value");
      setData(data);
    }
  }, [params]);
  useEffect(() => {
    clearTimeout(time);
    time = setTimeout(boweload, 800);
  }, [boweload]);
  return (
    <>
        <List 
            inputPlace={inputPlace}
            setInputPlace={setInputPlace}
            loading={loading}
            setLoading={setLoading}
            data={data}
            setData={setData}
            params={params}
            dataPlace={dataPlace}
            setDataPlace={setDataPlace}
            setParams={setParams}
        />
    </>
  );
});
export default Home;
