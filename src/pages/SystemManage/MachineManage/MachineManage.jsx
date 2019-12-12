import React, { Component } from 'react';

import MachineTable from './component/MachineTable';
// import index '../../../../../mock/machineGroup/index';


export default class MachineManage extends Component {

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
    const { data } = mock;
    return (
      <div>
        <MachineTable data={data} />
      </div>
    );
  }
}

const mock = {
  'msg': null,
  'count': 1,
  'code': 0,
  'data': [
    {
      'id': 1,
      'host': '192.168.11.103',
      'hostGroupId': 1
    }
  ]
};