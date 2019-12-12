import React, { Component } from 'react';

import MachineGroupTable from './component/Machine/MachineGroupTable';
import from '../../api/Mach'

export default class MachineGroupManage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: mock,
    };
  }

  componentDidMount() {
    this.setState({
      data: mock,
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <MachineGroupTable data={data}></MachineGroupTable>
      </div>
    );
  }
}

const mock = {
  "msg": null,
  "count": 2,
  "code": 0,
  "data": [
    {
      "id": 1,
      "name": "默认组",
      "effective": 1,
      "description": "机器默认组",
      "gmtCreate": 1558064223000,
      "gmtModified": 1558064223000
    },
    {
      "id": 2,
      "name": "spark组",
      "effective": 1,
      "description": "执行spark任务",
      "gmtCreate": 1558064223000,
      "gmtModified": 1558064223000
    }
  ]
}