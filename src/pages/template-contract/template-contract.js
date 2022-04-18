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
  useRef,
  useState,
  useContext,
} from "react";
import RichEditComponent from "./richtext-editor";
import options from "./data/options";
import "./template-contract.scss";

import {ThemContext} from './Context'
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

  const store = useMemo(() => {
    return new CustomStore({
      key: "id",
      load(loadOptions) {
        let params = "?";
        ["page"].forEach((i) => {
          if (i in loadOptions && isNotEmpty(loadOptions[i])) {
            params += `${i}=${JSON.stringify(loadOptions[i])}&`;
          }
        });
        params = params.slice(0, -1);
        return fetch("http://localhost:7000/templatehd")
          .then((response) => response.json())
          .then((data) => ({
            data: data.data,
            count: data.count,
            total: data.total,
            pageCount: data.pageCount,
          }))
          .catch(() => {
            throw new Error("Data Loading Error");
          });
      },
      onInserting: function (values, key) {
        // Your code goes here
      },
      insert: (values) => {
        const data = {
          loaitemplate: values.loaitemplate,
          createdBy: 1,
          createdAt: new Date().toISOString(),
        };
        return fetch("http://localhost:7000/templatehd", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }).then(handleErrors);
      },
      update: (key, values) => {
        const data = {
          loaitemplate: values.loaitemplate,
          updatedBy: 1,
          updatedAt: new Date().toISOString(),
        };
        return fetch(
          `http://localhost:7000/templatehd/${encodeURIComponent(key)}`,
          {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then(handleErrors);
      },
      remove: (key) => {
        return fetch(
          `http://localhost:7000/templatehd/${encodeURIComponent(key)}`,
          {
            method: "DELETE",
          }
        ).then(handleErrors);
      },
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
    setId,options
  };
  return (
    <ThemContext.Provider value={values}>
      <div className="main">
        <Grid />
        <div className="richeditor">
          <RichEditComponent  />
        </div>
      </div>
    </ThemContext.Provider>
  );
}

const Grid = () => {
  const { store, onSelectionChanged, name } = useContext(ThemContext);
  const renderCount = useRef(0);
  console.log(renderCount.current++, "grid");
  return (
    <DataGrid
      className={`dgr-contract ${renderCount.current.toString()}}`}
      dataSource={store}
      columnWidth={160}
      width="400"
      height="400"
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
        <Popup
          title="Hợp đồng"
          showTitle={true}
          width={700}
          height={525}
        />
      </Editing>
      <Column
        dataField="loaitemplate"
        dataType="string"
        caption="Loại hợp đồng"
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




