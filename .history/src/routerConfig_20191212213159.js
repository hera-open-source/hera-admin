// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import Dashboard from './pages/Dashboard';
import PostList from './pages/PostList';
import NewPost from './pages/NewPost';
import HotPost from './pages/HotPost';
// import Status from './pages/Status';
import Settings from './pages/Settings';
import UserLogin from './pages/UserLogin';
import MachineMonitor from './pages/MachineMonitor/MachineMonitor';
import JobDetail from './pages/JobManage/JobDetail';
import JobDependGraph from './pages/JobManage/JobDependGraph';
import UserManage from './pages/SystemManage/UserManage';
import MachineManage from './pages/SystemManage/MachineManage';
import MachineGroupManage from './pages/SystemManage/MachineGroupManage';
import DevelopCenter from './pages/DevelopCenter/DevelopCenter';
import ScheduleCenter from './pages/ScheduleCenter/ScheduleCenter';


const routerConfig = [
  {
    path: '/user/login',
    component: UserLogin,
  },
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/post/list',
    component: PostList,
  },
  {
    path: '/post/new',
    component: NewPost,
  },
  {
    path: '/post/analysis',
    component: HotPost,
  },
  {
    path: '/account/settings',
    component: Settings,
  },
  {
    path: '/machineMonitor/machineMonitor',
    component: MachineMonitor,
  },

  {
    path: '/jobMange/jobDetail',
    component: JobDetail,
  },
  {
    path: '/jobMange/jobDependGraph',
    component: JobDependGraph,
  },
  {
    path: '/systemManage/userManage',
    component: UserManage,
  },
  {
    path: '/systemManage/machineManage',
    component: MachineManage,
  },
  {
    path: '/systemManage/machineGroupManage',
    component: MachineGroupManage,
  },
  {
    path: '/developCenter',
    component: DevelopCenter,
  },
  {
    path: '/scheduleCenter',
    component: ScheduleCenter,
  },
];

export default routerConfig;
