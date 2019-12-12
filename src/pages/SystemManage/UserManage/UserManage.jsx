import React, { Component } from 'react';
import { Tab } from '@alifd/next';
import UserGroupTable from './component/UserGroupTable';
import UserTable from './component/UserTable';


export default class UserManage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: user,
      groupData: group
    };
  }

  componentDidMount() {
    this.setState({
      userData: user,
      groupData: group
    });
  }

  render() {
    const { userData, groupData } = this.state;
    return (
      <div>
        <Tab>
          <Tab.Item title="用户组" key="1">
            <UserGroupTable data={groupData} />
          </Tab.Item>
          <Tab.Item title="用户" key="2">
            <UserTable data={userData} />
          </Tab.Item>
        </Tab>
      </div>
    );
  }
}

const user = {
  'msg': null,
  'count': 1,
  'code': 0,
  'data': [
    {
      'id': 1,
      'email': '1142819049@qq.com',
      'createTime': '2019-08-10 09:54:42',
      'opTime': '2019-09-22 00:15:46',
      'name': 'hera',
      'phone': null,
      'wangwang': null,
      'isEffective': 1,
      'description': null
    }
  ]
};

const group = {
  'msg': null,
  'count': 1,
  'code': 0,
  'data': [
    {
      'id': 1,
      'name': 'hera',
      'phone': '15868424785',
      'email': '1142819049@qq.com',
      'jobNumber': '1',
      'gmtModified': null,
      'isValid': 1,
      'gname': 'hera'
    }
  ]
};