import { Column, DataGrid, Editing, FilterRow, Form, Paging, Popup } from 'devextreme-react/data-grid';
import { CheckBox } from 'devextreme-react';
import { Item } from 'devextreme-react/form';
import CustomStore from 'devextreme/data/custom_store';
import React, { useState } from 'react';
import 'whatwg-fetch';
// import IButton from './checkboxvalue';


const URL = 'http://localhost:7000/nhomvattu';

function Nhomvattu() {

  const [ordersData, setOrdersData] = useState(new CustomStore({
    key: 'id',
    load: () => sendRequest(`${URL}`),

    insert: (values) => sendRequest(`${URL}`, 'POST', {
      values: JSON.stringify(values)
    }),

    update: (key, values) => sendRequest(`${URL}/${encodeURIComponent(key)}`, 'PATCH', {
      key,
      values: JSON.stringify(values)
    }),

    remove: (key) => sendRequest(`${URL}/${encodeURIComponent(key)}`, 'DELETE', {
      key,
    })
  }))

  const sendRequest = (url, method = 'GET', data = {}) => {
    if (method === 'GET') {
      return fetch(url, {
        method,
        credentials: 'include',
      }).then((result) => result.json().then((json) => {
        if (result.ok) return json;
        throw json.Message;
      }));
    }

    if (data) {
      // console.log(data.key.length, "-------------------");
      // console.log(data.values,'sfdsfs');
      // console.log( typeof data.values,'79887');

      return fetch(url,
        {
          method: method,
          headers: { "Content-type": "application/json" },
          credentials: 'include',
          body: data.values
        })
        .then(response => {
          return response;
        })
        .then(data => {
          return data
        });

    }
  }

  const cellRenderTrangThai = (data) => {
    return <CheckBox value={data.data.is_bhcc}></CheckBox>
  }

  return (
    <React.Fragment>
      <DataGrid
        id="grid"
        showBorders={true}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        dataSource={ordersData}
        repaintChangesOnly={true}
      >
        <Editing
          mode="popup"
          allowAdding={true}
          allowDeleting={true}
          allowUpdating={true}
        >
          <Popup  width={600} height={400} />
          <Form>
            <Item itemType="group" colCount={1} colSpan={2} >
              <Item dataField="nhom" />
              <Item dataField="is_bhcc" editorType="dxCheckBox" />
            </Item>
          </Form>
        </Editing>


        <Column
          dataField="id"
          caption="ID"
          dataType="string"
          alignment="right"
          gnment="right"
        />

        <Column
          dataField="nhom"
          caption="Nhóm"
          dataType="string"
          alignment="right"
          gnment="right"
        />

        <Column dataField="is_bhcc" caption="Trạng Thái" dataType="string" cellRender={cellRenderTrangThai} />
        <Paging
          enabled="true"
          defaultPageSize="15"
        />
        <FilterRow visible={true} />
      </DataGrid>
    </React.Fragment>
  );
}

export default Nhomvattu;