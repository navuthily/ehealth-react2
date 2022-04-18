import React, { useMemo, useEffect, useReducer, useContext } from "react";

import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.material.blue.light.compact.css";
import DropDownBox, { DropDownOptions } from "devextreme-react/drop-down-box";
import DataGrid, {
  Column,
  Selection,
  Paging,
  FilterRow,
  Scrolling
} from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";
import ArrayStore from "devextreme/data/array_store";

const gridBox_displayExpr = function (item) {
  return item && `${item.id}: ${item.tenphongban} `;
};
let searchTimer = null;

const initialState = {
  value: [1],
  focusedRowIndex: 0,
  focusedRowKey: null,
  opened: false,
  dataGridInstance: null,
  dropdownInstance: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "all":
      return {
        ...state,
        opened: action.opened,
        value: action.value,
      };
    case "open/close":
      return {
        ...state,
        opened: action.opened,
      };
    case "dropdownInstance":
      return {
        ...state,
        dropdownInstance: action.dropdownInstance,
      };
    case "dataGridInstance":
      return {
        ...state,
        dataGridInstance: action.instance,
      };
    case "focusedRowKey":
      return {
        ...state,
        focusedRowIndex: action.focusedRowIndex,
        focusedRowKey: action.focusedRowKey,
      };
    case "value": {
      return {
        ...state,
        value: action.value,
      };
    }
    default:
      throw new Error("non-processed action: ", action.type);
  }
}
function isSearchIncomplete(dropDownBox) {
  // compare the last displayed value and the current real text in the input field
  let displayValue = dropDownBox.option("displayValue"),
    text = dropDownBox.option("text");
  text = text && text.length && text;
  displayValue = displayValue && displayValue.length && displayValue[0];
  return text !== displayValue;
}

const DropDownBoxDispatch = React.createContext(null);

function FormBP(...props) {
  console.log(props,'props')
  const phongban = localStorage.getItem("phongban");
  const employeesStore = new ArrayStore({
    data: JSON.parse(phongban),
    key: "id",
  });

  const gridDataSource = useMemo(
    () =>
      new DataSource({
        store: employeesStore,
        searchExpr: ["tenphongban"],
      }),
    []
  );
  const [state, dispatch] = useReducer(reducer, initialState);
  let {
    value,
    opened,
    focusedRowIndex,
    focusedRowKey,
    dataGridInstance,
    dropdownInstance,
  } = state;

  const dropDownBoxValueChanged = (args) => {
    console.log(args.value, "args");
    clearTimeout(searchTimer);
    dispatch({ value: args.value, opened: true, type: "all" });
  };
  const onInput = function (e) {
    // this.pageIndex(0)
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function () {
      let text = e.component.option("text");
      gridDataSource.searchValue(text);
      if (opened && isSearchIncomplete(e.component)) {
        gridDataSource
          // .store()
          .load()
          .then((items) => {
            if (items.length > 0 && dataGridInstance)
              dispatch({
                focusedRowKey: items[0].id,
                type: "focusedRowKey",
              });
          });
      } else {
        dispatch({ opened: true, type: "open/close" });
      }
    }, 500);
  };
  const onKeyDown = (e) => {
    let ddbInstance = e.component;
    if (
      e.event.keyCode !== 40 &&
      e.event.keyCode !== 38 &&
      e.event.keyCode !== 13
    )
      return;
    if (!opened) {
      ddbInstance.isKeyDown = true;
      dispatch({ opened: true, type: "open/close" });
    } else {
      gridDataSource
        .store()
        .load()
        .done((items) => {
          if (items.length > 0 && dataGridInstance && e.event.keyCode === 40) {
            dispatch({
              focusedRowIndex:
                focusedRowIndex < items.length - 1 ? focusedRowIndex + 1 : 0,
              focusedRowKey:
                focusedRowIndex < items.length - 1
                  ? items[focusedRowIndex + 1]?.id
                  : items[0]?.id,
              type: "focusedRowKey",
            });
          }

          if (items.length > 0 && dataGridInstance && e.event.keyCode === 38) {
            dispatch({
              focusedRowIndex:
                focusedRowIndex > 0 ? focusedRowIndex - 1 : items.length - 1,
              focusedRowKey:
                focusedRowIndex > 0
                  ? items[focusedRowIndex - 1]?.id
                  : items[items.length - 1]?.id,
              type: "focusedRowKey",
            });
          }
          if (e.event.keyCode === 13) {
            dispatch({
              value: items[focusedRowIndex]?.id,
              opened: false,
              type: "all",
            });
          }
        });
    }
  };
  const onOpened = (e) => {
    setTimeout(() => {
      e.component.focus();
      e.component.field().select();
    }, 0);

    let ddbInstance = e.component;
    if (ddbInstance.isKeyDown) {
      if (!dataGridInstance) return;
      var contentReadyHandler = (args) => {
        let gridInstance = args.component;
        gridInstance.focus();
        gridInstance.off("contentReady", contentReadyHandler);
      };

      if (!dataGridInstance.isNotFirstLoad)
        dataGridInstance.on("contentReady", contentReadyHandler);
      else {
        var optionChangedHandler = (args) => {
          let gridInstance = args.component;
          if (
            args.name === "focusedRowKey" ||
            args.name === "focusedColumnIndex"
          ) {
            gridInstance.off("optionChanged", optionChangedHandler);
            gridInstance.focus();
          }
        };
        dataGridInstance.on("optionChanged", optionChangedHandler);
        dispatch({
          type: "focusedRowKey",
          focusedRowKey: null,
          focusedRowIndex: 0,
        });
      }
      ddbInstance.isKeyDown = false;
    } else if (
      dataGridInstance &&
      dataGridInstance.isNotFirstLoad &&
      isSearchIncomplete(ddbInstance)
    ) {
      gridDataSource.load().done((items) => {
        if (items.length > 0)
          dispatch({
            focusedRowKey: items[0].id,
            type: "focusedRowKey",
          });
        ddbInstance.focus();
      });
    }
  };
  const onClosed = (e) => {
    let ddbInstance = e.component,
      searchValue = gridDataSource.searchValue();
    if (isSearchIncomplete(ddbInstance)) {
      dispatch({ value: value === "" ? null : "", type: "value" });
    }
    if (searchValue) {
      gridDataSource.searchValue(null);
    }
  };
  const onOptionChanged = (args) => {
    if (args.name === "opened") {
      dispatch({ opened: args.value, type: "open/close" });
    }
  };

  useEffect(() => {
    fetch("http://localhost:7000/dmphongban")
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("phongban", JSON.stringify(data));
      })
      .catch((err) => console.log(err));
    return () => {
      gridDataSource.dispose();
      dispatch({ type: "dataGridInstance", instance: null });
    };
  }, []);
  const contentReady = (e) => {
    if (!e.component.isNotFirstLoad) {
      e.component.isNotFirstLoad = true;
      dispatch({ dropdownInstance: e.component, type: "dropdownInstance" });
    }
  };
  return (
      <DropDownBoxDispatch.Provider
        value={{
          dataSource: gridDataSource,
          dropdownInstance: dropdownInstance,
          dispatch: dispatch,
          focusedRowKey: focusedRowKey,
          focusedRowIndex: focusedRowIndex,
        }}
      >
        <DropDownBox
          showClearButton={true}
          placeholder="Select a value..."
          onInput={onInput}
          displayExpr={gridBox_displayExpr}
          valueExpr="id"
          value={value}
          valueChangeEvent=""
          acceptCustomValue={true}
          onOpened={onOpened}
          opened={opened}
          openOnFieldClick={false}
          dataSource={gridDataSource}
          onKeyDown={onKeyDown}
          onClosed={onClosed}
          onContentReady={contentReady}
          onValueChanged={dropDownBoxValueChanged}
          onOptionChanged={onOptionChanged}
          contentComponent={DataGridComponent}
        >
          <DropDownOptions height={300} width={500} />
        </DropDownBox>
      </DropDownBoxDispatch.Provider>
  );
}

