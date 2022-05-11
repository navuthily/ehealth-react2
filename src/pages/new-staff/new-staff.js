import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import DataGrid, {
  Column,
  Grouping,
  Selection,
  FilterRow,
  Scrolling,
  GroupPanel,
  Summary,
  GroupItem,
  Editing,
  Popup,
  Paging,
  Form,
  Lookup,
} from "devextreme-react/data-grid";
import "./new-staff.scss";
import api from "api/methods";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.material.blue.light.compact.css";
import CustomStore from "devextreme/data/custom_store";
import "whatwg-fetch";
import "devextreme-intl";
import Contract from "pages/contract/contract";
import { useHistory } from "react-router-dom";
import { CRUDNhanvien } from "api";
import { Button } from "devextreme-react/button";
function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}
function handleErrors(response) {
  if (!response.ok) throw Error(response.statusText);
  return response;
}

// const phongban = JSON.parse(localStorage.getItem("phongban"));
function NewStaff() {
  let history = useHistory();
  const [phongban, setPhongban] = useState(null);
  const [donvi, setDonvi] = useState(null);
  const [bophan, setBophan] = useState(null);
  const [khoi, setKhoi] = useState(null);
  const [trinhdo, setTrinhdo] = useState(null);
  const [chucvu, setChucvu] = useState(null);
  const [chucdanh, setChucdanh] = useState(null);
  const [chuyenkhoa, setChuyenkhoa] = useState(null);
  const [loaitinhluong, setLoaitinhluong] = useState(null);
  const [autoExpandAll, setautoExpandAll] = useState(true);
  const [focusedRowKey, setFocusRowKey] = useState(0);
  const [focusedRowIndex, setFocusRowIndex] = useState(0);
  const [autoNavigateToFocusedRow, setautoNavigateToFocusedRow] =
    useState(true);

  const [store, setStore] = useState(
    new CustomStore({
      key: "id",
      load: () => sendRequest(),

      insert: (values) =>
        sendRequest("POST", {
          values: JSON.stringify(values),
        }),

      update: (key, values) => {
        console.log("key", key, values);
        sendRequest("PATCH", {
          key,
          values: JSON.stringify(values),
        });
      },
      remove: (key) =>
        sendRequest("DELETE", {
          key,
        }),
    })
  );

  useEffect(() => {

const get='GET';
    
    api("dmphongban",null,get,null).then((data) => {
      console.log(data,'hihi/')
      setPhongban(data);
    });
    api("dmdonvi",null,get,null).then((data) => {
      setDonvi(data);
    });
    api("dmbophan",null,get,null).then((data) => {
      setBophan(data);
    });
    api("dmloaikhoi",null,get,null).then((data) => {
      setKhoi(data);
    });
    //
    api("dmtrinhdo",null,get,null).then((data) => {
      setTrinhdo(data);
    });
    api("chucdanh",null,get,null).then((data) => {
      setChucdanh(data);
    });
    api("chucvu",null,get,null).then((data) => {
      setChucvu(data);
    });
    api("chuyenkhoa",null,get,null).then((data) => {
      setChuyenkhoa(data);
    });
    api("dmloaitinhluong",null,get,null).then((data) => {
      setLoaitinhluong(data);
    });
  }, []);

  const sendRequest = async (method = "GET", data = {}) => {
    if (method === "GET") {
      return await CRUDNhanvien(method);
    }

    if (data) {
      return await CRUDNhanvien(method, data);
    }
  };
  const onFocusedRowChanged = (e) => {
    setFocusRowIndex(e.component.option("focusedRowIndex"));
    setFocusRowKey(e.component.option("focusedRowKey"));
  };
  const dataGrid = useRef(null);
  const collapseAllGroups = () => {
    dataGrid.current.instance.collapseAll();
  };
  const expandAllGroups = () => {
    dataGrid.current.instance.expandAll();
  };

  function editEmployee() {
    dataGrid.current.instance.editRow(
      dataGrid.current.instance.getRowIndexByKey(focusedRowKey)
    );
  }
  function onContentReady(e) {
    e.component.columnOption("command:edit", "visible", false);
  }
  function handleContract() {
    //setvisible = true
    if (focusedRowKey) {
      history.push(`/nhan-vien/${focusedRowKey}`);
    }
  }
  return (
    <div>
      <Button
        // width={80}
        text="Mở"
        type="normal"
        stylingMode="contained"
        onClick={expandAllGroups}
      />
      <Button
        // width={80}
        text="Đóng"
        type="normal"
        stylingMode="contained"
        onClick={collapseAllGroups}
      />
      <Button
        // width={80}
        text="Sửa"
        type="normal"
        stylingMode="contained"
        onClick={editEmployee}
      />
      <Button
        // width={100}
        text="Hợp đồng"
        type="normal"
        stylingMode="contained"
        onClick={handleContract}
      />
      <DataGrid
        onContentReady={onContentReady}
        className="dgr-staff"
        dataSource={store}
        columnWidth={100}
        width="100%"
        height="400"
        showBorders={true}
        allowColumnReordering={true}
        focusedRowEnabled={true}
        focusedRowKey={focusedRowKey}
        focusedRowIndex={focusedRowIndex}
        autoNavigateToFocusedRow={autoNavigateToFocusedRow}
        onFocusedRowChanged={onFocusedRowChanged}
        keyExpr="id"
        ref={dataGrid}
      >
        <Editing
          mode="popup"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
        >
          <Popup title="Nhân viên" showTitle={true} width={700} height={525} />
        </Editing>
        <Column dataField="holotNhanVien" dataType="string" caption="Họ lót" />
        <Column
          dataField="tennhanvien"
          dataType="string"
          caption="Tên nhân viên"
        />
        <Column dataField="nickname" dataType="string" caption="Nick Name" />
        <Column dataField="mobile" dataType="string" caption="Số điện thoại" />
        <Column
          dataField="gioitinh"
          dataType="string"
          caption="Giới tính"
          cellRender={cellRenderGioiTinh}
        />
        <Column
          dataField="quoctich"
          width="200"
          caption="Quốc tịch"
          dataType="string"
          visible={false}
        />
        <Column dataField="cmnd" dataType="string" caption="CMND"  visible={false}/>
        <Column
          dataField="ngaycapcmnd"
          dataType="date"
          caption="Ngày cấp CMND" visible={false}
        />
        <Column
          dataField="noicapcmnd"
          dataType="string"
          caption="Nơi cấp CMND" visible={false}
        />
        <Column dataField="hochieu" dataType="string" caption="Hộ chiếu"  visible={false}/>
        <Column
          dataField="diachi"
          width="200"
          caption="Địa chỉ"
          dataType="string"
        />
        <Column dataField="email" dataType="string" caption="Emal"  allowEditing={false}/>
        <Column dataField="ngaysinh" dataType="date" caption="Ngày sinh" />
        <Column dataField="ngayvaolam" dataType="date" caption="Ngày vào làm" visible={false} />
        <Column
          dataField="ngaynghiviec"
          dataType="string"
          caption="Ngày nghỉ việc" visible={false}
        />
        <Column
          dataField="masothuecanhan"
          dataType="string"
          caption="Mã số thuế cá nhân" visible={false}
          
        />
        <Column dataField="sobaohiem" dataType="string" caption="Số bảo hiểm"  visible={false}/>
        <Column
          dataField="phongbanId"
          caption="Phòng ban"
          width={125}
          groupIndex={0}
        >
          <Lookup
            dataSource={phongban}
            valueExpr="id"
            displayExpr="tenphongban"
          />
        </Column>
        <Column dataField="trinhdoId" caption="Trình độ" width={125}>
          <Lookup
            dataSource={trinhdo}
            valueExpr="id"
            displayExpr="tentrinhdo" visible={false}
          />
        </Column>
        <Column dataField="donviId" caption="Đơn vị" width={125}>
          <Lookup dataSource={donvi} valueExpr="id" displayExpr="tendonvi" />
        </Column>
        <Column dataField="bophanId" caption="Bộ phận" width={125}>
          <Lookup dataSource={bophan} valueExpr="id" displayExpr="tenbophan" />
        </Column>
        <Column dataField="chucvuId" caption="Chức vụ" width={125}>
          <Lookup dataSource={chucvu} valueExpr="id" displayExpr="tenchucvu" />
        </Column>
        <Column dataField="chucdanhId" caption="Chức danh" width={125}>
          <Lookup
            dataSource={chucdanh}
            valueExpr="id"
            displayExpr="tenchucdanh"
          />
        </Column>


        <Column dataField="loaitinhluongId" caption="Loại tính lương" width={125}>
          <Lookup
            dataSource={loaitinhluong}
            valueExpr="id"
            displayExpr="tenloaitinhluong"
          />
        </Column>
        <Column dataField="chuyenkhoaId" caption="Chuyên khoa" width={125}>
          <Lookup
            dataSource={chuyenkhoa}
            valueExpr="id"
            displayExpr="tenchuyenkhoa"
          />
        </Column>
        <Column dataField="loaikhoiId" caption="Loại khối" width={125}>
          <Lookup dataSource={khoi} valueExpr="id" displayExpr="tenloaikhoi" />
        </Column>
 
        <Selection mode="single" />
        <Scrolling
          rowRenderingMode="virtual"
          mode="virtual"
          columnRenderingMode="virtual"
        />
        <FilterRow visible={true} />
        <Grouping autoExpandAll={autoExpandAll} />
        <GroupPanel visible={true} />
        <Summary>
          <GroupItem
            column="id"
            summaryType="count"
            displayFormat="Số lượng:{0}"
          />
        </Summary>
      </DataGrid>
    </div>
  );
}
export default NewStaff;


function cellRenderGioiTinh(data) {
  return <div>{data.value === true ? "nam" : "nữ"}</div>;
}
