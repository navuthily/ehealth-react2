import DataGrid, {
  Column,
  Editing,
  FilterRow,
  Popup,
  Scrolling,
  Selection,
} from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.material.blue.light.compact.css";
import React, {
  useCallback,
  useMemo,
  useState,
} from "react";
import { CRUDLoaitinhluong } from "api";
function LoaiTinhLuong() {
  const [id, setId] = useState(0);
  const [hopdong, sethopdong] = useState(null);

  const [name, setName] = useState(null);
  function isNotEmpty(value) {
    return value !== undefined && value !== null && value !== "";
  }
  function handleErrors(response) {
    if (!response.ok) throw Error(response.statusText);
    return response;
  }
  const sendRequest = async (method = "GET", data = {}) => {
    if (method === "GET") {
      return await CRUDLoaitinhluong(method);
    }

    if (data) {
      return await CRUDLoaitinhluong(method, data);
    }
  };
  const store = useMemo(() => {
    return new CustomStore({
      key: "id",
      load: () => sendRequest(),

      insert: (values) =>
        sendRequest("POST", {
          values: JSON.stringify(values),
        }),

      update: (key, values) =>
        sendRequest("PATCH", {
          key,
          values: JSON.stringify(values),
        }),

      remove: (key) =>
        sendRequest("DELETE", {
          key,
        }),
    });
  }, [name]);

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
    id,
    setId,
  };
  return (
      <div className="main">
     <DataGrid
      className={`dgr-contract`}
      dataSource={store}
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
        <Popup title="Loại tính lương" showTitle={true} width={700} height={525} />
      </Editing>
      <Column
        dataField="tenloaitinhluong"
        dataType="string"
        caption="Tên loại tính lương"
      />
      <Selection mode="single" />

      <Scrolling
        rowRenderingMode="virtual"
        mode="virtual"
        columnRenderingMode="virtual"
      />
      <FilterRow visible={true} />
    </DataGrid>

      </div>
  );
}



export default LoaiTinhLuong;
