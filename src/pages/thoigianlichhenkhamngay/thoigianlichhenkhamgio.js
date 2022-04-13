// import {  } from 'devextreme-react';
import { CRUDThoigianlichhenkhamgio } from 'api';
import { Column, DataGrid, Editing, FilterRow, Form, Paging,DateBox ,CheckBox, Format} from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';
import CustomStore from 'devextreme/data/custom_store';
import React, { useRef } from 'react';
import 'whatwg-fetch';


const format = { type: "time", displayFormat: "HH:mm",  useMaskBehavior: "true" }
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
            ref={dataGrid}
      

   
          >
         
              <Editing
                mode="popup"
                allowAdding={true}
                allowDeleting={true}
                allowUpdating={true}
              >
                <Form>
                  <Item dataField="start_time"/>
                  <Item dataField="end_time" />
                  

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
            />
            
            <Column dataField="end_time" caption="Thời gian kết thúc" dataType="datetime" alignment="right" gnment="right" editorOptions={format} format={"shortTime"}/>
         
                  
             
            <Column/>
     



            <Paging
              enabled="true"
              defaultPageSize="15"
            />
            <FilterRow visible={true} />
          </DataGrid>
        </React.Fragment>       
      </div> 



  );
})

export default ThoiGianLichHenGio