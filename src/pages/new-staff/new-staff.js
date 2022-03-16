import React, { useEffect, useState } from 'react';
import axios from 'axios'
import DataGrid, {
  Column,
  Format,
  Selection,
  Paging,
  FilterRow,
  Scrolling, HeaderFilter, SearchPanel,
} from "devextreme-react/data-grid";
import SelectBox from 'devextreme-react/select-box';
import CheckBox from 'devextreme-react/check-box';

const service = {
  getOrders() {
    return [
      {
        OrderNumber: 35703,
        SaleAmount: 11800,
        StoreCity: "Las Vegas",
        StoreState: "Nevada",
        Employee: "Harv Mudd",
        OrderDate: "2013/11/12",
      },
      {
        OrderNumber: 214222,
        SaleAmount: 11050,
        StoreCity: "Anaheim",
        StoreState: "California",
        Employee: "Clark Morgan",
        OrderDate: "2015/11/22",
      },
      {
        OrderNumber: 218867,
        SaleAmount: 14200,
        StoreCity: "Las Vegas",
        StoreState: "Nevada",
        Employee: "Harv Mudd",
        OrderDate: "2015/12/03",
      },
      {
        OrderNumber: 222974,
        SaleAmount: 17300,
        StoreCity: "Phoenix",
        StoreState: "Arizona",
        Employee: "Harv Mudd",
        OrderDate: "2015/12/05",
      },
      {
        OrderNumber: 238477,
        SaleAmount: 6550,
        StoreCity: "Phoenix",
        StoreState: "Arizona",
        Employee: "Harv Mudd",
        OrderDate: "2015/12/14",
      },]
  }
};
const NewStaff = () => {

const [data,setData]= useState([])
  useEffect(() => {
    axios.get('http://localhost:7000/users?join=chucvu%7C%7Cid,tenchucvu&join=chucdanh&join=thoihanhopdong&join=dmhopdong&join=dmtrinhdo&join=dmdantoc&join=dmquoctich&join=dmloaitinhluong&join=dmnganhang&join=dmdonvi&join=dmbophan&join=dmphongban&join=dmloaikhoi&join=tinhtranghonnhan&join=chuyenkhoa&join=nhanvienhopdongs&join=nccmnd&join=nccchn&join=phamvichungchihanhnghe&join=phamvihanhnghebosung&join=dienthianhvans&join=nhanvienbangcaps&join=nhanvienbangcaps.loaibangcap&join=nhanvienhopdongs.loaihopdong',
    // {
    //   headers: {'X-Custom-Header': 'value'}
    // }
    )
    .then(function (response) {
      console.log(response.data);
setData(response.data)
    })
    .catch(function (error) {
      console.log(error);
    })

},[]);

  return (
    <DataGrid
      dataSource={data}
      width="100%"
      height="100%">
      <Column dataField="holotNhanVien" caption="Họ lót" dataType="holotNhanVien" />
      <Column dataField="tennhanvien" dataType="string"  caption="Tên nhân viên" />
      <Column dataField="nickname" dataType="string"  caption="Nick Name"/>
      <Column dataField="dmdonvi.tendonvi" dataType="string"  caption="Tên đơn vị"/>
      <Column dataField="dmbophan.tenbophan" dataType="string" caption="Tên bộ phận" />
      <Column dataField="dmphongban.tenphongban" dataType="string" caption="Phòng ban"/>
      <Column dataField="dmloaikhoi.tenloaikhoi" dataType="string" caption="Khối"/>
      <Column dataField="dmtrinhdo.tentrinhdo" dataType="string"  caption="Trình độ" />
      <Column dataField="gioitinh" dataType="string"  caption="Giới tính" cellRender={cellRenderGioiTinh} />
      <Column dataField="ngaysinh" dataType="date"  caption="Ngày sinh"/>
      <Column dataField="chucvu.tenchucvu" dataType="string" caption="Chức vụ"/>
      <Column dataField="chucdanh.tenchucdanh" dataType="string"  caption="Chuyên môn"/>
      <Column dataField="chuyenkhoa.tenchuyenkhoa" dataType="string" caption="Chuyên khoa" />
      <Column dataField="kinhnghiem" dataType="date" caption="Kinh nghiệm"/>
      <Column dataField="ngayvaolam" dataType="date" caption="Ngày vào làm" />
      <Column dataField="nhanvienhopdongs" dataType="string"  caption="Hợp đồng" cellRender={cellRenderHopDong} />
      <Column dataField="id" dataType="string"  caption="ID"/>
      <Column dataField="ngaybatdauHopDong" dataType="date"  caption="Ngày bắt đầu"/>
      <Column dataField="ngayketthucHopDong" dataType="date" caption="Ngày kết thúc" />
      <Column dataField="thoihanhopdong.tenthoihanhopdong" dataType="string" caption="Thời hạn hợp đồng"/>
      <Column dataField="nhanvienbangcaps"  caption="Bằng cấp" cellRender={cellRenderBangCap} />
      <Column dataField="diachi" caption="Địa chỉ" dataType="string" />
      <Column dataField="mobile" dataType="string"  caption="Số điện thoại" />
      <Column dataField="homePhone" dataType="string"  caption="Số điện thoại 2"/>
      <Column dataField="cmnd" dataType="string" caption="CMND"/>
      <Column dataField="email" dataType="string"  caption="Emal"/>
      <Column dataField="masothuecanhan" dataType="string" caption="Mã số thuế cá nhân" />
      <Column dataField="sobaohiem" dataType="string" caption="Số bảo hiểm"/>
      <Column dataField="ghichu" dataType="string" caption="Ghi chú"/>
      <Column dataField="" caption="Lương SP" dataType="string" />
      <Column dataField="danghiviec" dataType="string"  caption="Đã nghỉ viêc" cellRender={cellRenderCheckBox} />
      <Column dataField="isLichBacSy" dataType="string"  caption="Là bác sĩ" cellRender={cellRenderCheckBox}/>
      <Column dataField="isCongTacVienBenNgoai.tenchucvu" dataType="string" caption="Là cộng tác viên" cellRender={cellRenderCheckBox}/>
      <Column dataField="tinhtranghonnhan.tinhtranghonnhan" dataType="string"  caption="Gia đình"/>
      <Column dataField="ngaynghiviec" dataType="string" caption="Ngày nghỉ việc" />
      <Column dataField="soChungChiHanhNghe" dataType="string" caption="Số CCHN"/>
      <Selection mode="single" />
      <Scrolling mode="virtual" />
      <Paging enabled={true} />
      <FilterRow visible={true} />
    </DataGrid>
  );
};
export default NewStaff;
function cellRenderBangCap(data) {
   return (
   <ul>
      {data?.value?.map((item) =>
        <li key={item.id}>
          {item.loaibangcap.tenloaibangcap}
        </li>
      )}
   </ul>)
    
}
function cellRenderHopDong(data) {
  return (
  <ul>
     {data?.value?.map((item) =>
       <li key={item.id}>
         {item.loaihopdong.tenloaihopdong}
       </li>
     )}
  </ul>)
   
}
function cellRenderCheckBox(data) {
  return (

    <CheckBox
    value={data.value}
    iconSize={30}
    />)
   
}
function cellRenderGioiTinh(data) {
  return (
    <div>{(data.value==true)?'nam':'nữ'}</div>

    )
   
}
