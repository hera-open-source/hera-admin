/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Input, Button, Checkbox, Grid, Message, Form, Tab } from '@alifd/next';

import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/foundation-symbol';

import './Login.scss';


const { Row, Col } = Grid;

const FormItem = Form.Item;

@withRouter
class UserLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: {
        username: '',
        password: '',
        checkbox: false,
      },
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };



  handleReset = (e) => {

  }

  handleRegister = (values) => {

  }

  handleLogin = (values) => {

    console.log('submit');
    console.log(values);
    // this.refs.form.validateAll((errors, values) => {
    //   if (errors) {
    //     console.log('errors', errors);
    //     return;
    //   }
    //   console.log(values);
    //   Message.success('登录成功');
    //   this.props.history.push('/');
    // });
    window.location.href = '/';
  };


  render() {
    return (
      <div className="wrapper">
        {/* <span align="center">赫拉任务调度系统</span> */}
        <div className="content">
          <Tab className="tab" >
            <Tab.Item title="登录" key="1">
              <Form>
                <FormItem label="用户名:">
                  <Input name="username" placeholder="请输入登录名" />
                </FormItem>
                <FormItem label="密码:">
                  <Input htmlType="password" name="pasd" placeholder="请输入密码" />
                </FormItem>
                <FormItem >
                  <Form.Submit onClick={this.handleLogin}>登录</Form.Submit>
                </FormItem>
              </Form>
            </Tab.Item>
            <Tab.Item title="注册" key="2">
              <Form>
                <FormItem label="邮箱">
                  <Input htmlType="username" name="basePass" placeholder="请输入邮箱" />
                </FormItem>
                <FormItem label="密码:">
                  <Input htmlType="password" name="basePass" placeholder="请输入密码" />
                </FormItem>
                <FormItem label="确认密码:">
                  <Input htmlType="username" name="basePass" placeholder="请确认密码" />
                </FormItem>
                <FormItem label="手机:">
                  <Input htmlType="password" name="basePass" placeholder="请输入手机号" />
                </FormItem>
                <FormItem label="工号:">
                  <Input htmlType="username" name="basePass" placeholder="请输入工号" />
                </FormItem>
                <FormItem label="所在部门:">
                  <Input htmlType="password" name="basePass" placeholder="请输入部门" />
                </FormItem>
                <FormItem label=" ">
                  <Form.Submit onClick={this.handleReset}>重置</Form.Submit>
                  <Form.Submit onClick={this.handleRegister}>注册</Form.Submit>
                </FormItem>
              </Form>
            </Tab.Item>
          </Tab>
        </div>
      </div>

    );
  }
}

// const formItemLayout = {
//   labelCol: {
//     fixedSpan: 10
//   },
//   wrapperCol: {
//     span: 14
//   }
// };


export default UserLogin;
