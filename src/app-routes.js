import { withNavigationWatcher } from './contexts/navigation';
import { NewStaffPage,  TemplateContractPage,
  ContractPage } from 'pages/index';
const routes = [
 
  {
    path: '/staff',
    component: NewStaffPage,
    name: 'Nhân viên',
    children: [
      {
        path: '/staff',
        component: NewStaffPage,
        name: 'Nhân viên',
        meta: { title: 'Nhân viên', icon: 'tab' }
      }
    ]
  },  
  {
    path: "/staff/:id",
    component: ContractPage,
    name: "Nhân viên",
    children: [
      {
        path: "/staff/:id",
        component: ContractPage,
        name: "Nhân viên",
        meta: {
          icon: "tab",
          text: "hopdong",
          path: "/staff/:id",
        },
      },
    ],
  },
  {
    path: "/template-contract",
    component: TemplateContractPage,
    name: " Mẫu hợp đồng",
    children: [
      {
        path: "/template-contract",
        component: TemplateContractPage,
        name: "Mẫu hợp đồng",
        meta: { title: "template-contract", icon: "tab" },
      },
    ],
  },
 
];

export default routes.map(route => {
  return {
    ...route,
    component: withNavigationWatcher(route.component)
  };
});
