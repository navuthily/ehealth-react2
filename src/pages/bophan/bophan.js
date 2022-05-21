import DataGrid, {
  Column,Lookup,
  Editing,
  FilterRow,
  Popup,
  Scrolling,
  Selection,
} from "devextreme-react/data-grid";
import api from "api/methods";
import CustomStore from "devextreme/data/custom_store";

import "devextreme/dist/css/dx.light.compact.css";
import React, { useCallback, useMemo, useState,useEffect } from "react";
import { CRUDBophan } from "api";
import '../style.scss'
function BoPhan() {
  const [id, setId] = useState(0);
  const [hopdong, sethopdong] = useState(null);
  const [phongban, setPhongban] = useState(null);
  const [name, setName] = useState(null);
  function isNotEmpty(value) {
    return value !== undefined && value !== null && value !== "";
  }
  function handleErrors(response) {
    if (!response.ok) throw Error(response.statusText);
    return response;
  }

  useEffect(() => {

    const get='GET';
        
        api("dmphongban",null,get,null).then((data) => {
          setPhongban(data);
        });
      }, []);
    

  const sendRequest = async (method = "GET", data = {}) => {
    if (method === "GET") {
      return await CRUDBophan(method);
    }

    if (data) {
      return await CRUDBophan(method, data);
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
          <Popup title="Bộ phận" showTitle={true} width={700} height={525} />
        </Editing>
        <Column dataField="tenbophan" dataType="string" caption="Tên bộ phận"/>
        <Column 
          dataField="phongbanId"
          caption="Phòng ban"
        >
          <Lookup
            dataSource={phongban}
            valueExpr="id"
            displayExpr="tenphongban"
          />
        </Column>
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

export default BoPhan;
