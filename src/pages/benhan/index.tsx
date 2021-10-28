import ButtonCustom from 'assets/button/button';
import PopupCustom from 'assets/popup/index';
import { Button } from 'devextreme-react/button';
import Form, { GroupItem, Item, SimpleItem } from 'devextreme-react/form';
import 'devextreme-react/text-area';
import { DataGrid } from 'pages/index';
import React, { useState } from "react";
import KeepAlive from 'react-activation';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { addMenuRouter } from 'store/module/tagViews';
import './style.scss';

const employee = {
    'ID': 1,
    'FirstName': 'John',
    'LastName': 'Heart',
    'CompanyName': 'Super Mart of the West',
    'Position': 'CEO',
    'OfficeNo': '901',
    'BirthDate': new Date(1964, 2, 16),
    'HireDate': new Date(1995, 0, 15),
    'Address': '351 S Hill St.',
    'City': 'Los Angeles',
    'State': 'CA',
    'Zipcode': '90013',
    'Phone': '+1(213) 555-9392',
    'Email': 'jheart@dx-email.com',
    'Skype': 'jheart_DX_skype'
};
const positions = [
    'HR Manager',
    'IT Manager',
    'CEO',
    'Controller',
    'Sales Manager',
    'Support Manager',
    'Shipping Manager'
];
const withButtonEditorOptions = "100%";
const notesEditorOptions = { height: 80 };

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

export interface IObject {
    [key: string]: Object;
}

