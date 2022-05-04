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
import CheckBox from "devextreme-react/check-box";
import "./new-staff.scss";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.material.blue.light.compact.css";
import CustomStore from "devextreme/data/custom_store";
import "whatwg-fetch";
import "devextreme-intl";
import Contract from "pages/contract/contract";
import { useHistory } from "react-router-dom";
import { getApi } from "../../callApi";
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
    getApi("dmphongban").then((data) => {
      setPhongban(data?.data);
    });
    getApi("dmdonvi").then((data) => {
      setDonvi(data?.data);
    });
    getApi("dmbophan").then((data) => {
      setBophan(data?.data);
    });
    getApi("dmloaikhoi").then((data) => {
      setKhoi(data?.data);
    });
    //
    getApi("dmtrinhdo").then((data) => {
      setTrinhdo(data?.data);
    });
    getApi("chucdanh").then((data) => {
      setChucdanh(data?.data);
    });
    getApi("chucvu").then((data) => {
      setChucvu(data?.data);
    });
    getApi("chuyenkhoa").then((data) => {
      setChuyenkhoa(data?.data);
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
    dataGrid.current.instance.editRow(dataGrid.current.instance.getRowIndexByKey(focusedRowKey));

  }
  function onContentReady(e) {
    e.component.columnOption("command:edit", "visible", false);
  }
  function handleContract() {
    //setvisible = true
    if (focusedRowKey) {
      history.push(`/staff/${focusedRowKey}`);
    }
  }
  return (
    <div>
      <Button
        width={80}
        text="Mở"
        type="normal"
        stylingMode="contained"
        onClick={expandAllGroups}
      />
      <Button
        width={80}
        text="Đóng"
        type="normal"
        stylingMode="contained"
        onClick={collapseAllGroups}
      />
      <Button
        width={80}
        text="Sửa"
        type="normal"
        stylingMode="contained"
        onClick={editEmployee}
      />
      <Button
        width={80}
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

        <Column dataField="phongbanId" caption="Phòng ban" width={125} groupIndex={0}
        >
          <Lookup
            dataSource={phongban}
            valueExpr="id"
            displayExpr="tenphongban"
            
          />
        </Column>

        <Column dataField="donviId" caption="Đơn vị" width={125}>
          <Lookup dataSource={donvi} valueExpr="id" displayExpr="tendonvi" />
        </Column>

        <Column dataField="bophanId" caption="Bộ phận" width={125}>
          <Lookup dataSource={bophan} valueExpr="id" displayExpr="tenbophan" />
        </Column>
        <Column dataField="loaikhoiId" caption="Loại khối" width={125}>
          <Lookup dataSource={khoi} valueExpr="id" displayExpr="tenloaikhoi" />
        </Column>
        <Column dataField="trinhdoId" caption="Trình độ" width={125}>
          <Lookup
            dataSource={trinhdo}
            valueExpr="id"
            displayExpr="tentrinhdo"
          />
        </Column>
        <Column
          dataField="gioitinh"
          dataType="string"
          caption="Giới tính"
          cellRender={cellRenderGioiTinh}
        />
        <Column dataField="ngaysinh" dataType="date" caption="Ngày sinh" />

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
        <Column dataField="chuyenkhoaId" caption="Chuyên khoa" width={125}>
          <Lookup
            dataSource={chuyenkhoa}
            valueExpr="id"
            displayExpr="tenchuyenkhoa"
          />
        </Column>
        <Column dataField="kinhnghiem" dataType="date" caption="Kinh nghiệm" />
        <Column dataField="ngayvaolam" dataType="date" caption="Ngày vào làm" />
        <Column
          dataField="nhanvienhopdongs"
          dataType="string"
          caption="Hợp đồng"
          cellRender={cellRenderHopDong}
        />
        <Column
          dataField="ngaybatdauHopDong"
          dataType="date"
          caption="Ngày bắt đầu"
          visible={false}
        />
        <Column
          dataField="ngayketthucHopDong"
          dataType="date"
          caption="Ngày kết thúc"
          visible={false}
        />
        <Column
          dataField="nhanvienbangcaps"
          width="200"
          caption="Bằng cấp"
          cellRender={cellRenderBangCap}
        />
        <Column
          dataField="diachi"
          width="200"
          caption="Địa chỉ"
          dataType="string"
        />
        <Column dataField="mobile" dataType="string" caption="Số điện thoại" />
        <Column
          dataField="homePhone"
          dataType="string"
          caption="Số điện thoại 2"
          visible={false}
        />
        <Column dataField="cmnd" dataType="string" caption="CMND" />
        <Column dataField="email" dataType="string" caption="Emal" />
        <Column
          dataField="masothuecanhan"
          dataType="string"
          caption="Mã số thuế cá nhân"
        />
        <Column dataField="sobaohiem" dataType="string" caption="Số bảo hiểm" />
        <Column dataField="ghichu" dataType="string" caption="Ghi chú" />
        <Column dataField="" caption="Lương SP" dataType="string" />
        <Column
          dataField="danghiviec"
          dataType="string"
          caption="Đã nghỉ viêc"
          cellRender={cellRenderCheckBox}
        />
        <Column
          dataField="isLichBacSy"
          dataType="string"
          caption="Là bác sĩ"
          cellRender={cellRenderCheckBox}
        />
        <Column
          dataField="isCongTacVienBenNgoai"
          dataType="string"
          caption="Là cộng tác viên"
          cellRender={cellRenderCheckBox}
        />
        <Column
          dataField="ngaynghiviec"
          dataType="string"
          caption="Ngày nghỉ việc"
        />
        <Column
          dataField="soChungChiHanhNghe"
          dataType="string"
          caption="Số CCHN"
        />
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

function cellRenderBangCap(data) {
  return (
    <ul>
      {data?.value?.map((item) => (
        <li key={item.id}>{item.loaibangcap.tenloaibangcap}</li>
      ))}
    </ul>
  );
}
function cellRenderHopDong(data) {
  return (
    <ul>
      {data?.value?.map((item) => (
        <li key={item?.id}>{item?.loaihopdong?.tenloaihopdong}</li>
      ))}
    </ul>
  );
}
function cellRenderCheckBox(data) {
  return <CheckBox value={data.value} iconSize={30} />;
}
function cellRenderGioiTinh(data) {
  return <div>{data.value === true ? "nam" : "nữ"}</div>;
}
