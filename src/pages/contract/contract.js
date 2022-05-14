import DataGrid, {
  Column,
  Editing,
  FilterRow,
  Popup,
  Scrolling,
  Selection,
  Lookup,
} from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.material.blue.light.compact.css";
import { useParams } from "react-router-dom";
import React, {
  useCallback,
  useMemo,
  useState,
  useContext,
  useEffect,
} from "react";
import RichTextContract from "./richtext-editor";
import options from "../template-contract/data/options";
import { CRUDHopdongNhanvien, CRUDMauHopDong } from "api";
import { ThemContext } from "../template-contract/Context";
import SelectBox from "devextreme-react/select-box";
import api from "api/methods";
import "./contract.scss"
function Contract() {
  const [templateContract, setTemplateContract] = useState(null);
  const [hopdong, sethopdong] = useState(null);
  const [name, setName] = useState(null);
  const [loaihopdong,setLoaihopdong]= useState([])

  useEffect(() => {
    api("dmloaihopdong", null, "GET", null).then((data) => {
      setLoaihopdong(data);
    });
  }, []);
  function isNotEmpty(value) {
    return value !== undefined && value !== null && value !== "";
  }
  function handleErrors(response) {
    if (!response.ok) throw Error(response.statusText);
    return response;
  }
  let { id: idNhanvien } = useParams() || {};
  const sendRequest = async (method = "GET", data = {}) => {
    if (method === "GET") {
      return await CRUDHopdongNhanvien(method, {idNhanvien});
    }
    
    if (data) {
      return await CRUDHopdongNhanvien(method, data);
    }
  };

  const store = useMemo(() => {
    return new CustomStore({
      key: "id",
      load: () => sendRequest(),
      insert: (values) =>
        sendRequest("POST", {
          values: JSON.stringify({...values,nhanvienId:idNhanvien}),
        }),

      update: (key, values) =>
        sendRequest("PATCH", {
          key,
          values:JSON.stringify(values),
        }),

      remove: (key) =>
        sendRequest("DELETE", {
          key,
        }),
    });
  }, [name]);

  const [templates, setTemplates] = useState(
    new CustomStore({
      key: "id",
      load: () => sendRequestTemplateContract(),

      insert: (values) =>
        sendRequestTemplateContract("POST", {
          values: JSON.stringify(values),
        }),

      update: (key, values) =>
        sendRequestTemplateContract("PATCH", {
          key,
          values: JSON.stringify(values),
        }),

      remove: (key) =>
        sendRequestTemplateContract("DELETE", {
          key,
        }),
    })
  );
  const sendRequestTemplateContract = async (method = "GET", data = {}) => {
    if (method === "GET") {
      return await CRUDMauHopDong(method);
    }

    if (data) {
      return await CRUDMauHopDong(method, data);
    }
  };

  const onSelectionChanged = useCallback(({ selectedRowsData }) => {
    const data = selectedRowsData[0];
    sethopdong(data);
  }, []);
  const values = {
    hopdong,
    store,
    onSelectionChanged,
    name,
    setName,
    options,
    templateContract,
    idNhanvien,loaihopdong
  };
  function handleSelectChanged(e) {
    setTemplateContract(e.selectedItem);
  }
  return (
    <ThemContext.Provider value={values}>
      <div className="main">
        <div className="selecbox-lf">
          <Grid />
          <SelectBox
            id="custom-templates"
            dataSource={templates}
            displayExpr="loaitemplate"
            valueExpr="id"
            onSelectionChanged={handleSelectChanged}
          />
        </div>
        <div className="richeditor">
          <RichTextContract />
        </div>
      </div>
    </ThemContext.Provider>
  );
}

const Grid = () => {
  const { store, onSelectionChanged, name,loaihopdong } = useContext(ThemContext);
  return (
    <>
      <DataGrid
        className={`dgr-contract`}
        dataSource={store}
        height="300"
        showBorders={true}
        allowColumnReordering={true}
        focusedRowEnabled={true}
        keyExpr="id"
        onSelectionChanged={onSelectionChanged}
      >
        <Editing
          mode="popup"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
        >
          <Popup title="Hợp đồng" showTitle={true} width={700} height={525} />
        </Editing>

        <Column dataField="loaihopdongId" caption="Hợp đồng">
          <Lookup
            dataSource={loaihopdong}
            valueExpr="id"
            displayExpr="tenloaihopdong"
          />
        </Column>
        <Column
          dataField="ngaybatdau"
          dataType="date"
          caption="Ngày bắt đầu"
          visible={false}
        />
        <Column
          dataField="ngayketthuc"
          dataType="date"
          caption="Ngày kết thúc"
          visible={false}
        />
        <Column
          dataField="ghichu"
          dataType="string"
          caption="Ghi chú"
          visible={false}
        />
        <Selection mode="single" />

        <Scrolling
          rowRenderingMode="virtual"
          mode="virtual"
          columnRenderingMode="virtual"
        />
        <FilterRow visible={true} />
      </DataGrid>
    </>
  );
};

export default Contract;
