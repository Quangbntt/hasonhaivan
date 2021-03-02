import React, { memo, useState, useEffect, useCallback } from "react";
import {
  Spin,
  Drawer,
  Button,
  Form,
  Input,
  Select,
  Modal,
  Row,
  Col,
  TimePicker,
  Switch,
  InputNumber,
} from "antd";
import _ from "lodash";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import moment from "moment";
import classNames from "classnames";
import { Ui } from "utils/Ui";
import ServiceBase from "utils/ServiceBase";
import styled from "styled-components";
import ReCAPTCHA from "react-google-recaptcha";
import ReactCodeInput from "react-verification-code-input";
import Globals from "utils/globals";
import { $Cookies } from "utils/cookies";
const { Option } = Select;
const { TextArea } = Input;
const format = "HH:mm";
let time = null;
const ModalVerify = memo(
  ({
    setRow,
    row,
    className,
    show,
    setShow,
    params,
    setParams,
    dataUser,
    setDataUser,
    checkOut,
    setCheckout,
  }) => {
    const [form] = Form.useForm();
    const [objForm, setObjForm] = useState({});
    const [status, setStatus] = useState(true);

    const handleCancel = () => {
      form.resetFields();
      setShow((preState) => {
        let nextState = { ...preState };
        nextState.isShow = false;
        nextState.isLogin = false;
        return nextState;
      });
    };
    const handleVerify = async (code) => {
      let newParams = {
        otp: code,
        phone: params.phone,
      };
      let newUserParams = {};
      let url = "";
      let urlUser = "";
      url = "https://apiweb.hasonhaivan.com/api/verify-otp";
      urlUser = "https://apiweb.hasonhaivan.com/api/user";
      let result = await ServiceBase.requestJson({
        url: url,
        method: "POST",
        data: newParams,
      });
      Globals.setSession({
        public: {
          hasonhaivan: JSON.stringify(_.get(result, "value")),
        },
        private: {
          token: _.get(result, "value.access_token"),
        },
      });
      $Cookies.set("ERP_REPORT", JSON.stringify(_.get(result, "value")));
      $Cookies.set("TOKEN", _.get(result, "value.access_token"));
      let resultUser = await ServiceBase.requestJson({
        url: urlUser,
        method: "GET",
        data: newUserParams,
      });
      if (result.hasErrors || resultUser.hasErrors) {
        // Ui.showErrors(result.errors && resultUser.hasErrors);
      } else {
        setDataUser(_.get(resultUser, "value.data"));
        let message = "";
        message = "Đăng nhập thành công";
        Ui.showSuccess({ message: message });
        setDataUser(_.get(resultUser, "data"));
        setCheckout(false);
        setShow((preState) => {
          let nextState = { ...preState };
          nextState.isShow = false;
          nextState.isLogin = true;
          return nextState;
        });
      }
    };
    const onFinish = async (values) => {};
    const bowload = useCallback(async () => {
      let user = row;
      if (user) {
        setStatus(user.trangThai);
        let obj = {
          phone: user.name,
        };
        form.setFieldsValue(obj);
      }
    }, [show]);
    useEffect(() => {
      setTimeout(bowload, 0);
    }, [bowload]);
    return (
      <div
        gutter={15}
        className={classNames({
          [className]: true,
        })}
      >
        <Modal
          title="Đăng nhập"
          visible={_.get(show, "isShow")}
          onCancel={handleCancel}
          width="28%"
          destroyOnClose
          footer={[]}
        >
          <Form form={form} name="control-ref" onFinish={onFinish}>
            <Row gutter={15}>
              <Col md={24}>
                <p style={{ textAlign: "center", fontSize: "16px" }}>
                  Vui lòng nhập mã xác nhận đã được gửi tới số
                </p>
                <p style={{ textAlign: "center", fontSize: "16px" }}>
                  {params.phone}
                </p>
              </Col>
              <Col md={24} style={{ textAlign: "center" }}>
                <ReactCodeInput
                  fieldWidth="40px"
                  onComplete={(code) => handleVerify(code)}
                  loading={false}
                />
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
);
export default styled(ModalVerify)`
  .ant-input-number-input-wrap,
  input#control-ref_name {
    height: 55px !important;
  }
  .ant-form-item-control-input-content button.ant-btn {
    border-radius: 4px;
    position: absolute;
    top: 0px;
    text-decoration: none;
  }
  .ant-form-item-control-input-content:hover button.ant-btn {
    background-color: rgb(255, 221, 43);
  }
`;
