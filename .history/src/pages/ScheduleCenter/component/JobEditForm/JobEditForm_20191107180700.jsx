import React, { Component } from 'react';
import { Tree, Button, Checkbox, Dialog, Input, Form, Grid, Select, Field, Search } from '@alifd/next';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { init } from '../../../../api/ScheduleCenter';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/sql/sql';
import 'codemirror/addon/hint/sql-hint.js';
import 'codemirror/theme/ambiance.css';

import './JobEditForm.scss';

const FormItem = Form.Item;
const { Row } = Grid;

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
      auto: 0,
      selectTreeVisible: false,
      checkedKeys: [],
      checkStrictly: true,
      selectKeys

    };
  }

  buildTree = (data, pid) => {
    const result = [];
    let temp = [];
    for (let i = 0; i < data.length; i++) {
      let obj = {};
      if (data[i].parent === pid) {
        if (data[i].directory === null) {
          obj = { label: data[i].name, key: data[i].id, isLeaf: true };
        } else {
          obj = { label: data[i].name, key: data[i].id, isLeaf: false };
        }
        temp = this.buildTree(data, data[i].id);
        if (temp.length > 0) {
          obj.children = temp;
        }
        result.push(obj);
      }
    }
    return result;
  };

  convertData = (data) => {
    const root = [{ label: 'hera分布式调度系统', key: 'group_1', isLeaf: false, children: [] }];
    const node = this.buildTree(data, 'group_1');
    for (let i = 0; i < node.length; i++) {
      root[0].children.push(node[i]);
    }
    return root;
  }

  async componentWillMount() {
    const promise = await init();
    const nodes = this.convertData(promise.data.allJob);
    this.setState({ dataSource: nodes });
  }

  componentWillReceiveProps(nextProps) {
    this.field.setValues(nextProps.jobForm);
  }

  handleChange = (editor, data, value) => {
    // console.log(value);
    // console.log(data);
    // console.log(editor);
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
  onChange = (value) => {
    console.log(value);
    if (value === 1) {
      this.setState({
        auto: value,
        selectTreeVisible: true,
      });
    } else {
      this.setState({
        auto: value,
        selectTreeVisible: false,
      });
    }
  }

  onClose = () => {
    this.setState({
      selectTreeVisible: false,
    });
  }


  onFocus = (event) => {
    console.log(event);
    this.setState({
      selectTreeVisible: true,
    });
  }

  handleSearch = () => {

  }

  handleCheck = (keys, info) => {
    console.log(keys);
    console.log(info);
  }

  onSelect = (selectedkeys) => {
    console.log(selectedkeys);
  }
  render() {
    const { labelAlign, checkStrictly, checkedKeys, dataSource } = this.state;
    const { jobForm } = this.props;
    console.log(jobForm);
    const init = this.field.init(jobForm);
    console.log(init.id);

    return (
      <div style={{ display: 'flex' }}>
        <div>

          <Form field={this.field}>
            <Row span="8" justify="center">
              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="名称:"
              >
                <Input name="name" />
              </FormItem>
              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="调度类型:"
              >
                <Select name="scheduleType" defaultValue="0" onChange={this.onChange.bind(this)}>
                  <Select.Option value="0">定时调度</Select.Option>
                  <Select.Option value="1">依赖调度</Select.Option>
                </Select>
              </FormItem>
            </Row>
            <Row span="8" justify="center">

              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="重试次数"
              >
                <Input name="repeatRun" />
              </FormItem>

              {
                this.state.auto === 0 ? (<FormItem {...formItemLayout}
                  labelAlign={labelAlign}
                  label="定时表达式:"
                >
                  <Input name="cronExpression" />
                                         </FormItem>) : (<FormItem {...formItemLayout}
                  labelAlign={labelAlign}
                  label="依赖任务:"
                >
                  <Input onFocus={this.onFocus.bind(this)} name="configs.roll.back.wait.time" />
                                </FormItem>)
              }

            </Row>

            <Row span="8" justify="center">

              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="依赖任务:"
              >
                <Input onFocus={this.onFocus.bind(this)} name="configs.roll.back.wait.time" />
              </FormItem>

              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="依赖周期:"
              >
                <Input name="groupId" />
              </FormItem>
            </Row>

            <Row span="8" justify="center">

              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="重试间隔:"
              >
                <Input name="configs.roll.back.wait.time" />
              </FormItem>

              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="机器组:"
              >
                <Input name="groupId" />
              </FormItem>
            </Row>
            <Row span="8" justify="center">

              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="任务类型:"
              >
                <Input name="runType" />
              </FormItem>

              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="预计时长:"
              >
                <Input name="mustEndMinute" />
              </FormItem>
            </Row>
            <Row span="8" justify="center">

              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="任务优先级:"
              >
                <Input name="configs.run.priority.level" />
              </FormItem>

              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="区域:"
              >
                <Input name="timezone" />
              </FormItem>
            </Row>
            <Row span="8" justify="center">

              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="报警级别:"
              >
                <Input name="alarmLevel" />
              </FormItem>

              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="重复执行:"
              >
                <Input name="repeatRun" />
              </FormItem>
            </Row>

            <Row span="8" justify="center">

              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="描述:"
              >
                <Input name="description" />
              </FormItem>

            </Row>

            <div>
              <FormItem
                labelAlign="top"
                label="配置项信息"
              >
                <Input.TextArea name="configs" value={Object.is(jobForm, null) ? '' : this.resolve(jobForm.configs)} />
              </FormItem>
              <FormItem>
                <CodeMirror
                  value={Object.is(jobForm, null) ? '' : jobForm.script}
                  onChange={this.handleChange.bind(this)}
                  options={this.state.options}
                  codeMirrorInstance={this.state.codeMirrorInstance}
                />
              </FormItem>
              <FormItem
                labelAlign="top"
                label="继承的配置项信息"
              >
                <Input.TextArea name="inheritConfig" value={Object.is(jobForm, null) ? '' : this.resolve(jobForm.inheritConfig)} />
              </FormItem>
            </div>
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
              <Button onClick={this.onSaveJob} size="medium" type="primary">保存</Button>&emsp;
            </li>
          </ul>
        </div>

        <div>
          <Dialog visible={this.state.selectTreeVisible}
            onClose={this.onClose}
            title="选择任务依赖任务"

          >
            <div className="control-check-demo">
              <Search shape="simple" size="medium" style={{ width: '200px', marginBottom: '10px' }} onChange={this.handleSearch} />
              <Tree defaultExpandAll checkable showLine onCheck={this.handleCheck} dataSource={dataSource} onSelect={this.onSelect.bind(this)} />
            </div>
          </Dialog>
        </div>
      </div >
    );
  }
}