export const GridTop = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const positionEditorOptions = { items: positions, searchEnabled: true, value: '' }
    const hireDateEditorOptions = { width: '100%', value: null };
    const validationRules = {
        position: [
            { type: 'required', message: 'Position is required.' },
        ],
        hireDate: [
            { type: 'required', message: 'Hire Date is required.' }
        ]
    }

    const handleButtonClick = (item: any): void => {
        const { pathname, state }: any = location;
        const ID = pathname.split('/')[2];
        const buttonText = item.component.option('text');
        const accessKey = item.component.option('accessKey');
        const newObjectRoute: IObject = {};
        newObjectRoute['meta'] = { icon: 'tab', text: buttonText, path: '/' + accessKey + '/' + ID };
        dispatch(addMenuRouter([newObjectRoute]));
        history.push('/' + accessKey + '/' + ID);
    }

    return (
        <React.Fragment>
            <div className="form-container">
                <Form
                    colCount={2}
                    id="form"
                    formData={{}}
                    labelLocation={'left'}
                    readOnly={false}
                    showColonAfterLabel={true}
                    showValidationSummary={true}
                //validationGroup="customerData"
                >
                    <GroupItem caption="">
                        <div style={{ height: "120px", textAlign: "center" }}>
                            <Form
                                colCount={6}
                                id="form"
                                // formData={employee}
                                labelLocation={'top'}
                                readOnly={true}
                                showColonAfterLabel={true}
                                showValidationSummary={true}
                            //validationGroup="customerData"
                            >
                                <Button
                                    type="success"
                                    text="Done"
                                />
                                <SimpleItem dataField="Họ Tên" editorOptions={{ value: 'Tran Nhan Hieu' }} />
                                <SimpleItem dataField="Giới Tính" editorOptions={{ value: 'Nam' }} />
                                <SimpleItem dataField="Tuổi" editorOptions={{ value: '21' }} />
                                <SimpleItem dataField="ID" editorOptions={{ value: '651545' }} />
                                <SimpleItem dataField="Rate" editorOptions={{ value: '1.0' }} />
                                <SimpleItem dataField="BHYT" editorOptions={{ value: 'Đúng tuyến' }} />

                            </Form>
                            <Form
                                colCount={5}
                                id="form"
                                formData={employee}
                                labelLocation={'top'}
                                readOnly={false}
                                showColonAfterLabel={true}
                                showValidationSummary={true}
                            //validationGroup="customerData"
                            >
                                <GroupItem caption="">
                                    <ButtonCustom
                                        // disabled={true}
                                        // type="success"
                                        text="Khám Lâm Sàng"
                                        width={withButtonEditorOptions}
                                    />
                                </GroupItem>
                                <GroupItem caption="">
                                    <Button
                                        // type="success"
                                        accessKey={'thuthuatranghammat'}
                                        text="thủ thuật răng hàm mặt"
                                        width={withButtonEditorOptions}
                                        onClick={handleButtonClick}
                                        className={'thuthuatranghammat'}
                                    />
                                </GroupItem>
                                <GroupItem caption="">
                                    <Button
                                        accessKey={'xetnghiem'}
                                        // type="success"
                                        text="labo"
                                        width={withButtonEditorOptions}
                                        onClick={handleButtonClick}
                                    // onClick={this.doneClick} 
                                    />
                                </GroupItem>
                                <GroupItem caption="">
                                    <Button
                                        accessKey={'xquang'}
                                        // type="success"
                                        text="xquang"
                                        width={withButtonEditorOptions}
                                        onClick={handleButtonClick}
                                    // disabled={true}
                                    // onClick={this.doneClick} 
                                    />
                                </GroupItem>
                            </Form>
                        </div>
                    </GroupItem>
                    <GroupItem caption="">
                        <div style={{ height: "120px", textAlign: "center" }}>
                            <Form
                                colCount={3}
                                id="form"
                                // formData={employee}
                                labelLocation={'top'}
                                readOnly={false}
                                showColonAfterLabel={true}
                                showValidationSummary={true}
                            //validationGroup="customerData"
                            >
                                <Item dataField="Tiền Sử gia đình" editorType="dxTextArea" editorOptions={notesEditorOptions} icon="user" />
                                <Item dataField="Tiền Sử bệnh nhân" editorType="dxTextArea" editorOptions={notesEditorOptions} />
                                <Item dataField="Dị ứng" editorType="dxTextArea" editorOptions={notesEditorOptions} />
                            </Form>
                        </div>
                    </GroupItem>
                </Form >
            </div >
        </React.Fragment >
    )
}
export const GridBody = () => {
    const [isChecked, setIsChecked] = useState(false);
    const handleOnDbClickCell = (item: any) => {
        console.log(item);
        setIsChecked(!isChecked);
        // const index: string = 'benhan_' + item?.key;
        // const newObject: IObject = {};
        // const newObjectRoute: IObject = {};
        // newObjectRoute['meta'] = { icon: 'tab', text: 'BenhAn' + item?.key, path: '/benhan/' + item?.key };
        // newObject[index] = item.values;
        // dispatch(addParamsToState(newObject));
        // dispatch(addMenuRouter([newObjectRoute]))
        // history.push('/benhan/' + item?.key);
    }
    const handleButtonHoTroNM = (item: any) => {
        console.log('1231');
        // return  
    }
    

    return (
        <>
            <Form
                colCount={2}
                id="form"
                formData={employee}
                labelLocation={'left'}
                readOnly={false}
                showColonAfterLabel={true}
                showValidationSummary={true}
            //validationGroup="customerData"
            >
                <GroupItem >
                    <div style={{ height: "70px", textAlign: "center" }}>
                        <Form
                            colCount={5}
                            id="form"
                            // formData={employee}
                            labelLocation={'top'}
                            readOnly={false}
                            showColonAfterLabel={true}
                            showValidationSummary={true}
                        //validationGroup="customerData"
                        >
                            <GroupItem caption="">
                                <Button
                                    // disabled={true}
                                    // type="success"
                                    text="Khám Ngoại BHYT"
                                    width={withButtonEditorOptions}
                                // onClick={this.doneClick} 
                                />
                            </GroupItem>
                            <GroupItem caption="">
                                <Button
                                    // type="success"
                                    text="Xét Nghiệm"
                                    width={withButtonEditorOptions}
                                // onClick={this.doneClick} 
                                />
                            </GroupItem>
                            <GroupItem caption="">
                                <Button
                                    // type="success"
                                    text="XQKTS Răng toàn cảnh ( Panorama )"
                                    width={withButtonEditorOptions}
                                // onClick={this.doneClick} 
                                />
                            </GroupItem>
                            <GroupItem caption="">
                                <Button
                                    // type="success"
                                    text="Nhổ răng số 8 trên thẳng"
                                    width={withButtonEditorOptions}
                                // disabled={true}
                                // onClick={this.doneClick} 
                                />
                            </GroupItem>
                            <GroupItem caption="">
                                <Button
                                    // type="success"
                                    text="Nhổ răng số 8 
                                    dưới lệch 45 độ"
                                    width={withButtonEditorOptions}
                                // height={40}
                                // disabled={true}
                                // onClick={this.doneClick} 
                                />
                            </GroupItem>
                        </Form>
                    </div>
                </GroupItem>
                <GroupItem>
                
                    <div style={{ height: "70px", textAlign: "center" }}>
                        <Form
                            colCount={1}
                            id="form"
                            // formData={employee}
                            labelLocation={'top'}
                            readOnly={false}
                            showColonAfterLabel={true}
                            showValidationSummary={true}
                        //validationGroup="customerData"
                        >
                            <GroupItem caption="">
                                {/* <TabbedItem> */}
                                {/* <TabPanelOptions deferRendering={false} /> */}
                                <Form
                                    colCount={5}
                                    id="form"
                                    // formData={employee}
                                    labelLocation={'top'}
                                    readOnly={false}
                                    showColonAfterLabel={true}
                                    showValidationSummary={true}
                                //validationGroup="customerData"
                                >
                                    <GroupItem caption="">
                                        <Button
                                            disabled={true}
                                            type="success"
                                            text="Bắt đầu"
                                            width={withButtonEditorOptions}
                                        // onClick={this.doneClick} 
                                        />
                                    </GroupItem>
                                    <GroupItem caption="">
                                        <Button
                                            type="success"
                                            text="Chỉ Định Khám"
                                            width={withButtonEditorOptions}
                                        // onClick={this.doneClick} 
                                        />
                                    </GroupItem>
                                    <GroupItem caption="">
                                        <Button
                                            type="success"
                                            text="D.T Phối hợp"
                                            width={withButtonEditorOptions}
                                        // onClick={this.doneClick} 
                                        />
                                    </GroupItem>
                                    <GroupItem caption="">
                                        <Button
                                            type="success"
                                            text="Đã trả KQ"
                                            width={withButtonEditorOptions}
                                            disabled={true}
                                        // onClick={this.doneClick} 
                                        />
                                    </GroupItem>
                                    <GroupItem caption="">
                                        <Button
                                            type="success"
                                            text="Done"
                                            width={withButtonEditorOptions}
                                        // onClick={this.doneClick} 
                                        />
                                    </GroupItem>

                                    <GroupItem caption="">
                                        <Button
                                            type="success"
                                            text="BA nội trú"
                                            width={withButtonEditorOptions}
                                        // onClick={this.doneClick} 
                                        />
                                    </GroupItem>
                                    <GroupItem caption="">
                                        <Button
                                            type="success"
                                            text="VLTL"
                                            width={withButtonEditorOptions}
                                        // onClick={this.doneClick} 
                                        />
                                    </GroupItem>
                                    <GroupItem caption="">
                                        <Button
                                            type="success"
                                            text="N.Trú"
                                            width={withButtonEditorOptions}
                                        // onClick={this.doneClick} 
                                        />
                                    </GroupItem>
                                </Form>

                                {/* </TabbedItem> */}
                            </GroupItem>
                        </Form>
                    </div>
                </GroupItem>
            </Form>
            <Form
                colCount={2}
                id="form"
                formData={employee}
                labelLocation={'left'}
                readOnly={false}
                showColonAfterLabel={true}
                showValidationSummary={true}
            //validationGroup="customerData"
            >

                <GroupItem >
                    <div style={{ border: "1px solid green", height: "350px", textAlign: "center" }}>
                        <Form
                            colCount={2}
                            id="form"
                            // formData={employee}
                            labelLocation={'top'}
                            readOnly={false}
                            showColonAfterLabel={true}
                            showValidationSummary={true}
                        //validationGroup="customerData"
                        >
                            <GroupItem caption="">
                                <div className="left-side">
                                    <div className="logo">
                                        <span style={{ fontWeight: "bold" }}>Khám lâm sàng</span>
                                        &nbsp;
                                        <Button
                                            text="Hỗ trợ NN:"
                                        // width={"auto"}
                                         onClick={handleButtonHoTroNM}
                                        />
                                        <Button
                                            text="Toa Phụ"
                                        // width={"auto"}
                                        // onClick={this.doneClick} 
                                        />
                                        <Button
                                            text="Tìm Kiếm"
                                        // width={"auto"}
                                        // onClick={this.doneClick} 
                                        />
                                    </div>
                                </div>
                                <DataGrid column={[{ caption: 'Loại khám', width: 100 }, { caption: 'Bác sỹ', width: 100 }, { caption: 'Giờ', width: 100 }, { caption: 'Ngày', width: 100 }, { caption: 'Hiệu thuốc', width: 100 }]} propertyHeight={250} onCellDblClick={handleOnDbClickCell} dataSource={dataSource} />
                            </GroupItem>
                            <GroupItem caption="">
                                <Form
                                    colCount={1}
                                    id="form"
                                    // formData={employee}
                                    labelLocation={'top'}
                                    readOnly={false}
                                    showColonAfterLabel={true}
                                    showValidationSummary={true}
                                //validationGroup="customerData"
                                >
                                    <GroupItem caption="">
                                        <DataGrid column={[{ caption: 'Diễn biến bệnh', width: 100 }]} onCellDblClick={handleOnDbClickCell} dataSource={dataSource} />
                                    </GroupItem>
                                    <GroupItem caption="">
                                        <DataGrid column={[{ caption: 'Chẩn Đoán', width: 200 }, { caption: '', width: 100 }]} onCellDblClick={handleOnDbClickCell} dataSource={dataSource} />
                                    </GroupItem>
                                    <GroupItem caption="">
                                        <DataGrid column={[{ caption: 'Mã', width: 100 }, { caption: 'ICD10', width: 100 }]} onCellDblClick={handleOnDbClickCell} dataSource={dataSource} />
                                    </GroupItem>

                                </Form>
                            </GroupItem>
                        </Form>
                    </div>
                </GroupItem>
                <GroupItem>
                    <div style={{ border: "1px solid green", height: "350px", textAlign: "center" }}>
                        <Form
                            colCount={1}
                            id="form"
                            // formData={employee}
                            labelLocation={'top'}
                            readOnly={false}
                            showColonAfterLabel={true}
                            showValidationSummary={true}
                            height={100}
                        //validationGroup="customerData"
                        >
                            <GroupItem caption="">
                                <DataGrid column={[{ caption: 'Tên thuốc', width: 100 }, { caption: 'Giá bán', width: 100 }, { caption: 'Đ.Dùng', width: 100 }, { caption: 'SL', width: 100 }, { caption: 'tổng', width: 100 }, { caption: 'C.dùng', width: 100 }, { caption: 'T.hiện', width: 100 }, { caption: 'Cách dùng chi tiết', width: 100 }]} propertySelection={true} propertyHeight={200} onCellDblClick={handleOnDbClickCell} dataSource={isChecked && dataSource} />
                                <Form
                                    colCount={5}
                                    id="form"
                                    // formData={employee}
                                    labelLocation={'left'}
                                    readOnly={false}
                                    showColonAfterLabel={true}
                                    showValidationSummary={true}
                                //validationGroup="customerData"
                                >
                                    <GroupItem caption="">
                                        <a href="">Chi tiết quota</a>
                                    </GroupItem>
                                    <GroupItem caption="">
                                        <a href="">Chi tiết quota</a>
                                    </GroupItem>
                                    <GroupItem caption="">
                                        <a href="">Chi tiết quota</a>
                                    </GroupItem>
                                    <GroupItem caption="">
                                        <a href="">Chi tiết quota</a>
                                    </GroupItem>
                                    <GroupItem caption="">
                                        <a href="">Chi tiết quota</a>
                                    </GroupItem>
                                </Form>
                                <Form
                                    colCount={2}
                                    id="form"
                                    // formData={employee}
                                    labelLocation={'left'}
                                    readOnly={false}
                                    showColonAfterLabel={true}
                                    showValidationSummary={true}
                                >
                                    <GroupItem caption="">
                                        <Item dataField="Loại Khám" editorType="dxSelectBox"
                                        // editorOptions={positionEditorOptions}
                                        // validationRules={this.validationRules.position} 
                                        />

                                    </GroupItem>
                                    <SimpleItem dataField="Y Lệnh" />
                                    <GroupItem caption="">
                                        <Item dataField="Dặn dò" editorType="dxSelectBox"
                                        // editorOptions={positionEditorOptions}
                                        // validationRules={this.validationRules.position} 
                                        />

                                    </GroupItem>
                                    <SimpleItem dataField="Tái khám" />
                                </Form>

                                <Form
                                    colCount={1}
                                    id="form"
                                    // formData={employee}
                                    labelLocation={'left'}
                                    readOnly={false}
                                    showColonAfterLabel={true}
                                    showValidationSummary={true}
                                >
                                    <GroupItem caption="">
                                        <SimpleItem dataField="Tái khám" />
                                    </GroupItem>

                                </Form>
                            </GroupItem>
                        </Form>
                    </div>
                </GroupItem>
            </Form>
            <PopupCustom popupVisible={isChecked} onChangeVisible={()=>setIsChecked(!isChecked)} />
        </>
        
    )
}

const BenhAnComponent = () => {
    return (
        <KeepAlive>
            <React.Fragment>
                <GridTop />
                <GridBody />
            </React.Fragment>
        </KeepAlive>

    )
}

export default BenhAnComponent;