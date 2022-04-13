import { CRUDThoigianlichhenkhamngay } from 'api';
import { Column, DataGrid, Editing, FilterRow, Form, HeaderFilter, Lookup, Popup, Scrolling } from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';
import { CompareRule, RequiredRule } from 'devextreme-react/validator';
import CustomStore from 'devextreme/data/custom_store';
import React, { useRef, useState } from 'react';





const formatSearchDate = {   useMaskBehavior: "true" }


const Thoigianlichhenkhamngay = React.memo(({ setId, module, dispatch }) =>  {
  const [focusedRowKey, setFocusedRowKey] = useState()
  

  const dataGrid = useRef()

  const [ordersData, setOrdersData] = useState(new CustomStore({
    key: 'id',
    load: () => sendRequest(),

    insert: (values) => sendRequest('POST', {
      values: JSON.stringify(values)
    }),

    update: (key, values) => sendRequest('PATCH', {
      key,
      values: JSON.stringify(values)
    }),

    remove: (key) => sendRequest('DELETE', {
      key,
    })
  }))


  const sendRequest = async(method = 'GET', data = {}) => {
    if (method === 'GET') {
      return await CRUDThoigianlichhenkhamngay(method)
    }

    if (data) {
      // console.log(data);
      return await CRUDThoigianlichhenkhamngay(method, data)
    }
  }

  const onFocusedRowChanging = (e) => {
    const rowsCount = e.component.getVisibleRows().length;
    const pageCount = e.component.pageCount();
    const pageIndex = e.component.pageIndex();
    const key = e.event && e.event.key;

    if (key && e.prevRowIndex === e.newRowIndex) {
      if (e.newRowIndex === rowsCount - 1 && pageIndex < pageCount - 1) {
        e.component.pageIndex(pageIndex + 1).done(() => {
          e.component.option('focusedRowIndex', 0);
        });
      } else if (e.newRowIndex === 0 && pageIndex > 0) {
        e.component.pageIndex(pageIndex - 1).done(() => {
          e.component.option('focusedRowIndex', rowsCount - 1);
        });
      }
    }
  }

  const onFocusedRowChanged = (e) => {
    if(e && e.row && e.row.key){
      setId(e.row.key)
      setFocusedRowKey(e.component.option('focusedRowKey'))
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
    <DataGrid
      id="gridContainer"

      showBorders={true}
      allowColumnReordering={true}
      rowAlternationEnabled={true}
      dataSource={ordersData}
      repaintChangesOnly={true}


      focusedRowEnabled={true}
      focusedRowKey={1}
      onFocusedRowChanging={onFocusedRowChanging}
      onFocusedRowChanged={onFocusedRowChanged}
  
      height="80vh"

      ref={dataGrid}
    >

    <Scrolling mode="virtual" useNative={true}/>
    <FilterRow visible={true}/>
    <HeaderFilter visible={true}/>
    <Editing
      mode="popup"
      allowAdding={true}
      allowDeleting={true}
      allowUpdating={true}
    
    >
      <Popup  width={600} height={400} />
      <Form>
        <Item itemType="group" colCount={1} colSpan={2} >
          <Item dataField="start_date" dataType="date"/>
          <Item dataField="end_date" dataType="date"/>
          <Item dataField="module_id"/>          
        </Item>
      </Form>
    </Editing>

    {/* <Column
      dataField="id"
      caption="ID"
      dataType="string"
      alignment="right"
      gnment="right"
      allowFiltering={false}

    
    /> */}

    <Column
      dataField="start_date"
      caption="Ngày bắt đầu"
      dataType="date"
      alignment="right"
      gnment="right"
      editorOptions={formatSearchDate}
    >
      <RequiredRule/>
      <CompareRule   comparisonTarget={()=>{return comparisonTarget("end_date")}} comparisonType={"<"}  message={"Ngày bắt đầu không được lớn hơn ngày kết thúc!"}/>

      </Column >


    
    <Column dataField="end_date" caption="Ngày kết thúc" dataType="date" alignment="right" gnment="right"  editorOptions={formatSearchDate}>
    <RequiredRule/>
    </Column>

    <Column dataField="module_id" caption="ModuleName">
          <Lookup dataSource={module} valueExpr="id" displayExpr="moduleName"/>
          <RequiredRule/>
    </Column>           
    
  
    





  </DataGrid>
  )
})


export default Thoigianlichhenkhamngay