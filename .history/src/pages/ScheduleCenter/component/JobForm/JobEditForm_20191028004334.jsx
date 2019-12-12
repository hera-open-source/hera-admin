import React, { Component } from 'react';
import { Tree, Button, Tab, Icon, Dialog, Input, Form, Grid, Balloon, Field } from '@alifd/next';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Link, withRouter } from 'react-router-dom';

const FormItem = Form.Item;
const { Row, Col } = Grid;

const style = {
  padding: '2px',
  background: '#F7F8FA',
  margin: '2px',
  display: 'flex',
};
const formItemLayout = {
  labelCol: { fixedSpan: 4 },
};

export default class JobEditForm extends Component {
  field = new Field(this);
  constructor(props) {
    super(props);
    this.state = {
      labelAlign: 'left',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.field.setValues(nextProps.jobForm);
  }

  render() {
    const { labelAlign } = this.state;
    const { jobForm } = this.props;
    console.log(jobForm);
    const init = this.field.init(jobForm);
    console.log(init.id);

    return (
      <div >
        <Row span="8" justify="center">
        
          <FormItem {...formItemLayout}
            labelAlign={labelAlign}
            label="任务id"
          >
            <Input value="" readOnly />
          </FormItem>
          <FormItem {...formItemLayout}
            labelAlign={labelAlign}
            label="调度类型:"
          >
            <Input value="dd" readOnly />
          </FormItem>
          <FormItem {...formItemLayout}
            labelAlign={labelAlign}
            label="所有人:"
          >
            <Input value="dd" readOnly />
          </FormItem>
          <FormItem {...formItemLayout}
            labelAlign={labelAlign}
            label="名称:"
          >
            <Input value="dd" readOnly />
          </FormItem>
        </Row>
        <Row span="8" justify="center">

          <FormItem {...formItemLayout}
            labelAlign={labelAlign}
            label="依赖任务:"
          >
            <Input value="dd" readOnly />
          </FormItem>
          <FormItem {...formItemLayout}
            labelAlign={labelAlign}
            label="关注人员:"
          >
            <Input value="dd" readOnly />
          </FormItem>
          <FormItem {...formItemLayout}
            labelAlign={labelAlign}
            label="任务类型:"
          >
            <Input value="dd" readOnly />
          </FormItem>
          <FormItem {...formItemLayout}
            labelAlign={labelAlign}
            label="依赖周期:"
          >
            <Input value="dd" readOnly />
          </FormItem>
        </Row>
        <Row span="8" justify="center">
          <FormItem {...formItemLayout}
            labelAlign={labelAlign}
            label="管理员:"
          >
            <Input value="dd" readOnly />
          </FormItem>
          <FormItem {...formItemLayout}
            labelAlign={labelAlign}
            label="自动调度:"
          >
            <Input value="dd" readOnly />
          </FormItem>
          <FormItem {...formItemLayout}
            labelAlign={labelAlign}
            label="重试次数:"
          >
            <Input value="dd" readOnly />
          </FormItem>
          <FormItem {...formItemLayout}
            labelAlign={labelAlign}
            label="重复执行:"
          >
            <Input value="dd" readOnly />
          </FormItem>
        </Row>

        <Row span="8" justify="center">
          <FormItem {...formItemLayout}
            labelAlign={labelAlign}
            label="任务优先级:"
          >
            <Input value="dd" readOnly />
          </FormItem>
          <FormItem {...formItemLayout}
            labelAlign={labelAlign}
            label="重试间隔:"
          >
            <Input value="dd" readOnly />
          </FormItem>
          <FormItem {...formItemLayout}
            labelAlign={labelAlign}
            label="机器组:"
          >
            <Input value="dd" readOnly />
          </FormItem>
          <FormItem {...formItemLayout}
            labelAlign={labelAlign}
            label="描述:"
          >
            <Input value="dd" readOnly />
          </FormItem>
        </Row>
        <Row span="8" justify="center">

          <FormItem {...formItemLayout}
            labelAlign={labelAlign}
            label="预计时长:"
          >
            <Input value="dd" readOnly />
          </FormItem>
          <FormItem {...formItemLayout}
            labelAlign={labelAlign}
            label="区域:"
          >
            <Input value="dd" readOnly />
          </FormItem>
          <FormItem {...formItemLayout}
            labelAlign={labelAlign}
            label="报警级别:"
          >
            <Input value="dd" readOnly />
          </FormItem>
        </Row>
      </div >
    );
  }
}
