import ButtonCustom from 'assets/button/button';
import DataGridCustom from 'assets/grid/datagrid';
import PopupCustom from 'assets/popup/index';
import { SelectBox } from 'devextreme-react';
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
                {/* <Form
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
                        <div style={{ border: "0.5px solid", boxShadow: "2px 2px #888888",height: "120px", textAlign: "center" }}>
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
                        <div style={{ border: "0.5px solid", boxShadow: "2px 2px #888888",height: "120px", textAlign: "center" }}>
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
                                <Item  dataField="Tiền Sử gia đình" editorType="dxTextArea" editorOptions={notesEditorOptions} icon="user" />
                                <Item dataField="Tiền Sử bệnh nhân" editorType="dxTextArea" editorOptions={notesEditorOptions} />
                                <Item dataField="Dị ứng" editorType="dxTextArea" editorOptions={notesEditorOptions} />
                            </Form>
                        </div>
                    </GroupItem>
                </Form > */}
            </div >
        </React.Fragment >
    )
}
export const GridBody = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [isProperties, setIsProperties] = useState({});
    const handleOnDbClickCell = (item: any) => {
        console.log(item);
    }
    const handleButtonHoTroNM = (item: any) => {
        setIsChecked(!isChecked);
        setIsProperties({
            title: 'Hỗ trợ ngôn ngữ', width: 400, height: 300, contentRender: () => <div className="dx-field">
                <div className="dx-field-label">Hỗ trợ ngôn ngữ</div>
                <div className="dx-field-value">
                    <SelectBox
                        //   items={this.simpleProducts}
                        placeholder="Choose Product"
                        showClearButton={true} />
                </div>
            </div>
        });
    }
    const handleButtonTimKiem = (item: any) => {
        setIsChecked(!isChecked);
        setIsProperties({ title: '', width: 1000, height: 500, contentRender: () => <DataGridCustom column={[{ caption: 'Tên thuốc' }, { caption: 'Ngày kê đơn' }, { caption: 'Số lượng kê' }, { caption: 'Số lượng lấy' }, { caption: 'Đơn vị' }, { caption: 'Đường dùng' }, { caption: 'Cách dùng' }, { caption: 'Bác sĩ' }]} propertyHeight={350} filterRow={true} dataSource={dataSource} /> });
    }


    return (
        <>
       
            <PopupCustom
                visible={isChecked}
                dragEnabled={false}
                closeOnOutsideClick={false}
                showCloseButton={true}
                showTitle={true}
                container=".dx-viewport"
                // title="Dialog"
                // width={600}
                // height={400}
                onVisibleChange={() => setIsChecked(!isChecked)}
                {...isProperties}
            />
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