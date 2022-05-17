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
  ColumnFixing,
  RequiredRule,
  EmailRule,
} from "devextreme-react/data-grid";
import "./new-staff.scss";
import api from "api/methods";
import CustomStore from "devextreme/data/custom_store";
import "whatwg-fetch";
import "devextreme-intl";
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

function NewStaff() { 
  let history = useHistory();
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
  const [boxData, setBoxData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [store, setStore] = useState(
    new CustomStore({
      key: "id",
      load: () => sendRequest(),

      insert: (values) =>
        sendRequest("POST", {
          values: JSON.stringify(values),
        }),

      update: (key, values) => {
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
    setBoxData([
      { gt: true, text: "Nữ" },
      { gt: false, text: "Nam" },
    ]);
    setRoleData([{ role: "ADMIN" }, { role: "USER" }]);
    const get = "GET";

    api("dmbophan", null, get, null).then((data) => {
      setBophan(data);
    });
    api("dmloaikhoi", null, get, null).then((data) => {
      setKhoi(data);
    });
    api("dmtrinhdo", null, get, null).then((data) => {
      setTrinhdo(data);
    });
    api("chucdanh", null, get, null).then((data) => {
      setChucdanh(data);
    });
    api("chucvu", null, get, null).then((data) => {
      setChucvu(data);
    });
    api("chuyenkhoa", null, get, null).then((data) => {
      setChuyenkhoa(data);
    });
    api("dmloaitinhluong", null, get, null).then((data) => {
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

  function onContentReady(e) {
    e.component.columnOption("command:edit", "visible", true);
    e.component.columnOption("command:edit", "fixed", true);
  }
  function onEditorPreparing(e) {
    if (!e?.row?.isNewRow && e.caption === "Email") {
      e.editorOptions.readOnly = true;
    } 
  }
  function handleContract() {
    if (focusedRowKey) {
      history.push(`/nhan-vien/${focusedRowKey}`);
    }
  }
  return (
    <div className="main-3">
      <div className="group-button">
        <Button
          className="btnStyle"
          icon="expand"
          type="success"
          onClick={expandAllGroups}
        />
        <Button
          className="btnStyle"
          icon="collapse"
          type="success"
          onClick={collapseAllGroups}
        />
        <Button
          className="btnStyle"
          icon="file"
          type="success"
          onClick={handleContract}
        />
      </div>
      <DataGrid
        onContentReady={onContentReady}
        onEditorPreparing={onEditorPreparing}
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
        <ColumnFixing enabled={true} />

        <Column
          dataField="holotNhanVien"
          dataType="string"
          caption="Họ lót"
          fixed={true}
          width="120"
        />
        <Column
          dataField="tennhanvien"
          dataType="string"
          caption="Tên nhân viên"
          fixed={true}
          width="110"
        />
        <Column dataField="nickname" dataType="string" caption="Nick Name" />
        <Column dataField="mobile" dataType="string" caption="Số điện thoại" />
        <Column dataField="gioitinh" caption="Giới tính">
          <Lookup dataSource={boxData} displayExpr="text" valueExpr="gt" />
        </Column>
        <Column
          dataField="quoctich"
          width="200"
          caption="Quốc tịch"
          dataType="string"
          visible={false}
        />
        <Column
          dataField="cmnd"
          dataType="string"
          caption="CMND"
          visible={false}
        />
        <Column
          dataField="ngaycapcmnd"
          dataType="date"
          caption="Ngày cấp CMND"
          visible={false}
        />
        <Column
          dataField="noicapcmnd"
          dataType="string"
          caption="Nơi cấp CMND"
          visible={false}
        />
        <Column
          dataField="hochieu"
          dataType="string"
          caption="Hộ chiếu"
          visible={false}
        />
        <Column
          dataField="diachi"
          width="200"
          caption="Địa chỉ"
          dataType="string"
        />
        <Column
          dataField="email"
          width="200"
          dataType="string"
          caption="Email"
        >
          <RequiredRule />
          <EmailRule />
        </Column>
        <Column dataField="ngaysinh" dataType="date" caption="Ngày sinh" width="100" />
        <Column
          dataField="ngayvaolam"
          dataType="date"
          caption="Ngày vào làm"
          visible={false}
        />
        <Column
          dataField="ngaynghiviec"
          dataType="date"
          caption="Ngày nghỉ việc"
          visible={false}
        />
        <Column
          dataField="masothuecanhan"
          dataType="string"
          caption="Mã số thuế cá nhân"
          visible={false}
        />
        <Column
          dataField="sobaohiem"
          dataType="string"
          caption="Số bảo hiểm"
          visible={false}
        />
        <Column
          dataField="dmbophan.phongban.tenphongban"
          caption="Phòng ban"
          width={125}
          groupIndex={0}
          allowEditing={false}
        ></Column>

        <Column
          dataField="trinhdoId"
          caption="Trình độ"
          width={125}
          visible={false}
        >
          <Lookup
            dataSource={trinhdo}
            valueExpr="id"
            displayExpr="tentrinhdo"
          />
        </Column>

        <Column dataField="bophanId" caption="Bộ phận" width={125}>
          <Lookup dataSource={bophan} valueExpr="id" displayExpr="tenbophan" />
        </Column>
        <Column dataField="chuyenkhoaId" caption="Chuyên khoa" width={125}>
          <Lookup dataSource={chuyenkhoa} valueExpr="id" displayExpr="tenchuyenkhoa" />
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
        <Column
          dataField="loaitinhluongId"
          caption="Loại tính lương"
          width={125}
        >
          <Lookup
            dataSource={loaitinhluong}
            valueExpr="id"
            displayExpr="tenloaitinhluong"
          />
        </Column>
 
        <Column dataField="loaikhoiId" caption="Loại khối" width={125}>
          <Lookup dataSource={khoi} valueExpr="id" displayExpr="tenloaikhoi" />
        </Column>
        <Column
          dataField="role"
          dataType="string"
          caption="Role"
          visible={false}
        >
          <Lookup dataSource={roleData} valueExpr="role" displayExpr="role" />
        </Column>
        <Selection mode="single" />
        <Scrolling
          rowRenderingMode="virtual"
          mode="virtual"
          columnRenderingMode="infinite"
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
