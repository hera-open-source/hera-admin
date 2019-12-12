import React, { Component } from 'react';
import { Tree, Button, Tab, Icon, Dialog, Input, Form, Grid, Balloon, Field } from '@alifd/next';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Link, withRouter } from 'react-router-dom';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/sql/sql';
import 'codemirror/addon/hint/sql-hint.js';
import 'codemirror/theme/ambiance.css';

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
      options: {
        lineNumbers: true, // 显示行号
        mode: { name: 'text/x-mysql' }, // 定义mode
        extraKeys: { Ctrl: 'autocomplete' }, // 自动提示配置
        theme: 'ambiance', // 选中的theme
      },
      codeMirrorInstance: require('codemirror'),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.field.setValues(nextProps.jobForm);
  }

  handleChange = (editor, data, value) => {
    console.log(value);
    console.log(data);
    console.log(editor);
  }

  resolve = (configs) => {
    // let val,
    let userConfigs = '';
    // 首先过滤内置配置信息 然后拼接用户配置信息
    for (const key in configs) {
      val = configs[key];
      // if (key === "roll.back.times") {
      //   let backTimes = $("#" + dom + " [name='rollBackTimes']");
      //   if (dom == "jobMessage") {
      //     backTimes.val(val);
      //   } else {
      //     backTimes.val(val);
      //   }
      // } else if (key === "roll.back.wait.time") {
      //   let waitTime = $("#" + dom + " [name='rollBackWaitTime']");
      //   if (dom == "jobMessage") {
      //     waitTime.val(val);
      //   } else {
      //     waitTime.val(val);
      //   }
      // } else if (key === "run.priority.level") {
      //   let level = $("#" + dom + " [name='runPriorityLevel']");
      //   if (dom == "jobMessage") {
      //     level.val(val == 1 ? "low" : val == 2 ? "medium" : "high");
      //   } else {
      //     level.val(val);
      //   }
      // } else if (key === "zeus.dependency.cycle" || key === "hera.dependency.cycle") {
      //   let cycle = $("#" + dom + " [name='heraDependencyCycle']");
      //   if (dom == "jobMessage") {
      //     cycle.val(val);
      //   } else {
      //     cycle.val(val);
      //   }
      // } else {
      userConfigs = `${userConfigs + key}=${val}\n`;
    }
    // }
    // if (focusItem.cronExpression == null || focusItem.cronExpression == undefined || focusItem.cronExpression == "") {
    //   $('#jobMessageEdit [name="cronExpression"]').val("0 0 3 * * ?");
    // }

    return userConfigs;
  }

  render() {
    const { labelAlign } = this.state;
    const { jobForm } = this.props;
    console.log(jobForm);
    const init = this.field.init(jobForm);
    console.log(init.id);

    return (
      <div >
        <div>
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
                label="预计时长:"
              >
                <Input name="mustEndMinute" readOnly />
              </FormItem>
              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="机器组:"
              >
                <Input name="groupId" readOnly />
              </FormItem>

              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="描述:"
              >
                <Input name="description" readOnly />
              </FormItem>
            </Row>

            <Row span="8" justify="center">

              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="区域:"
              >
                <Input name="timezone" readOnly />
              </FormItem>
              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="报警级别:"
              >
                <Input name="alarmLevel" readOnly />
              </FormItem>
            </Row>
            <Row>
              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="配置项信息:"
              >
                <Input.TextArea name="configs" value={Object.is(jobForm, null) ? '' : this.resolve(jobForm.configs)}>    </Input.TextArea >
              </FormItem>
            </Row>
            <Row>
              <CodeMirror
                value={Object.is(jobForm, null) ? '' : jobForm.script}
                onChange={this.handleChange.bind(this)}
                options={this.state.options}
                codeMirrorInstance={this.state.codeMirrorInstance}
              />
            </Row>
            <Row>
              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="继承的配置项信息:"
              >
                <Input.TextArea name="inheritConfig" value={Object.is(jobForm, null) ? '' : jobForm.inheritConfig}> </Input.TextArea>
              </FormItem>
            </Row>
          </Form>
        </div>
      </div >
    );
  }
}
