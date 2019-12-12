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
        <Form field={this.field}>
          <Row span="8" justify="center">


            <FormItem {...formItemLayout}
              labelAlign={labelAlign}
              label="任务id"
            >
              <Input name="id" readOnly />
            </FormItem>
            <FormItem {...formItemLayout}
              labelAlign={labelAlign}
              label="调度类型:"
            >
              <Input name="scheduleType" readOnly />
            </FormItem>
            <FormItem {...formItemLayout}
              labelAlign={labelAlign}
              label="所有人:"
            >
              <Input name="owner" readOnly />
            </FormItem>
            <FormItem {...formItemLayout}
              labelAlign={labelAlign}
              label="名称:"
            >
              <Input name="name" readOnly />
            </FormItem>
          </Row>
          <Row span="8" justify="center">
            <FormItem {...formItemLayout}
              labelAlign={labelAlign}
              label="定时表达式:"
            >
              <Input name="cronExpression" readOnly />
            </FormItem>
            <FormItem {...formItemLayout}
              labelAlign={labelAlign}
              label="关注人员:"
            >
              <Input name="focusUser" readOnly />
            </FormItem>

            <FormItem {...formItemLayout}
              labelAlign={labelAlign}
              label="任务类型:"
            >
              <Input name="runType" readOnly />
            </FormItem>
            <FormItem {...formItemLayout}
              labelAlign={labelAlign}
              label="重试次数"
            >
              <Input name="repeatRun" readOnly />
            </FormItem>
          </Row>
          <Row span="8" justify="center">
            <FormItem {...formItemLayout}
              labelAlign={labelAlign}
              label="管理员:"
            >
              <Input name="uidS" readOnly />
            </FormItem>
            <FormItem {...formItemLayout}
              labelAlign={labelAlign}
              label="自动调度:"
            >
              <Input name="auto" readOnly />
            </FormItem>
            <FormItem {...formItemLayout}
              labelAlign={labelAlign}
              label="重试间隔:"
            >
              <Input name="configs.roll.back.wait.time" readOnly />
            </FormItem>
            <FormItem {...formItemLayout}
              labelAlign={labelAlign}
              label="重复执行:"
            >
              <Input name="repeatRun" readOnly />
            </FormItem>
          </Row>

          <Row span="8" justify="center">
            <FormItem {...formItemLayout}
              labelAlign={labelAlign}
              label="任务优先级:"
            >
              <Input name="configs.run.priority.level" readOnly />
            </FormItem>
            <FormItem {...formItemLayout}
              labelAlign={labelAlign}
              label="重试间隔:"
            >
              <Input value=""roll.back.wait.time" readOnly />
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
        </Form>
      </div >
    );
  }
}
