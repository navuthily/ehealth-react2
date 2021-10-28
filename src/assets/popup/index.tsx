import React, { useState } from "react";

import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import notify from "devextreme/ui/notify";
import DataGridCustom from "assets/grid/datagrid";

export const employees = [{
    'ID': 7,
    'FirstName': 'Sandra',
    'LastName': 'Johnson',
    'Prefix': 'Mrs.',
    'Position': 'Controller',
    'Picture': 'images/employees/06.png',
    'BirthDate': '1974/11/15',
    'HireDate': '2005/05/11',
    'Notes': "Sandra is a CPA and has been our controller since 2008. She loves to interact with staff so if you've not met her, be certain to say hi.\r\n\r\nSandra has 2 daughters both of whom are accomplished gymnasts.",
    'Address': '4600 N Virginia Rd.'
  }, {
    'ID': 10,
    'FirstName': 'Kevin',
    'LastName': 'Carter',
    'Prefix': 'Mr.',
    'Position': 'Shipping Manager',
    'Picture': 'images/employees/07.png',
    'BirthDate': '1978/01/09',
    'HireDate': '2009/08/11',
    'Notes': 'Kevin is our hard-working shipping manager and has been helping that department work like clockwork for 18 months.\r\n\r\nWhen not in the office, he is usually on the basketball court playing pick-up games.',
    'Address': '424 N Main St.'
  }, {
    'ID': 11,
    'FirstName': 'Cynthia',
    'LastName': 'Stanwick',
    'Prefix': 'Ms.',
    'Position': 'HR Assistant',
    'Picture': 'images/employees/08.png',
    'BirthDate': '1985/06/05',
    'HireDate': '2008/03/24',
    'Notes': 'Cindy joined us in 2008 and has been in the HR department for 2 years. \r\n\r\nShe was recently awarded employee of the month. Way to go Cindy!',
    'Address': '2211 Bonita Dr.'
  }, {
    'ID': 30,
    'FirstName': 'Kent',
    'LastName': 'Samuelson',
    'Prefix': 'Dr.',
    'Position': 'Ombudsman',
    'Picture': 'images/employees/02.png',
    'BirthDate': '1972/09/11',
    'HireDate': '2009/04/22',
    'Notes': 'As our ombudsman, Kent is on the front-lines solving customer problems and helping our partners address issues out in the field.    He is a classically trained musician and is a member of the Chamber Orchestra.',
    'Address': '12100 Mora Dr'
  }];

const PopupCustom = (props: any) => {

  const [currentEmployee, setcurrentEmployee] = useState(employees[0]);


  const hideInfo = () => {

  };
  const CloseDialog = () => {
    const method =  props.onChangeVisible;
    method();
}
  const addButtonOptions = {
    icon: "cart",
    text: "Add",
    onClick: hideInfo(),
  };
  const removeButtonOptions = {
    icon: "clear",
    text: "Remove",
    onClick: hideInfo(),
  };
  const editButtonOptions = {
    icon: "edit",
    text: "Edit",
    onClick: hideInfo(),
  };

  
  
  return (
    <div id="container">
      <Popup
        visible={props.popupVisible}
        dragEnabled={false}
        closeOnOutsideClick={false}
        showCloseButton={true}
        showTitle={true}
        title="Dialog"
        container=".dx-viewport"
        width={600}
        height={400}
        onVisibleChange={CloseDialog}
      >
        <Position at="center" my="center" />
        <DataGridCustom column={[{ caption: 'Tên thuốc', width: 100 }, { caption: 'Giá bán', width: 100 }, { caption: 'Đ.Dùng', width: 100 }, { caption: 'SL', width: 100 }, { caption: 'tổng', width: 100 }, { caption: 'C.dùng', width: 100 }, { caption: 'T.hiện', width: 100 }, { caption: 'Cách dùng chi tiết', width: 100 }]} propertyHeight={200}  />
      
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location="after"
          options={addButtonOptions}
        />
          <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location="after"
          options={removeButtonOptions}
        />
          <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location="after"
          options={editButtonOptions}
        />
      </Popup>
    </div>
  );
};

export default PopupCustom;
