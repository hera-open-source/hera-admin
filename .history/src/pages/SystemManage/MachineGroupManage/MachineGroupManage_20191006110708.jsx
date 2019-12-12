import React, { Component } from 'react';

import MachineGroupTable from './component/Machine/MachineGroupTable';
import { list } from '../../../api/MachineGroup.js';

export default class MachineGroupManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: mock,
    };
  }

  asynccomponentDidMount() {
    const params = {
      page: 1,
      limit: 10,
    };
    const data await = list(params);
    console.log(data);
    this.setState({
      data: mock,
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <MachineGroupTable data={data} />
      </div>
    );
  }
}

const mock = {
  'msg': null,
  'count': 2,
  code: 0,
  'data': [
    {
      id: 1,
      name: '默认组',
      effective: 1,
      description: '机器默认组',
      gmtCreate: 1558064223000,
      'gmtModified': 1558064223000,
    },
    {
      id: 2,
      'name': 'spark组',
      'effective': 1,
      'description': '执行spark任务',
      gmtCreate: 1558064223000,
      gmtModified: 1558064223000,
    },
  ],
};
