import React, { Component } from 'react';
import { Tree, Button, Tab, Icon, Dialog, Input, Form, Grid, Balloon, Field } from '@alifd/next';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Link, withRouter } from 'react-router-dom';


const FormItem = Form.Item;
const { Row } = Grid;
const formItemLayout = {
  labelCol: { fixedSpan: 4 },
};

export default class FolderForm extends Component {
  field = new Field(this);
  constructor(props) {
    super(props);
    this.state = {
      labelAlign: 'left',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.field.setValues(nextProps.folderForm);
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
      const val = configs[key];
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

  onEditGroup = (editable) => {
    this.props.onEditGroup(editable);
  }
  onGetGroupTask = () => {

  }
  onAddGroup = () => {

  }

  onAddJob = () => {

  }

  onRemove = () => {

  }

  onUpdatePermission = () => {
    
  }

  render() {
    const { labelAlign } = this.state;
    const { folderForm } = this.props;
    console.log(folderForm);
    const init = this.field.init(folderForm);
    console.log(init.id);

    return (
      <div style={{ display: 'flex' }}>
        <div>
          <Form field={this.field}>
            <Row span="8" justify="center">
              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="任id"
              >
                <Input name="id" readOnly />
              </FormItem>
              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="名称:"
              >
                <Input name="name" readOnly />
              </FormItem>
              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="所有人:"
              >
                <Input name="owner" readOnly />
              </FormItem>
            </Row>

            <Row span="8" justify="center">
              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="描述"
              >
                <Input name="description" readOnly />
              </FormItem>
              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="关注人员:"
              >
                <Input name="scheduleType" readOnly />
              </FormItem>
              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="管理员:"
              >
                <Input name="owner" readOnly />
              </FormItem>
            </Row>

            <FormItem
              labelAlign="top"
              label="配置项信息"
            >
              <Input.TextArea name="configs" value={Object.is(folderForm, undefined) ? '' : this.resolve(folderForm.configs)}></Input.TextArea >
            </FormItem>
            <FormItem
              labelAlign="top"
              label="继承的配置项信息"
            >
              <Input.TextArea name="inheritConfig" value={Object.is(folderForm, undefined) ? '' : this.resolve(folderForm.inheritConfig)}></Input.TextArea>
            </FormItem>
          </Form>
        </div>
        <div>
          <ul>
            <li>
              <Button onClick={this.onGetGroupTask} size="medium" type="primary">任务总览</Button>&emsp;
            </li>
            <li>
              <Button onClick={this.onAddGroup} size="medium" type="primary">添加组</Button>&emsp;
            </li>
            <li>
              <Button onClick={this.onEditGroup.bind(this, 1)} size="medium" type="primary">编辑</Button>&emsp;
            </li>
            <li>
              <Button onClick={this.onAddJob} size="medium" type="primary">添加任务</Button>&emsp;
            </li>
            <li>
              <Button onClick={this.onRemove} size="medium" type="primary">删除</Button>&emsp;
            </li>
            <li>
              <Button onClick={this.onUpdatePermission} size="medium" type="primary">配置管理员</Button>&emsp;
            </li>
          </ul>
        </div>
      </div >
    );
  }
}
