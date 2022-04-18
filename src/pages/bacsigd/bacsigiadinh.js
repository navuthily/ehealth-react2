import "./styles.css";
import { DataGrid, Popup } from "devextreme-react";
 import { Column, Editing, FilterRow, Form } from "devextreme-react/data-grid";
import { Item } from "devextreme-react/form";
import React, { useReducer } from "react";
import CustomStore from "devextreme/data/custom_store";
import ApiConstants from "api/ApiConstants";

// const initialState = {
//   focusedRowIndex: 0,
//   focusedRowKey: null,
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "focusedRowKey":
//       return {
//         ...state,
//         focusedRowIndex: action.focusedRowIndex,
//         focusedRowKey: action.focusedRowKey,
//       };
//     default:
//       break;
//   }
// };
export const bacsigiadinh = () => {
  // console.log(111111111111111);
  // const [state, dispatch] = useReducer(reducer, initialState);

  const ordersData = new CustomStore({
    key: "id",
    load: () => sendRequest(`${ApiConstants.BASE_URL}${ApiConstants.THOI_GIAN_CHO_PHEP_DAT_LICH_KHAM}`),

    update: (key, values) =>
      sendRequest(`${ApiConstants.BASE_URL}${ApiConstants.THOI_GIAN_CHO_PHEP_DAT_LICH_KHAM}/${encodeURIComponent(key)}`, "PATCH", {
        key,
        values: values,
      }),
  });
  const sendRequest = (url, method = "GET", data = {}) => {
    if (method === "GET") {
      return fetch(url, {
        method,
        credentials: "include",
      }).then((result) =>
        result.json().then((json) => {
          if (result.ok) {
            const newArr = json.map(item => {
              return {...item, datlichtruoctoida: item.datlichtruoctoida / 1440}
            })
            return newArr;
          }

          throw json.Message;
        })
      );
    }

    if (data) {
      if (data.values.datlichtruoctoida) {
        data.values.datlichtruoctoida = data.values.datlichtruoctoida * 1440;
      }
      return fetch(url, {
        method: method,
        headers: { "Content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data.values),
      }).then((response) => {
        return response.json();
      });
    }
  };
  // const onFocusedRowChanged = (e) => {
  //   console.log(e.row.data);
  //   dispatch({
  //     // index: 0
  //     focusedRowIndex: e.rowIndex,
  //     // key: 1
  //     focusedRowKey: e.component.getKeyByRowIndex(e.rowIndex),
  //     type: "focusedRowKey",
  //   });
  // };
  
  return (
    <>
      <React.Fragment>
        <DataGrid
          dataSource={ordersData}
          showBorders={true}
          hoverStateEnabled={true}
          allowColumnReordering={true}
          rowAlternationEnabled={true}
          repaintChangesOnly={true}
          // focusedRowEnabled={true}
          // onFocusedRowChanged={onFocusedRowChanged}
          // focusedRowIndex={focusedRowIndex}
          // focusedRowKey={focusedRowKey}
        >
          <Editing mode="popup" allowUpdating={true}>
            <Popup
              title="Employee Info"
              showTitle={true}
              width={700}
              height={525}
            />
            <Form>
              <Item dataField="datlichtruoctoida" />
              <Item dataField="datlichtruoctoithieu" />
            </Form>
          </Editing>
          <Column
            dataField="id"
            caption="ROW"
            width={50}
            // allowSorting={false}
          />
          <Column dataField="module_name" caption="MODULE" width={240} />
          <Column
            dataField="datlichtruoctoida"
            caption="TG cho phép đặt lịch trước tối đa"
            dataType="string"
          />
          <Column
            dataField="datlichtruoctoithieu"
            caption="TG cho phép đặt lịch trước tối thiểu"
            dataType="string"
          />
          <Column dataField="created_at" caption="Ngày tạo" dataType="date" />
          <Column dataField="create_by" caption="Người tạo" dataType="string"/>
          <Column dataField="updated_at" caption="Ngày sửa" dataType="date" />
          <Column dataField="update_by" caption="Người sửa" dataType="string"/>
          <FilterRow visible={true} />
        </DataGrid>
      </React.Fragment>
    </>
  );
};
