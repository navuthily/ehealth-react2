import React from "react";
import KeepAlive from "react-activation";
import  { GroupItem, Item, SimpleItem ,Form } from 'devextreme-react/form';
import { Button, SelectBox, Tabs } from "devextreme-react";
import ButtonCustom from "assets/button/button";
import './style.scss';
import DataGridCustom from "assets/grid/datagrid";
import { CheckBox } from 'devextreme-react/check-box';

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
export const GridTop = () => {
    return (
        <>
            <React.Fragment>
          
                    {/* <Form
                        colCount={2}
                        id="form"
                        formData={{}}
                        labelLocation={'left'}
                        readOnly={true}
                        showColonAfterLabel={true}
                        showValidationSummary={true}
                    //validationGroup="customerData"
                    >
                        <GroupItem caption="">
                            <div style={{ border: "0.5px solid", boxShadow: "2px  2px #888888", height: "120px", textAlign: "center" }}>
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
                                    colCount={8}
                                    id="form"
                                    // formData={employee}
                                    labelLocation={'left'}
                                    readOnly={true}
                                    showColonAfterLabel={true}
                                    showValidationSummary={true}
                                //validationGroup="customerData"
                                >
                                    <SimpleItem dataField="H" editorOptions={{ value: '' }} />
                                    <SimpleItem dataField="W" editorOptions={{ value: '' }} />
                                    <SimpleItem dataField="Ps" editorOptions={{ value: '' }} />
                                    <SimpleItem dataField="Pd" editorOptions={{ value: '' }} />
                                    <SimpleItem dataField="Hr" editorOptions={{ value: '' }} />
                                    <SimpleItem dataField="T" editorOptions={{ value: '' }} />
                                    <GroupItem caption="">
                                        <Button
                                            accessKey={'chidinh'}
                                            type="danger"
                                            text="Chỉ định"
                                            width={withButtonEditorOptions}
                                        // onClick={handleButtonClick}
                                        // onClick={this.doneClick} 
                                        />
                                    </GroupItem>
                                    <GroupItem caption="">
                                        <Button
                                            accessKey={'ghichu'}
                                            type="danger"
                                            text="Ghi Chú"
                                            width={withButtonEditorOptions}
                                        // onClick={handleButtonClick}
                                        // onClick={this.doneClick} 
                                        />
                                    </GroupItem>
                                </Form>
                            </div>
                        </GroupItem>
                        <GroupItem caption="">
                            <div style={{ border: "0.5px solid", boxShadow: "2px 2px #888888", height: "120px", textAlign: "center" }}>
                                <Form
                                    colCount={2}
                                    id="form"
                                    // formData={employee}
                                    // labelLocation={'top'}
                                    readOnly={true}
                                    showColonAfterLabel={true}
                                    showValidationSummary={true}
                                //validationGroup="customerData"
                                >
                                    <GroupItem caption="">
                                        <Form
                                            colCount={3}
                                            id="form"
                                            // formData={employee}
                                            labelLocation={'top'}
                                            readOnly={true}
                                            showColonAfterLabel={true}
                                            showValidationSummary={true}
                                        //validationGroup="customerData"
                                        >
                                            <SimpleItem dataField="Hẹn gần" editorOptions={{ value: '' }} />
                                            <SimpleItem dataField="Hẹn Xa" editorOptions={{ value: '' }} />
                                            <SimpleItem dataField="Người nhập KQ" editorOptions={{ value: '' }} />
                                        </Form>
                                        <Form
                                            colCount={4}
                                            id="form"
                                            // formData={employee}
                                            labelLocation={'left'}
                                            readOnly={true}
                                            showColonAfterLabel={true}
                                            showValidationSummary={true}
                                        //validationGroup="customerData"
                                        >
                                            <GroupItem caption="">
                                                <Button
                                                    accessKey={'sua'}
                                                    type="success"
                                                    text="Sửa"
                                                    width={50}
                                                // onClick={handleButtonClick}
                                                // onClick={this.doneClick} 
                                                />
                                            </GroupItem>
                                            <GroupItem caption="">
                                                <Button
                                                    accessKey={'dalaybp'}
                                                    type="success"
                                                    text="Đã lấy BP"
                                                    width={withButtonEditorOptions}
                                                // onClick={handleButtonClick}
                                                // onClick={this.doneClick} 
                                                />
                                            </GroupItem>
                                            <GroupItem caption="">
                                                <Button
                                                    accessKey={'dathuchien'}
                                                    type="success"
                                                    text="Đã Thực Hiện"
                                                    width={withButtonEditorOptions}
                                                // onClick={handleButtonClick}
                                                // onClick={this.doneClick} 
                                                />
                                            </GroupItem>
                                            <GroupItem caption="">
                                                <Button
                                                    accessKey={'sangloctruocsinh'}
                                                    type="success"
                                                    text="Sàng lọc trước sinh"
                                                    width={withButtonEditorOptions}
                                                // onClick={handleButtonClick}
                                                // onClick={this.doneClick} 
                                                />
                                            </GroupItem>
                                        </Form>
                                    </GroupItem>
                                    <GroupItem>
                                        <Form
                                            colCount={2}
                                            id="form"
                                            labelLocation={'top'}
                                            showColonAfterLabel={true}
                                            showValidationSummary={true}
                                            readOnly={true}
                                        >
                                            <GroupItem caption="">
                                                <SimpleItem dataField="H" editorOptions={{ value: '' }} />
                                            </GroupItem>
                                            <GroupItem caption="">
                                                <SimpleItem dataField="W" editorOptions={{ value: '' }} />
                                            </GroupItem>
                                        </Form>
                                        <Form
                                            colCount={1}
                                            id="form"
                                            labelLocation={'top'}
                                            showColonAfterLabel={true}
                                            showValidationSummary={true}
                                        >
                                            <GroupItem>
                                                <Button
                                                    accessKey={'sangloctruocsinh'}
                                                    type="success"
                                                    text="RENAL,LDLC,LIPID"
                                                    width={withButtonEditorOptions}
                                                // onClick={handleButtonClick}
                                                // onClick={this.doneClick} 
                                                />
                                            </GroupItem>
                                        </Form>
                                    </GroupItem>
                                </Form>
                            </div>
                        </GroupItem>
                    </Form >
        */}
            </React.Fragment >
        </>
    )
}
export const GridBody = () => {
    const handleOnDbClickCell = () => { };
    return (
        <>
            <React.Fragment>
                {/* <Form
                    colCount={2}
                    id="form"
                    formData={{}}
                    // labelLocation={'left'}
                    readOnly={false}
                    showColonAfterLabel={true}
                    showValidationSummary={true}
                //validationGroup="customerData"
                >
                    <GroupItem caption="">
                        <DataGridCustom column={[{ caption: 'Tên thuốc' }, { caption: 'Giá bán' }, { caption: 'Đ.Dùng' }, { caption: 'SL' }, { caption: 'tổng' }, { caption: 'C.dùng' }, { caption: 'T.hiện' }, { caption: 'Cách dùng chi tiết' }]} propertySelection={true} propertyHeight={110} onCellDblClick={handleOnDbClickCell} />
                        <DataGridCustom column={[{ caption: 'Tên thuốc' }, { caption: 'Giá bán' }, { caption: 'Đ.Dùng' }, { caption: 'SL' }, { caption: 'tổng' }, { caption: 'C.dùng' }, { caption: 'T.hiện' }, { caption: 'Cách dùng chi tiết' }]} propertySelection={true} propertyHeight={210} onCellDblClick={handleOnDbClickCell} />
                        <DataGridCustom column={[{ caption: 'Tên thuốc' }, { caption: 'Giá bán' }, { caption: 'Đ.Dùng' }, { caption: 'SL' }, { caption: 'tổng' }, { caption: 'C.dùng' }, { caption: 'T.hiện' }, { caption: 'Cách dùng chi tiết' }]} propertySelection={true} propertyHeight={110} onCellDblClick={handleOnDbClickCell} />

                    </GroupItem>
                    <GroupItem caption="">
                        <div style={{border: "0.5px solid", boxShadow: "2px 2px #888888", height: "113px", textAlign: "center" }}>
                            <Form
                                colCount={2}
                                id="form"
                                // formData={employee}
                                labelLocation={'left'}
                                readOnly={true}
                                showColonAfterLabel={true}
                                showValidationSummary={true}
                            //validationGroup="customerData"
                            >
                                <GroupItem>
                                    <Form
                                        colCount={2}
                                        id="form"
                                        // formData={employee}
                                        labelLocation={'left'}
                                        readOnly={true}
                                        showColonAfterLabel={true}
                                        showValidationSummary={true}
                                    //validationGroup="customerData"
                                    >
                                        <SimpleItem dataField="Giờ khám" editorOptions={{ value: '15:31 14/10/2021' }} />
                                        <GroupItem>
                                            <CheckBox defaultValue={false} text="In rút gọn" />
                                            <CheckBox defaultValue={false} text="In chữ ký" />

                                        </GroupItem>
                                    </Form>
                                </GroupItem>
                                <GroupItem>
                                    <Form
                                        colCount={4}
                                        id="form"
                                        // formData={employee}
                                        labelLocation={'left'}
                                        readOnly={true}
                                        // showColonAfterLabel={true}
                                        // showValidationSummary={true}
                                    //validationGroup="customerData"
                                    >
                                        <GroupItem>
                                            <Button
                                                accessKey={'reload'}
                                                type="success"
                                                text="reload"
                                                width={50}
                                            // onClick={handleButtonClick}
                                            // onClick={this.doneClick} 
                                            />
                                        </GroupItem>
                                        <GroupItem>
                                            <Button
                                                accessKey={'inta'}
                                                type="success"
                                                text="In TA"
                                                width={50}
                                            // onClick={handleButtonClick}
                                            // onClick={this.doneClick} 
                                            />
                                        </GroupItem>
                                        <GroupItem>
                                            <Button
                                                accessKey={'insars'}
                                                type="success"
                                                text="In Sars"
                                                width={50}
                                            // onClick={handleButtonClick}
                                            // onClick={this.doneClick} 
                                            />
                                        </GroupItem>
                                        <GroupItem>
                                            <Button
                                                accessKey={'xemin'}
                                                type="success"
                                                text="xemin"
                                                width={50}
                                            // onClick={handleButtonClick}
                                            // onClick={this.doneClick} 
                                            />
                                        </GroupItem>
                                    </Form>
                                </GroupItem>
                            </Form>
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
                                <GroupItem>
                                    <SimpleItem dataField="Sample ID" editorOptions={{ value: '989901' }} />
                                </GroupItem>
                                <GroupItem>
                                    <Item dataField="KQ" editorType="dxSelectBox"
                                    // editorOptions={positionEditorOptions}
                                    // validationRules={this.validationRules.position} 
                                    />
                                </GroupItem>
                                <GroupItem>
                                    <Item editorType="dxSelectBox" dataField="Loại XN" />
                                </GroupItem>
                                <GroupItem>
                                    <Item editorType="dxSelectBox" dataField="Chỉ số" />
                                </GroupItem>
                                <GroupItem>
                                    <Item editorType="dxSelectBox" dataField="XN Trùng" />
                                </GroupItem>
                            </Form>
                        </div>
                        <DataGridCustom column={[{ caption: 'Tên thuốc' }, { caption: 'Giá bán' }, { caption: 'Đ.Dùng' }, { caption: 'SL' }, { caption: 'tổng' }, { caption: 'C.dùng' }, { caption: 'T.hiện' }, { caption: 'Cách dùng chi tiết' }]} propertySelection={true} propertyHeight={330} onCellDblClick={handleOnDbClickCell} />
                    </GroupItem>
                </Form > */}
            </React.Fragment >
        </>
    )
}

export default function XenghiemLabo() {
    return (
        <KeepAlive>
            <React.Fragment>
                <GridTop />
                <GridBody />
            </React.Fragment>
        </KeepAlive>
    )
}