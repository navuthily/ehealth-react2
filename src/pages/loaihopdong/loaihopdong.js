import DataGrid, {
  Column,
  Editing,
  FilterRow,
  Popup,
  Scrolling,
  Selection,
} from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";

import "devextreme/dist/css/dx.light.compact.css";
import React, {
  useCallback,
  useMemo,
  useState,
} from "react";
import { CRUDLoaiHopDong } from "api";
function TypeContract() {
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
      return await CRUDLoaiHopDong(method);
    }

    if (data) {
      return await CRUDLoaiHopDong(method, data);
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
      <div className="main-2">
     <DataGrid
      className={`dgr-contract`}
      dataSource={store}
      showBorders={true}
      allowColumnReordering={true}
      focusedRowEnabled={true}
      keyExpr="id"
      height="400"
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
      <Column
        dataField="tenloaihopdong"
        dataType="string"
        caption="Tên loại hợp đồng"
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



export default TypeContract;
