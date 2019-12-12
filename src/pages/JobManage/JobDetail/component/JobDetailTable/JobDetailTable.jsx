import { Input, Button, Dialog, Form, Table, Balloon, Field, Radio } from '@alifd/next';
import React, { Component, Fragment } from 'react';
import TableFilter from '../TableFilter/TableFilter';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

export default class JobDetailTable extends Component {

  field = new Field(this);

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };

  }

  onFilter = (value) => {
        // console.log('ContentManage.onFilter', value);
    this.setState({
      filter: value
    }, () => {
        //   this.loadData();
    });
  };

  onSearch = (params) => {
        // console.log('search', params);
    this.setState({
      queryTerm: params
    }, () => {
        //   this.loadData();
    });
  };

  componentDidMount() {
    this.setState({
      visible: false
    });
  }

  renderStatus = (value, idx, obj) => {

    switch (obj.effective) {
      case 0:
        return (
                    <div ><span>已失效</span></div>
        );
      case 1:
        return (
                    <div ><span>有效</span></div>
        );
    }

  }

  renderOperation = (value, idx, obj) => {
    return (
            <div>
                <Button type="primary" onClick={this.onEdit.bind(this, obj.id)}>编辑</Button>&nbsp;&nbsp;
                <Button type="normal" onClick={this.onDelete.bind(this, obj.id)} warning>删除</Button>
            </div>
    );
  }


  onClose = () => {
        // console.log(this.field.getValues());

    this.setState({
      visible: false
    });
  }

  onCreate = () => {
    this.setState({
      visible: true
    });
  }

  onEdit = (id) => {
    console.log(id);
    let mock1 = { name: 'dd', effective: '1', description: 'test' };
    this.field.setValues(mock1);
    this.setState({
      visible: true
    });
  }

  onDelete = (id) => {
    console.log(id);
  }
  render() {

    const { data } = this.props;
    const init = this.field.init;
    return (
            <Fragment>
                <TableFilter searchHandler={this.onSearch} onFilter={this.onFilter} />
                <Table dataSource={data.data} >
                    <Table.Column title="序号" dataIndex="jobId" />
                    <Table.Column title="任务组" dataIndex="groupName" />
                    <Table.Column title="任务名称" dataIndex="jobName" />
                    <Table.Column title="任务描述" dataIndex="description" />
                    <Table.Column title="状态" dataIndex="status" />
                    <Table.Column title="开始时间" dataIndex="startTime" />
                    <Table.Column title="结束时间" dataIndex="endTime" />
                    <Table.Column title="执行人" dataIndex="operator" />
                    <Table.Column title="机器" dataIndex="executeHost" />
                </Table>
            </Fragment>
    );
  }
}

const mock = {
  'message': '查询成功',
  'success': true,
  'data': [
    {
      'jobId': '1',
      'actionId': null,
      'startTime': '2019-09-22 12:14:51.0',
      'endTime': '2019-09-22 12:14:51.0',
      'executeHost': 'localhost',
      'status': 'success',
      'operator': 'hera',
      'description': '输出测试',
      'jobName': 'echoTest',
      'groupName': 'test',
      'times': 1
    }
  ]
};