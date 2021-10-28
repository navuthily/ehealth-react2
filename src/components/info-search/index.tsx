import React from 'react';
import 'devextreme-react/text-area';
import Form, { SimpleItem, GroupItem, TabbedItem, TabPanelOptions, Tab, ButtonItem, Item } from 'devextreme-react/form';
import {myImages} from 'assets/index';
import './style.css';

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

const InfoSearch = () => {

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
    return (
        <React.Fragment>
            <div className="form-container">
                <div className="left-side">
                    <div className="logo">
                        <span style={{ fontWeight: "bold" }}>Danh sách bệnh nhân</span>
                    </div>
                </div>
                <Form
                    colCount={6}
                    id="form"
                    formData={employee}
                    labelLocation={'left'}
                    readOnly={false}
                    showColonAfterLabel={true}
                    showValidationSummary={true}
                //validationGroup="customerData"
                >
                    <GroupItem caption="">
                        <div style={{ border: "1px solid green", height: "93px", textAlign: "center" }}>
                            <img className="employeePhoto" src={myImages.imagesInfo} height="90px" />
                        </div>
                    </GroupItem>
                    <GroupItem >
                        <SimpleItem dataField="Họ Lót" />
                        <SimpleItem dataField="Mã BN" />
                        <SimpleItem dataField="Dị Ứng" />
                    </GroupItem>
                    <GroupItem>
                        <SimpleItem dataField="Tên" />
                        <SimpleItem dataField="Sample ID" />
                        <Item dataField="Loại Khám" editorType="dxSelectBox"
                            editorOptions={positionEditorOptions}
                        // validationRules={this.validationRules.position} 
                        />
                    </GroupItem>
                    <GroupItem>
                        <SimpleItem dataField="Địa Chỉ" />
                        <SimpleItem dataField="Số BHYT" />
                        <Item dataField="Nghề Nghiệp" editorType="dxSelectBox"
                            editorOptions={positionEditorOptions}
                        // validationRules={this.validationRules.position} 
                        />
                    </GroupItem>
                    <GroupItem>
                        <SimpleItem dataField="Điện Thoại" />
                        <SimpleItem dataField="Ghi Chú" />
                        <Item dataField="Chẩn Đoán" editorType="dxSelectBox"
                            editorOptions={positionEditorOptions}
                        // validationRules={this.validationRules.position} 
                        />
                    </GroupItem>
                    <GroupItem >
                        <Item dataField="Năm Sinh" editorType="dxDateBox"
                            editorOptions={hireDateEditorOptions}
                            validationRules={validationRules.hireDate}
                        />
                        <SimpleItem dataField="Giới Tính" />
                        <Item dataField="Công Ty" editorType="dxSelectBox"
                            editorOptions={positionEditorOptions}
                        // validationRules={this.validationRules.position} 
                        />
                    </GroupItem>
                    {/* <ButtonItem horizontalAlignment="left"
                    //buttonOptions={buttonOptions}
                    /> */}
                </Form>
            </div>
        </React.Fragment>
    );
}

export default InfoSearch;
