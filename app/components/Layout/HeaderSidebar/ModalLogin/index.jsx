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
let time = null;
const ModalCreate = memo(({ visible, setVisible, setRow, row, className, show, setShow, params, setParams }) => {
  const recaptchaRef = React.createRef();
  const TEST_SITE_KEY = "6Lc1C90ZAAAAAIKVZHNXPhQxYWkUdP5-fnqCa0Vn";
  //0387997547
  //123456
  const [form] = Form.useForm();
  const [objForm, setObjForm] = useState({});
  const [status, setStatus] = useState(true);
  const [captcha, setCaptcha] = useState({});
  
  const handleCancel = () => {
    form.resetFields();
    setVisible((preState) => {
      let nextState = { ...preState };
      nextState.isShow = false;
      return nextState;
    });
  };
  const onFinish = async (values) => {
    params.phone = values.name;
    params.captcha = captcha;
    let url = "";
    url = "https://apiweb.hasonhaivan.com/api/get-otp";
    let result = await ServiceBase.requestJson({
      url: url,
      method: "GET",
      data: params,
    });
    if (result.hasErrors) {
      Ui.showErrors(result.errors);
    } else {
      setVisible((preState) => {
        let nextState = { ...preState };
        nextState.isShow = false;
        return nextState;
      });
      setShow((preState) => {
        let nextState = { ...preState };
        nextState.isShow = true;
        nextState.isLogin = false;
        return nextState;
      });
    }
  };
  const bowload = useCallback(async () => {
    let user = row;
    if (user) {
      setStatus(user.trangThai);
      let obj = {
        phone: user.name,
      };
      form.setFieldsValue(obj);
    }
  }, [visible]);
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
        visible={_.get(visible, "isShow")}
        onCancel={handleCancel}
        width="28%"
        destroyOnClose
        footer={[]}
      >
        <Form form={form} name="control-ref" onFinish={onFinish}>
          <Row gutter={15}>
            <Col md={24}>
              <p style={{ textAlign: "center", fontSize: "16px" }}>
                Vui lòng nhập số điện thoại để đăng nhập
              </p>
            </Col>
            <Col md={24}>
              <Form.Item
                name="name"
                style={{ height: "55px" }}
                rules={[{ required: true, message: "Vui lòng nhập dữ liệu" }]}
              >
                <Input
                  style={{ height: "55px" }}
                  type="number"
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <ReCAPTCHA
              style={{ display: "inline-block" }}
              theme="light"
              sitekey={TEST_SITE_KEY}
              size="normal"
              render="explicit"
              onChange={(value) => {
                setCaptcha(value);
              }}
            />
            
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                backgroundColor: "rgb(255, 221, 43)",
                height: "56px",
                color: "rgb(88, 89, 91)",
                fontSize: "24px",
              }}
            >
              Tiếp tục
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});
export default styled(ModalCreate)`
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
