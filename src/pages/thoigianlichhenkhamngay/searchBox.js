import { ButtonItem, Form, GroupItem, Item } from 'devextreme-react/form'
import React from 'react'
import dayjs from 'dayjs'
import { useThoigianlichkhamngay } from 'contexts/thoigianlichkhamngay.context'


const buttonOptions = {
  text: "Tìm kiếm",
  type: 'success',
  useSubmitBehavior: true
}



export default function SearchBox() {
  const { searchDate } = useThoigianlichkhamngay();


  const dateTime = {
    startDate: searchDate.startDate,
    endDate: searchDate.endDate
  }

  return (
    
    <Form colCount={3} id="form" formData={dateTime} colspan={2}>
      <GroupItem>
          <Item dataField={"startDate"} editorType={"dxDateBox"} />                      
      </GroupItem>
      <GroupItem>
          <Item dataField={"endDate"} editorType={"dxDateBox"}/>
      </GroupItem>
      <GroupItem>
          <ButtonItem buttonOptions={buttonOptions}/>
      </GroupItem>
  </Form>
  )
}
