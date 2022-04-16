// import {  } from 'devextreme-react';
import { CRUDThoigianlichhenkhamgio } from 'api';
import { Column, CompareRule, DataGrid, Editing, FilterRow, Form, Popup, RequiredRule } from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';
import CustomStore from 'devextreme/data/custom_store';
import { formatMessage } from 'devextreme/localization';
import React, { useRef } from 'react';
import 'whatwg-fetch';


const format = { type: "time", displayFormat: "HH:mm",  useMaskBehavior: "true", showClearButton: "true" }
const ThoiGianLichHenGio = React.memo(({ id }) => {

  const dataGrid = useRef()

  const ordersData = new CustomStore({
    key: 'id',
    load: () => sendRequest(),

    insert: (values) => sendRequest('POST', {
      values: values
    }),

    update: (key, values) => sendRequest('PATCH', {
      key,
      values: values 
    }),

    remove: (key) => sendRequest('DELETE', {
      key,
    })
  })



  const sendRequest = async(method = 'GET', data = {}) => {
    if(id){
      if (method === 'GET') {
        return await CRUDThoigianlichhenkhamgio(method, id)
      }

      if (data) {
        if(method === "POST") data.values["thoigianlichhenkham_id"] = id
        return await CRUDThoigianlichhenkhamgio(method, null, data)

      }      
    }

  }


  const comparisonTarget = (value) => {
      let gridInstant = dataGrid.current.instance;
      let editRowkey = gridInstant.option('editing.editRowKey')
      let index = gridInstant.getRowIndexByKey(editRowkey)
      let data = gridInstant.cellValue(index, value)
      // console.log(data);
      return data

  }


  return (


      <div style={{ marginLeft: "20px" }}>

         <React.Fragment>
          <DataGrid
            id="grid"
            showBorders={true}
            allowColumnReordering={true}
            rowAlternationEnabled={true}
            dataSource={ordersData}
            repaintChangesOnly={true}
            height="80vh"
            ref={dataGrid}
      

   
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
                  <Item dataField="start_time"/>
                  <Item dataField="end_time" />
              </Item>

                

              </Form>
          </Editing>            

          <Column
              dataField="start_time"
              caption="Thời gian bắt đầu"
              dataType="datetime"
              alignment="right"
              gnment="right"
              editorOptions={format}
              format={"shortTime"}
              
            >
              <RequiredRule/>
              <CompareRule   comparisonTarget={()=>{return comparisonTarget("end_time")}} comparisonType={"<"}  message={"Ngày bắt đầu không được lớn hơn ngày kết thúc!"}/>

          </Column >


            
            <Column dataField="end_time" caption="Thời gian kết thúc" dataType="datetime" alignment="right" gnment="right" editorOptions={format} format={"shortTime"}>
                <RequiredRule/>
            </Column >
     
            <Column dataField="userCreatedBy.nickname" caption="Người tạo" dataType="string" alignment="right" gnment="right"/>
            <Column dataField="userUpdatedBy.nickname" caption="Người sửa" dataType="string" alignment="right" gnment="right" />
            <Column dataField="createdAt" caption="Ngày tạo" dataType="date" alignment="right" gnment="right" />
            <Column dataField="updatedAt" caption="Ngày sửa" dataType="date" alignment="right" gnment="right" />

            <FilterRow visible={true} />
          </DataGrid>
        </React.Fragment>       
      </div> 



  );
})

export default ThoiGianLichHenGio