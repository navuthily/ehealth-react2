import React, { useState } from "react";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import DataGridCustom from "assets/grid/datagrid";
import { RouteProps } from "react-router";



const PopupCustom  = (props:any)  => {

  const hideInfo = () => {};
  const {component} = props;
  const CloseDialog = () => {
    const method = props.onChangeVisible;
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
        // visible={props.popupVisible}
        // dragEnabled={false}
        // closeOnOutsideClick={false}
        // showCloseButton={true}
        // showTitle={true}
        // title="Dialog"
        // container=".dx-viewport"
        // width={600}
        // height={400}
        // onVisibleChange={CloseDialog}
        {...props}
      >
        <Position at="center" my="center" />
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
