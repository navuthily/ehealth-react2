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
  useRef,
  useState,
  useContext,
} from "react";
import RichEditComponent from "./richtext-editor";
import options from "./data/options";
import "./template-contract.scss";
import { CRUDMauHopDong } from "api";
import { ThemContext } from "./Context";
function TemplateContract() {
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
      return await CRUDMauHopDong(method);
    }

    if (data) {
      return await CRUDMauHopDong(method, data);
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
    options,
  };
  return (
    <ThemContext.Provider value={values}>
      <div className="main">
        <div className="selecbox-lf"><Grid /></div>
          
        <div className="richeditor">
          <RichEditComponent />
        </div>
      </div>
    </ThemContext.Provider>
  );
}

const Grid = () => {
  const { store, onSelectionChanged, name } = useContext(ThemContext);
  const renderCount = useRef(0);
  return (
    <DataGrid
      className={`dgr-contract ${renderCount.current.toString()}}`}
      dataSource={store}
      showBorders={true}
      allowColumnReordering={true}
      focusedRowEnabled={true}
      keyExpr="id"
      height={300}
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
        dataField="loaitemplate"
        dataType="string"
        caption="Mẫu hợp đồng"
      />
      <Selection mode="single" />

      <Scrolling
        rowRenderingMode="virtual"
        mode="virtual"
        columnRenderingMode="virtual"
      />
      <FilterRow visible={true} />
    </DataGrid>
  );
};

export default TemplateContract;
