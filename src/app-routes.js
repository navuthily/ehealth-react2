import { withNavigationWatcher } from "./contexts/navigation";
import {
  NewStaffPage,
  TemplateContractPage,
  TypeContractPage,
  TitleStaffPage,
  ContractPage,
  PositionStaffPage,
  LoaitinhluongPage,
  LoaikhoiStaffPage, TrinhdoStaffPage,BophanStaffPage,PhongbanStaffPage, ChuyenkhoaStaffPage

} from "pages/index";
const routes = [
  {
    path: "/nhan-vien",
    component: NewStaffPage,
    name: "Nhân viên",
    children: [
      {
        path: "/nhan-vien",
        component: NewStaffPage,
        name: "Nhân viên",
        meta: { title: "Nhân viên", icon: "tab" },
      },
    ],
  },
  {
    path: "/nhan-vien/:id",
    component: ContractPage,
    name: "Nhân viên",
    children: [
      {
        path: "/nhan-vien/:id",
        component: ContractPage,
        name: "Hợp đồng",
        meta: {
          icon: "tab",
          text: "Nhan vien",
          path: "/nhan-vien/:id",
        },
      },
    ],
  },
  {
    path: "/mau-hop-dong",
    component: TemplateContractPage,
    name: " Mẫu hợp đồng",
    children: [
      {
        path: "/mau-hop-dong",
        component: TemplateContractPage,
        name: "Mẫu hợp đồng",
        meta: { title: "mau-hop-dong", icon: "tab" },
      },
    ],
  },
  {
    path: "/loai-hop-dong",
    component: TypeContractPage,
    name: " Loại hợp đồng",
    children: [
      {
        path: "/loai-hop-dong",
        component: TypeContractPage,
        name: "Loại hợp đồng",
        meta: { title: "loai-hop-dong", icon: "tab" },
      },
    ],
  },
  {
    path: "/chuc-danh",
    component: TitleStaffPage,
    name: "Chức danh",
    children: [
      {
        path: "/chuc-danh",
        component: TitleStaffPage,
        name: "Chức danh",
        meta: { title: "chuc-danh", icon: "tab" },
      },
    ],
  },

  {
    path: "/chuc-vu",
    component: PositionStaffPage,
    name: "Chức vụ",
    children: [
      {
        path: "/chuc-vu",
        component: PositionStaffPage,
        name: "Chức vụ",
        meta: { title: "chuc-vu", icon: "tab" },
      },
    ],
  },
  {
    path: "/loai-tinh-luong",
    component: LoaitinhluongPage,
    name: "Loại tính lương",
    children: [
      {
        path: "/loai-tinh-luong",
        component: LoaitinhluongPage,
        name: "Loại tính lương",
        meta: { title: "loai-tinh-luong", icon: "tab" },
      },
    ],
  },
  //


  {
    path: "/loai-khoi",
    component: LoaikhoiStaffPage,
    name: "Loại khối",
    children: [
      {
        path: "/loai-khoi",
        component: LoaikhoiStaffPage,
        name: "Loại khối",
        meta: { title: "loai-khoi", icon: "tab" },
      },
    ],
  },
  {
    path: "/trinh-do",
    component: TrinhdoStaffPage,
    name: "Trình độ",
    children: [
      {
        path: "/trinh-do",
        component: TrinhdoStaffPage,
        name: "Trình độ",
        meta: { title: "trinh-do", icon: "tab" },
      },
    ],
  },//PhongbanStaffPage,DonviStaffPage, ChuyenkhoaStaffPage


  {
    path: "/phong-ban",
    component: PhongbanStaffPage,
    name: "Phòng ban",
    children: [
      {
        path: "/phong-ban",
        component: PhongbanStaffPage,
        name: "Phòng ban",
        meta: { title: "phong-ban", icon: "tab" },
      },
    ],
  },
  {
    path: "/bo-phan",
    component: BophanStaffPage,
    name: "Bộ phận",
    children: [
      {
        path: "/bo-phan",
        component: BophanStaffPage,
        name: "Bộ phận",
        meta: { title: "bo-phan", icon: "tab" },
      },
    ],
  },
  {
    path: "/chuyen-khoa",
    component: ChuyenkhoaStaffPage,
    name: "Chuyên khoa",
    children: [
      {
        path: "/chuyen-khoa",
        component: ChuyenkhoaStaffPage,
        name: "Chuyên khoa",
        meta: { title: "chuyen-khoa", icon: "tab" },
      },
    ],
  },
];

export default routes.map((route) => {
  return {
    ...route,
    component: withNavigationWatcher(route.component),
  };
});
