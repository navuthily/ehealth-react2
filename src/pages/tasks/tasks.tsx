import useWindowDimensions from 'assets/features/getScreen';
import Button from 'devextreme-react/button';
import {
  Column, Lookup, Pager,
  Paging, Scrolling
} from 'devextreme-react/data-grid';
import 'devextreme/data/odata/store';
import React, { useRef } from 'react';
import KeepAlive from 'react-activation';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addParamsToState } from 'store/module/paramsComponent';
import { addMenuRouter } from 'store/module/tagViews';
import { DataGrid } from 'pages/index';
export interface IObject {
  [key: string]: Object;
}
const dataSource = {
  store: {
      type: 'odata',
      key: 'Task_ID',
      url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks'
  },
  expand: 'ResponsibleEmployee',
  select: [
      'Task_ID',
      'Task_Subject',
      'Task_Start_Date',
      'Task_Due_Date',
      'Task_Status',
      'Task_Priority',
      'Task_Completion',
      'ResponsibleEmployee/Employee_Full_Name'
  ]
};

export default function Task() {
  const dispatch = useDispatch();
  const history = useHistory();
  const stageCanvasRef: any = useRef();
  const { current } = stageCanvasRef;
  const isHeight = current?.props?.height;
  // const 
  // console.log(isHeight);
  //đoạn ni xử lý cái lưới ở dưới theo 
  const handleOnDbClickCell = (item: any): void => {
    // console.log(item);
    const index: string = 'benhan_' + item?.key;
    const newObject: IObject = {};
    const newObjectRoute: IObject = {};
    newObjectRoute['meta'] = { icon: 'tab', text: 'BenhAn' + item?.key, path: '/benhan/' + item?.key };
    newObject[index] = item.values;
    dispatch(addParamsToState(newObject));
    dispatch(addMenuRouter([newObjectRoute]))
    history.push({
      pathname: '/benhan/' + item?.key,
      state:item.values
  });
  }

  return (
    <KeepAlive>
      <React.Fragment>
        <div className="left-side">
          <div className="logo">
            <span style={{ fontWeight: "bold" }}>Danh sách bệnh nhân</span>
            &nbsp;
            <Button
              type="success"
              text="Reset vân tay"
              width={"auto"}
            // onClick={this.doneClick} 
            />
          </div>
        </div>
          <DataGrid column={[{ caption: 'Mã BN', width: 100 }, { caption: 'Họ lót', width: 200 }, { caption: 'Tên', width: 100 }, { caption: 'Ngày sinh', width: 200 }, { caption: 'Năm sinh', width: 100 }, { caption: 'Giới tính', width: 100 }, { caption: 'Điện thoại 1', width: 100 }, { caption: 'Điện thoại 2', width: 100 }, { caption: 'Địa chỉ', width: 200 }, { caption: 'Người liên hệ', width: 150 }, { caption: 'Quan hệ với BN', width: 100 }, { caption: 'ĐT người LH', width: 100 }, { caption: 'DT người LH', width: 100 }, { caption: 'Ghi chú', width: 100 }, { caption: 'Sổ BHYT', width: 100 }]} propertyHeight={"400"} onCellDblClick={handleOnDbClickCell} dataSource={dataSource}  />
      </React.Fragment>
    </KeepAlive>
  )
}

