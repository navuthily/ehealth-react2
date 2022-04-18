import axios from 'axios';
import { Column, DataGrid, Editing, FilterRow, Form, Grouping, Lookup, Popup, Scrolling } from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';
import CustomStore from 'devextreme/data/custom_store';
import { useEffect, useState } from 'react';
import 'whatwg-fetch';
import './styles.css';




const URL = 'http://localhost:7000/vattu';


function Dmvt2() {

console.log(1111111111111);
  const ordersData = new CustomStore({
    key: 'Ma_vt',
    load: () => sendRequest(`${URL}`),

    update: (key, values) => sendRequest(`${URL}/${encodeURIComponent(key)}`, 'PATCH', {
      key,
      values: JSON.stringify(values)
    }),
  })
  console.log(ordersData, 'dfsdfsfsd');
  const sendRequest = (url, method = 'GET', data = {}) => {
    console.log(data, 'thanh13123');

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
      console.log(data, "-------------------");
      return fetch(url,
        {
          method: method,
          headers: { "Content-type": "application/json" },
          credentials: 'include',
          body: data.values
        })
        .then(response => {
          console.log(response, 'rrerere');
          return response;
        })
        .then(data => console.log(data));
    }
  }

  const [boxData, setBoxData] = useState()

  useEffect(() => {
    axios.get('http://localhost:7000/nhomvattu',
    )
      .then(function (response) {
        // console.log(response.data, '5464568');
        let a = (response.data).filter(item => item.is_bhcc === true)
        // console.log(a);
        setBoxData(a)
      })
      .catch(function (error) {
        console.log(error);
      })

  }, []);

  return (
    <DataGrid
      id="gridContainer"
      showBorders={true}
      allowColumnReordering={true}
      rowAlternationEnabled={true}
      dataSource={ordersData}
      repaintChangesOnly={true}
      wordWrapEnabled={true}
      height="85vh"
    >
      <Scrolling mode="virtual" />
      <FilterRow visible={true} />

      <Editing
        mode="popup"
        allowUpdating={true}
      >
        <Popup title='Chỉnh Sửa' showTitle={true} width={800} height={400} />
        <Form>
          <Item dataField="id_dm_nhomvattu" />
        </Form>
      </Editing>


      <Column
        dataField="So_tt"
        caption="So_TT"
      // dataType="number"

      />

      <Column
        dataField="Ma_vt"
        caption="Ma_VT"
      // dataType="string"

      />

      <Column dataField="Barcode" />
      <Column dataField="Ten_vt" caption="Tên_VT" dataType="string" />
      <Column dataField="Dvt" caption="Đơn vị tính" dataType="string" />
      <Column dataField="id_dm_nhomvattu" caption="Nhóm Vật Tư" dataType='string' groupIndex={0} >
        <Lookup dataSource={boxData} displayExpr="nhom" valueExpr="id" />
      </Column>
      <Grouping autoExpandAll={false} />

    </DataGrid>
  );

}

export default Dmvt2;