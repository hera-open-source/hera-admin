import React, { Component } from 'react';
import { Tree, Button, Tab, Icon, Dialog, Input, Form, Grid, Upload, Field } from '@alifd/next';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Link, withRouter } from 'react-router-dom';
import { addJob } from '../../../../api/ScheduleCenter.js';

const FormItem = Form.Item;
const { Row } = Grid;
const formItemLayout = {
  labelCol: { fixedSpan: 4 },
};

export default class FolderEditFormForm extends Component {
  field = new Field(this);
  constructor(props) {
    super(props);
    this.state = {
      labelAlign: 'left',
      uploadDialogVisible: false,
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

  onClose = () => {
    this.setState({
      uploadDialogVisible: false,
    });
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

  onBack = (editable) => {
    this.props.onBack(editable);
  }

  onSave = a() => {
    console.log(this.field.getValues());
    addJob(this.field.getValues().getValues);
  }

  onUpload = () => {
    this.setState({ uploadDialogVisible: true });
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
                label="名称"
              >
                <Input name="name" />
              </FormItem>
              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="描述:"
              >
                <Input name="description" />
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
              <Input.TextArea name="inheritConfig" value={Object.is(folderForm, undefined) ? '' : this.resolve(folderForm.inheritConfig)} readOnly></Input.TextArea>
            </FormItem>
          </Form>
        </div>
        <div>
          <ul>
            <li>
              <Button onClick={this.onBack.bind(this, 0)} size="medium" type="primary">返回</Button>&emsp;
            </li>
            <li>
              <Button onClick={this.onUpload} size="medium" type="primary">上传资源</Button>&emsp;
            </li>
            <li>
              <Button onClick={this.onSave} size="medium" type="primary">保存</Button>&emsp;
            </li>
          </ul>
        </div>

        <div>
          <Dialog visible={this.state.uploadDialogVisible}
            onOk={this.onClose.bind(this, 'okClick')}
            onCancel={this.onClose.bind(this, 'cancelClick')}
            onClose={this.onClose}
            title="文件上传"


          >
            <FormItem required>
              <Upload
                listType="text"
                name="upload"
                action="https://www.easy-mock.com/mock/5b713974309d0d7d107a74a3/alifd/upload"
              // defaultValue={value}
              >
                <Button>Upload</Button>
              </Upload>
            </FormItem>
          </Dialog>
        </div>
      </div >


    );
  }
}
