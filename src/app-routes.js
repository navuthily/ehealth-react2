import { withNavigationWatcher } from './contexts/navigation';
import { HomePage, TasksPage, ProfilePage,BenhAnComponent, XenghiemLabo } from 'pages/index';

const routes = [
  {
    path: '/tasks',
    component: TasksPage,
    name: 'Tasks',
    children: [
      {
        path: '/tasks',
        component: TasksPage,
        name: 'Tasks',
        meta: { title: 'tasks', icon: 'tab' }
      }
    ]
  },
  {
    path: '/profile',
    component: ProfilePage,
    name: 'Profile',
    children: [
      {
        path: '/profile',
        component: ProfilePage,
        name: 'Profile',
        meta: { title: 'profile', icon: 'tab' }
      }
    ]
  },
  {
    path: '/home',
    component: HomePage,
    name: 'Home',
    children: [
      {
        path: '/home',
        component: HomePage,
        name: 'Home',
        meta: { title: 'home', icon: 'tab' }
      }
    ]
  },
  {
    path: '/benhan/:benhanId',
    component: BenhAnComponent,
    name: 'BenhAn',
    children: [
      {
        path: '/benhan/:benhanId',
        component: BenhAnComponent,
        name: 'BenhAn',
        meta: {  icon: 'tab', text:'BenhAn', path : '/benhan/:benhanId'  }
      }
    ]
  },
  {
    path: '/thuthuatranghammat/:benhanId',
    component: BenhAnComponent,
    name: 'thuthatranghammat',
    children: [
      {
        path: '/thuthuatranghammat/:benhanId',
        component: BenhAnComponent,
        name: 'thuthatranghammat',
        meta: {  icon: 'tab', text:'thuthatranghammat', path : '/thuthuatranghammat/:benhanId'  }
      }
    ]
  },
  {
    path: '/xetnghiem/:benhanId',
    component: XenghiemLabo,
    name: 'xetnghiem',
    children: [
      {
        path: '/xetnghiem/:benhanId',
        component: XenghiemLabo,
        name: 'xetnghiem',
        meta: {  icon: 'tab', text:'xetnghiem', path : '/xetnghiem/:benhanId'  }
      }
    ]
  },
  {
    path: '/xquang/:benhanId',
    component: BenhAnComponent,
    name: 'xquang',
    children: [
      {
        path: '/benhan/:benhanId/xquang/:benhanId',
        component: BenhAnComponent,
        name: 'xquang',
        meta: {  icon: 'tab', text:'xquang', path : '/xquang/:benhanId'  }
      }
    ]
  }
];

export default routes.map(route => {
  return {
    ...route,
    component: withNavigationWatcher(route.component)
  };
});
