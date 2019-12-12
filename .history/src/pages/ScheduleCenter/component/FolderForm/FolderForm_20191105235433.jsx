import React, { Component } from 'react';
import { Button, Dialog, Table, Input, Form, Grid, Field, Pagination, Select } from '@alifd/next';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Link, withRouter } from 'react-router-dom';

import { getGroupTask, addGroup } from '../../../../api/ScheduleCenter.js';


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
      previewJobVisible: false,
      addGroupVisible: false,
      addJobVisible: false,
      removeGroupVisible: false,
      updatePermissionVisible: false,
      footerActions: [],
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
  onGetGroupTask = async () => {
    this.setState({ previewJobVisible: true });
    const groupId = this.props.folderForm.id;
    const result = await getGroupTask({ page: 1, limit: 10, status: 'all', groupId });
    this.setState({ dataSource: result.data });
  }
  onAddGroup = () => {
    this.setState({ addGroupVisible: true });
  }

  onAddJob = () => {
    this.setState({ addJobVisible: true });
  }

  onRemove = () => {
    this.setState({ removeGroupVisible: true });
  }

  onUpdatePermission = () => {
    this.setState({ updatePermissionVisible: true });
  }
  onClose = () => {
    this.setState({
      previewJobVisible: false,
      addGroupVisible: false,
      addJobVisible: false,
      removeGroupVisible: false,
      updatePermissionVisible: false,
    });
  }

  handleSubmit = async (values, errors) => {
    console.log('Get form value:', values);
    const groupId = this.props.folderForm.id;
    const result = await addGroup({ name: values.name, directory: values.directory, parentId: '' `group_${groupId}` });
    console.log(result);
    this.setState({
      addGroupVisible: false,
    });
  }
  onChange = async (value) => {
    console.log(value);
    const groupId = this.props.folderForm.id;
    const result = await getGroupTask({ page: 1, limit: 10, status: `${value}`, groupId });
    this.setState({ dataSource: result.data });
  }
  render() {
    const { labelAlign, footerActions } = this.state;
    const { folderForm } = this.props;
    console.log(folderForm);
    const init = this.field.init(folderForm);
    console.log(init.id);

    return (
      <div style={{ display: 'flex' }}>
        <div>
          <Form field={this.field}>
            <Row span="8" >
              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="组id"
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

            <Row span="8" >
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
        <div>
          <Dialog visible={this.state.previewJobVisible}
            onOk={this.onClose.bind(this, 'okClick')}
            onCancel={this.onClose.bind(this, 'cancelClick')}
            onClose={this.onClose}
          >
            <div>
              <Form.Item label="状态:"
                labelAlign="left"
                labelCol={{ fixedSpan: 3 }}
                labelTextAlign="right"
                title="任务总览"
              >
                <Select onChange={this.onChange}>
                  <Select.Option value="all">全部记录</Select.Option>
                  <Select.Option value="running">正在执行</Select.Option>
                  <Select.Option value="failed">失败记录</Select.Option>
                  <Select.Option value="success">失败记录</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <Table dataSource={this.state.dataSource}
              isZebra={this.state.isZebra}
              hasBorder={false}
              hasExpandedRowCtrl
            // expandedRowRender={this.expandedRowRender.bind(this)}
            >
              <Table.Column title="id" dataIndex="id" sortable />
              <Table.Column title="版本号" dataIndex="actionId" />
              <Table.Column title="任务ID" dataIndex="jobId" />
              <Table.Column title="任务名称" dataIndex="name" />
              <Table.Column title="执行状态" dataIndex="status" />
              <Table.Column title="依赖状态" dataIndex="readyStatus" />
              <Table.Column title="上次执行结果" dataIndex="lastResult" />
            </Table>
            <Pagination defaultCurrent={this.state.current} onChange={this.onPageChange} />
          </Dialog>
        </div>

        <div>
          <Dialog visible={this.state.addGroupVisible}
            // onCancel={this.onClose.bind(this, 'cancelClick')}
            onClose={this.onClose}
            footerActions={footerActions}
            title="添加组"
          >
            <Form >
              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="目录名称:"
              >
                <Input name="name" />
              </FormItem>

              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="目录类型"
              >
                <Select name="directory">
                  <Select.Option value="0">大目录</Select.Option>
                  <Select.Option value="1">小目录</Select.Option>
                </Select>
              </FormItem>

              <FormItem label=" ">
                <Form.Submit type="primary" onClick={this.handleSubmit}>添加</Form.Submit>
              </FormItem>

            </Form>
          </Dialog>
        </div>

        <div>
          <Dialog visible={this.state.addJobVisible}
            onOk={this.onClose.bind(this, 'okClick')}
            onCancel={this.onClose.bind(this, 'cancelClick')}
            onClose={this.onClose}
            title="添加任务"
          >
            <FormItem {...formItemLayout}
              labelAlign={labelAlign}
              label="任务名称:"
            >
              <Input name="name" />
            </FormItem>

            <Form.Item label="任务类型:"
              labelAlign="left"
              labelCol={{ fixedSpan: 4 }}
              labelTextAlign="right"
            >
              <Select>
                <Select.Option value="hive">shell脚本</Select.Option>
                <Select.Option value="shell">hive脚本</Select.Option>
                <Select.Option value="spark">spark脚本</Select.Option>
              </Select>
            </Form.Item>
          </Dialog>
        </div>

        <div>
          <Dialog visible={this.state.removeGroupVisible}
            onOk={this.onClose.bind(this, 'okClick')}
            onCancel={this.onClose.bind(this, 'cancelClick')}
            onClose={this.onClose}
            title="删除组"
          />
        </div>

        <div>
          <Dialog visible={this.state.updatePermissionVisible}
            onOk={this.onClose.bind(this, 'okClick')}
            onCancel={this.onClose.bind(this, 'cancelClick')}
            onClose={this.onClose}
            title="配置管理员"
          >

            <Form.Item label="配置管理员:"
              labelAlign="left"
              labelCol={{ fixedSpan: 4 }}
              labelTextAlign="right"
            >
              <Select>
                <Select.Option value="hera">hera</Select.Option>
              </Select>
            </Form.Item>
          </Dialog>
        </div>

      </div >
    );
  }
}
