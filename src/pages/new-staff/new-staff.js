import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'
import DataGrid, {
  Column,Grouping,
  Selection,
  FilterRow,
  Scrolling, GroupPanel, Summary,GroupItem,   Editing,
  Popup,
  Paging,
  Lookup,
  Form,
} from "devextreme-react/data-grid";
import { Item } from 'devextreme-react/form';
import SelectBox from 'devextreme-react/select-box';
import CheckBox from 'devextreme-react/check-box';
import { Button } from 'devextreme-react/button';
import './new-staff.scss'
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import CustomStore from 'devextreme/data/custom_store';
import 'whatwg-fetch';
import 'devextreme-intl';
// Dictionaries for German and Russian languages



function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== '';
}

const store = new CustomStore({
  key: 'id',
  load(loadOptions) {
    let params = '?';
    [
   'page',
    ].forEach((i) => {
      if (i in loadOptions && isNotEmpty(loadOptions[i])) { params += `${i}=${JSON.stringify(loadOptions[i])}&`; }
    });
    params = params.slice(0, -1);
    return fetch(`http://localhost:7000/users?join=chucvu%7C%7Cid,tenchucvu&join=chucdanh&join=thoihanhopdong&join=dmhopdong&join=dmtrinhdo&join=dmdantoc&join=dmquoctich&join=dmloaitinhluong&join=dmnganhang&join=dmdonvi&join=dmbophan&join=dmphongban&join=dmloaikhoi&join=tinhtranghonnhan&join=chuyenkhoa&join=nhanvienhopdongs&join=nccmnd&join=nccchn&join=phamvichungchihanhnghe&join=phamvihanhnghebosung&join=dienthianhvans&join=nhanvienbangcaps&join=nhanvienbangcaps.loaibangcap&join=nhanvienhopdongs.loaihopdong${params}`)
      .then((response) => response.json())
      .then((data) => ({
        data: data.data,
        count: data.count,
        total: data.total,
        pageCount:data.pageCount
      }))
      .catch(() => { throw new Error('Data Loading Error'); });
  },
});
const notesEditorOptions = { height: 100 };
function NewStaff() {
  const [autoExpandAll,setautoExpandAll]= useState(true);
  const [focusedRowKey,setFocusRowKey]= useState(1);
  const [focusedRowIndex,setFocusRowIndex]= useState(1);
  const [autoNavigateToFocusedRow,setautoNavigateToFocusedRow]= useState(true);


  const onFocusedRowChanged= (e) => {
    setFocusRowIndex(e.component.option('focusedRowIndex'))
    setFocusRowKey(e.component.option('focusedRowKey'))

  }

  const dataGrid = useRef(null);
  const collapseAllGroups = () => {
      dataGrid.current.instance.collapseAll();
  };
  const expandAllGroups = () => {
      dataGrid.current.instance.expandAll();
  };
  return (
  <div>  
    <button onClick={expandAllGroups}>Mở</button>
    <button onClick={collapseAllGroups}>Đóng</button>
  <DataGrid className='dgr-staff'
    dataSource={store}
    columnWidth={160}
    width="100%"
    height="500"
    showBorders={true}
    allowColumnReordering={true}
    focusedRowEnabled={true}
    focusedRowKey={focusedRowKey}
    focusedRowIndex={focusedRowIndex}
    autoNavigateToFocusedRow={autoNavigateToFocusedRow}
    onFocusedRowChanged={onFocusedRowChanged} 
    keyExpr='id'    ref={dataGrid}
    >
    <Editing
          mode="popup"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}>
          <Popup title="Employee Info" showTitle={true} width={700} height={525} />
          <Form>
            <Item itemType="group" colCount={2} colSpan={2}>
              <Item dataField="FirstName" />
              <Item dataField="LastName" />
              <Item dataField="Prefix" />
              <Item dataField="BirthDate" />
              <Item dataField="Position" />
              <Item dataField="HireDate" />
              <Item
                dataField="Notes"
                editorType="dxTextArea"
                colSpan={2}
                editorOptions={notesEditorOptions} />
            </Item>

            <Item itemType="group" caption="Home Address" colCount={2} colSpan={2}>
              <Item dataField="StateID" />
              <Item dataField="Address" />
            </Item>
          </Form>
    </Editing>
    <Column dataField="holotNhanVien"  dataType="string"  caption="Họ lót" />
    <Column dataField="tennhanvien" dataType="string"  caption="Tên nhân viên" />
    <Column dataField="nickname" dataType="string"  caption="Nick Name"/>
    <Column dataField="dmdonvi.tendonvi" dataType="string"  caption="Tên đơn vị"/>
    <Column dataField="dmbophan.tenbophan" dataType="string" caption="Tên bộ phận" />
    <Column dataField="dmphongban.tenphongban" dataType="string" caption="Phòng ban" groupIndex={0}  />
    <Column dataField="dmloaikhoi.tenloaikhoi" dataType="string" caption="Khối"/>
    <Column dataField="dmtrinhdo.tentrinhdo" dataType="string"  caption="Trình độ" />
    <Column dataField="gioitinh" dataType="string"  caption="Giới tính" cellRender={cellRenderGioiTinh} />
    <Column dataField="ngaysinh" dataType="date"  caption="Ngày sinh"/>
    <Column dataField="chucvu.tenchucvu" dataType="string" caption="Chức vụ"/>
    <Column dataField="chucdanh.tenchucdanh" dataType="string"  caption="Chuyên môn"  />
    <Column dataField="chuyenkhoa.tenchuyenkhoa" dataType="string" caption="Chuyên khoa" />
    <Column dataField="kinhnghiem" dataType="date" caption="Kinh nghiệm"/>
    <Column dataField="ngayvaolam" dataType="date" caption="Ngày vào làm" />
    <Column dataField="nhanvienhopdongs" dataType="string"  caption="Hợp đồng" cellRender={cellRenderHopDong} />
    <Column dataField="id" dataType="number"  caption="ID"/>
    <Column dataField="ngaybatdauHopDong" dataType="date"  caption="Ngày bắt đầu"/>
    <Column dataField="ngayketthucHopDong" dataType="date" caption="Ngày kết thúc" />
    <Column dataField="thoihanhopdong.tenthoihanhopdong" dataType="string" caption="Thời hạn hợp đồng"/>
    <Column dataField="nhanvienbangcaps" width="200"  caption="Bằng cấp" cellRender={cellRenderBangCap} />
    <Column dataField="diachi" width="200" caption="Địa chỉ" dataType="string" />
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
  
    <Scrolling rowRenderingMode="virtual" mode="virtual" columnRenderingMode="infinite" />

    <FilterRow visible={true} />
    <Grouping autoExpandAll={autoExpandAll} />
    <GroupPanel visible={true} />
    <Summary>
          <GroupItem
            column="Id"
            summaryType="count" 
            displayFormat="Số lượng: {0}"
           />
        </Summary>
  </DataGrid>

  </div>
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
       <li key={item?.id}>
         {item?.loaihopdong?.tenloaihopdong}
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
