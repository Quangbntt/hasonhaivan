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
const { Option } = Select;
const { TextArea } = Input;
const format = "HH:mm";
let time = null;
const ModalCreate = memo(({ visible, setVisible, setRow, row, className }) => {
  const recaptchaRef = React.createRef();
  const TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
  const [form] = Form.useForm();
  const [objForm, setObjForm] = useState({});
  const [status, setStatus] = useState(true);
  const handleOk = () => {
    setVisible((preState) => {
      let nextState = { ...preState };
      nextState.isShow = false;
      return nextState;
    });
  };
  const handleCancel = () => {
    form.resetFields();
    setVisible((preState) => {
      let nextState = { ...preState };
      nextState.isShow = false;
      return nextState;
    });
  };
  const create = _.get(visible, "create", false);
  function onChange(value) {
    console.log("Captcha value:", value);
  }

  const onFinish = async (values) => {
    let params = {
      userName: values.userName,
      password: values.password,
      groupid: values.groupid,
      name: values.name,
      address: values.address,
      email: values.email,
      phone: values.phone,
      status: status,
    };
    let url = "";
    if (create) {
      url = "/catruc/taomoi";
    } else {
      url = "/catruc/capnhat";
    }
    let result = await ServiceBase.requestJson({
      url: url,
      method: "POST",
      data: params,
    });
    if (result.hasErrors) {
      Ui.showErrors(result.errors);
    } else {
      let message = "";
      if (create) {
        message = "Tạo Mới Ca Thành Công";
      } else {
        message = "Sửa Mới Ca Thành Công";
      }
      Ui.showSuccess({ message: message });
      setVisible((preState) => {
        let nextState = { ...preState };
        nextState.isShow = false;
        return nextState;
      });
    }
  };
  const bowload = useCallback(async () => {
    let user = row;
    if (user) {
      setStatus(user.trangThai);
      let obj = {
        username: user.username,
        password: user.password,
        groupid: user.groupid,
        name: user.name,
        address: user.address,
        email: user.email,
        phone: user.phone,
        status: user.status,
      };
      form.setFieldsValue(obj);
    }
  }, [visible]);
  useEffect(() => {
    setTimeout(bowload, 0);
  }, [bowload]);
  const onStatus = (values) => {
    setStatus(values);
  };
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
                <InputNumber style={{ height: "55px" }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
          <ReCAPTCHA
            style={{ display: "inline-block" }}
            theme="light"
            sitekey={TEST_SITE_KEY}
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
