import React, { Component } from 'react';
import { Button, Dialog, Input, Form, Grid, Field, Select, Table, Pagination } from '@alifd/next';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { getJobHistory, generateVersion, getJobVersion } from '../../../../api/ScheduleCenter';

const FormItem = Form.Item;
const { Row } = Grid;
const Option = Select.Option;
const formItemLayout = {
  labelCol: { fixedSpan: 4 },
};

export default class JobForm extends Component {
  constructor(props) {
    super(props);
    this.field = new Field(this);

    this.state = {
      labelAlign: 'left',
      options: {
        lineNumbers: true, // 显示行号
        mode: { name: 'text/x-mysql' }, // 定义mode
        extraKeys: { Ctrl: 'autocomplete' }, // 自动提示配置
        theme: 'ambiance', // 选中的theme
      },
      codeMirrorInstance: require('codemirror'),

      logVisible: false,
      dagVisible: false,
      versionVisible: false,
      permissionVisible: false,
      versionDataSource: [],
      selectedVersion:null,

      jobId: null,
    };
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
      userConfigs = `${userConfigs + key}=${val}` + '\n';
    }
    // }
    // if (focusItem.cronExpression == null || focusItem.cronExpression == undefined || focusItem.cronExpression == "") {
    //   $('#jobMessageEdit [name="cronExpression"]').val("0 0 3 * * ?");
    // }
    return userConfigs;
  }

  onGetJobHistory = async (jobId) => {
    const result = await getJobHistory({ offset: 0, pageSize: 10, jobId });
    this.setState({ logVisible: true, dataSource: result.data.rows });
  }

  expandedRowRender = () => { }

  operation = () => {

  }

  onGenerateVersion = async (jobId) => {
    const result = await generateVersion({ jobId });
    console.log(result);
  }

  onEditJob = (editable) => {
    this.props.onEditJob(editable);
  }

  onShowDag = () => {
    this.setState({
      dagVisible: true,
    });
  }

  onManual = async (jobId, triggerType) => {
    const result = await getJobVersion({ jobId });
    const data = result.data.map((item) => {
      const version = { value: item.id };
      return version;
    });
    this.setState({
      versionVisible: true,
      versionDataSource: data,
    });
  }
  onUpdateSwitch = () => {

  }

  onDeleteJob = () => {

  }

  onAddMonitor = () => {

  }

  onUpdatePermission = () => {
    this.setState({
      permissionVisible: true,
    });
  }

  onOk = () => {

  }

  onCancel = () => {

  }

  onClose = () => {
    this.setState({
      logVisible: false,
      dagVisible: false,
      versionVisible: false,
      permissionVisible: false,
    });
  }

  render() {
    const { labelAlign, versionDataSource } = this.state;
    const { jobForm } = this.props;
    const jobId = jobForm.id;
    const init = this.field.init;

    return (
      <div style={{ display: 'flex' }}>
        <div>
          <Form field={this.field}>
            <Row span="8" justify="center">
              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="任务id"
              >
                <Input {...init('id')} readOnly />
              </FormItem>
              <FormItem {...formItemLayout}
                labelAlign={labelAlign}
                label="调度类型:"
              >
                <Select name="scheduleType" defaultValue="0" disabled>
                  <Select.Option value="0">定时调度</Select.Option>
                  <Select.Option value="1">依赖调度</Select.Option>
                </Select>
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
            <div>
              <FormItem
                labelAlign="top"
                label="配置项信息"
              >
                <Input.TextArea style={{ whiteSpace: 'pre-wrap' }} value={this.resolve(jobForm.configs)} readOnly />
              </FormItem>
              <FormItem>
                <CodeMirror
                  value={jobForm.script}
                  onChange={this.handleChange.bind(this)}
                  options={this.state.options}
                  codeMirrorInstance={this.state.codeMirrorInstance}
                />
              </FormItem>
              <FormItem
                labelAlign="top"
                label="继承的配置项信息"
              >
                <Input.TextArea style={{ whiteSpace: 'pre-wrap' }} value={this.resolve(jobForm.inheritConfig)} readOnly />
              </FormItem>
            </div>
          </Form>
        </div>
        <div>
          <ul className="file-button-ul">
            <li>
              <Button onClick={this.onGetJobHistory.bind(this, jobId)} size="medium" type="primary">运行日志</Button>&emsp;
            </li>
            <li>
              <Button onClick={this.onGenerateVersion.bind(this, jobId)} size="medium" type="primary">版本生成</Button>&emsp;
            </li>
            <li>
              <Button onClick={this.onShowDag} size="medium" type="primary">依赖图</Button>&emsp;
            </li>
            <li>
              <Button onClick={this.onEditJob.bind(this, 1)} size="medium" type="primary">编辑</Button>&emsp;
            </li>
            <li>
              <Button onClick={this.onManual.bind(this, jobId, '2')} size="medium" type="primary">手动执行</Button>&emsp;
            </li>
            <li>
              <Button onClick={this.onManual.bind(this, jobId, '3')} size="medium" type="primary">手动恢复</Button>&emsp;
            </li>
            <li>
              <Button onClick={this.onUpdateSwitch} size="medium" type="primary">开启/关闭</Button>&emsp;
            </li>
            <li>
              <Button onClick={this.onUpload} size="medium" type="primary">失效</Button>&emsp;
            </li>
            <li>
              <Button onClick={this.onDeleteJob} size="medium" type="primary">删除</Button>&emsp;
            </li>
            <li>
              <Button onClick={this.onUpdatePermission} size="medium" type="primary">配置管理员</Button>&emsp;
            </li>
            <li>
              <Button onClick={this.onAddMonitor} size="medium" type="primary">关注该任务</Button>&emsp;
            </li>
          </ul>
        </div>

        <div>
          <Dialog visible={this.state.logVisible}
            onOk={this.onClose.bind(this, 'okClick')}
            onCancel={this.onClose.bind(this, 'cancelClick')}
            onClose={this.onClose}
          >
            <Table dataSource={this.state.dataSource}
              isZebra={this.state.isZebra}
              hasBorder={false}
              hasExpandedRowCtrl
              expandedRowRender={this.expandedRowRender.bind(this)}
            >
              <Table.Column title="id" dataIndex="id" sortable />
              <Table.Column title="版本号" dataIndex="actionId" />
              <Table.Column title="任务ID" dataIndex="jobId" />
              <Table.Column title="执行状态" dataIndex="status" />
              <Table.Column title="开始时间" dataIndex="startTime" />
              <Table.Column title="结束时间" dataIndex="endTime" />
              <Table.Column title="时长(分)" dataIndex="endTime" />
              <Table.Column title="说明" dataIndex="endTime" />
              <Table.Column title="触发类型" dataIndex="triggerType" />
              <Table.Column title="机器|执行人" dataIndex="executeHost" />
              <Table.Column title="操作" cell={this.operation.bind(this)} width={200} />
            </Table>
            <Pagination defaultCurrent={this.state.current} onChange={this.onPageChange} />
          </Dialog>

          <Dialog visible={this.state.dagVisible}
            onOk={this.onClose.bind(this, 'okClick')}
            onCancel={this.onClose.bind(this, 'cancelClick')}
            onClose={this.onClose}
            title="任务链路图"
          >
            <div>
              <div>
                <FormItem label="任务ID">
                  <Input name="jobId" />
                </FormItem>
                <Button onClick={this.onSynJob} size="medium" type="primary">上游任务链</Button>&emsp;
                <Button onClick={this.onSynJob} size="medium" type="primary">下游任务链</Button>&emsp;
                <Button onClick={this.onSynJob} size="medium" type="primary">展示全部</Button>&emsp;
              </div>
              <div>
                图
              </div>
            </div>
          </Dialog>

          <Dialog visible={this.state.versionVisible}
            onOk={this.onClose.bind(this, 'okClick')}
            onCancel={this.onClose.bind(this, 'cancelClick')}
            onClose={this.onClose}
            title="选择Job版本"
          >
            <div className="demo-container">
              <Select onChange={this.onChangeVersion.b} dataSource={versionDataSource} aria-labelledby="select-a11y" />
            </div>
          </Dialog>

          <Dialog visible={this.state.permissionVisible}
            onOk={this.onClose.bind(this, 'okClick')}
            onCancel={this.onClose.bind(this, 'cancelClick')}
            onClose={this.onClose}
            title="配置管理员"
          >
            <div className="demo-container">
              <Select onChange={this.onChange} defaultValue="jack" aria-labelledby="select-a11y">
                <Option value="jack">Jack</Option>
                <Option value="frank">Frank</Option>
                <Option value="hugo">Hugo</Option>
              </Select>
            </div>
          </Dialog>
        </div>
      </div >
    );
  }
}
