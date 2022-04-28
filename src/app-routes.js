import { withNavigationWatcher } from './contexts/navigation';
import { NewStaffPage,  TemplateContractPage,
  ContractPage } from 'pages/index';
const routes = [
 
  {
    path: '/new-staff',
    component: NewStaffPage,
    name: 'New Staff',
    children: [
      {
        path: '/new-staff',
        component: NewStaffPage,
        name: 'New Staff',
        meta: { title: 'new-staff', icon: 'tab' }
      }
    ]
  },  
  {
    path: "/new-staff/:id",
    component: ContractPage,
    name: "Nhân viên",
    children: [
      {
        path: "/new-staff/:id",
        component: ContractPage,
        name: "Nhân viên",
        meta: {
          icon: "tab",
          text: "hopdong",
          path: "/new-staff/:id",
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