const DataGridComponent = ({ data }) => {
  const { value, component } = data;
  const {
    dispatch,
    dataSource,
    focusedRowKey,
    focusedRowIndex,
    dropdownInstance,
  } = useContext(DropDownBoxDispatch);
  const selectionChanged = (e) => {
    setTimeout(() => {
      e.component.focus();
      dropdownInstance.field().select();
    }, 0);
    dispatch({ value: e.selectedRowKeys, opened: false, type: "all" });
  };
  const contentReady = (e) => {
    if (!e.component.isNotFirstLoad) {
      e.component.isNotFirstLoad = true;
      component.focus();
      dispatch({ instance: e.component, type: "dataGridInstance" });
    }
  };

  const focusedRowChanged = (e) => {
    dispatch({
      focusedRowIndex: e.rowIndex,
      focusedRowKey: e.component.getKeyByRowIndex(e.rowIndex),
      type: "focusedRowKey",
    });
  };
  return (
    <DataGrid
      onFocusedRowChanged={focusedRowChanged}
      dataSource={dataSource}
      focusedRowEnabled={true}
      onContentReady={contentReady}
      autoNavigateToFocusedRow={true}
      remoteOperations={true}
      hoverStateEnabled={true}
      focusedRowIndex={focusedRowIndex}
      focusedRowKey={focusedRowKey}
      onSelectionChanged={selectionChanged}
      defaultSelectedRowKeys={value}
      columnWidth={100}
      width="100%"
      height="100%"
      valueExpr="id"
    >
      <Column dataField="id" caption="ID" dataType="number" />
      <Column
        dataField="tenphongban"
        caption="Tên phòng ban"
        dataType="string"
      />

      <Selection mode="single" />
      <Scrolling mode="virtual" />
      <Paging enabled={true} pageSize={10} />
      <FilterRow visible={true} />
    </DataGrid>
  );
};
export default FormBP;
