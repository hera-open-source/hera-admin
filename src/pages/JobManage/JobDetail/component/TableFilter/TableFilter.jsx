import { Button, DatePicker, Input, Form, Grid, Select } from '@alifd/next';
import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';

const { Row, Col } = Grid;


const FormItem = Form.Item;
const Option = Select.Option;
// @withRouter
// @connect(state => ({ user: state.user }))
export default class TableFilter extends Component {


  filter = () => {
        // console.log('Filter');
    this.props.onFilter(this.state.value);
  };

  formChange = (value) => {
    console.log(value);
        // this.props.onFilter(value);
    this.setState({
      value
    }, () => {
      this.filter();
    });
  };

  render() {
    return (
            <Form onChange={this.formChange}>
                <div style={{ display: 'flex' }}>
                    <Form.Item label="任务名称" name="jobName" labelCol={{ fixedSpan: 4 }}>
                        <Input name="jobName" />
                    </Form.Item>
                    <FormItem label="状态:" labelCol={{ fixedSpan: 4 }}>
                        <Select dataSource={statusArray} name="status" />
                    </FormItem>
                    <FormItem
                      label="执行时间:"
                      required
                      labelCol={{ fixedSpan: 4 }}>
                        <Row>
                            <FormItem style={{ marginRight: 10, marginBottom: 0 }}><DatePicker name="startDate" /></FormItem>
                            <FormItem style={{ marginBottom: 0 }}><DatePicker name="endDate" /></FormItem>
                        </Row>
                    </FormItem>

                    <Form.Reset labelCol={{ fixedSpan: 4 }} type="normal" onClick={this.reset}>重置</Form.Reset>
                </div>

            </Form>
    );
  }

}

const statusArray = [
  {
    value: 1,
    label: '失败'
  },
  {
    value: 7,
    label: '成功'
  },
  {
    value: 3,
    label: '运行中'
  },
  {
    value: 4,
    label: '等待'
  }
];
