import DataGrid, {
    Column, FilterRow, Pager,
    Paging, Scrolling, Selection
} from 'devextreme-react/data-grid';
import 'devextreme/data/odata/store';
import React, { useRef } from "react";
import './style.scss';

const priorities = [
    { name: 'High', value: 4 },
    { name: 'Urgent', value: 3 },
    { name: 'Normal', value: 2 },
    { name: 'Low', value: 1 }
];


const DataGridCustom = (props: any) => {
    const stageCanvasRef: any = useRef();
    const propertyColumn = props.column;
    const { propertyHeight, propertySelection, onCellDblClick, dataSource,filterRow } = props;
    return (
        <></>
        // <DataGrid
        //     className={'dx-card wide-card'}
        //     dataSource={dataSource}
        //     showBorders={true}
        //     focusedRowEnabled={true}
        //     defaultFocusedRowIndex={0}
        //     columnAutoWidth={true}
        //     height={propertyHeight || 100}
        //     width={"100%"}
        //     remoteOperations={true}
        //     ref={stageCanvasRef}
        //     onCellDblClick={onCellDblClick}
        // >
        //     <Scrolling mode="virtual" rowRenderingMode="virtual" />
        //     {/* <Paging defaultPageSize={2} /> */}
        //     <Pager showPageSizeSelector={true} showInfo={true} />
        //     {propertySelection && <Selection
        //         mode="multiple"
        //         selectAllMode={"always"}
        //         showCheckBoxesMode={'onClick'}
        //     />}

        //     { filterRow &&  <FilterRow visible={true} />}

        //     {/* <Column dataField={'Task_Status'} caption={'Loại Khám'} width={100} /> */}
        //     {propertyColumn.map((index: any, key: any) => {
        //         if(dataSource){
        //             return <Column dataField={dataSource?.select[key]} caption={index.caption} width={index.width} key={index.dataField + '_' + key} />
        //         }
        //         else{
        //             return <Column caption={index.caption} width={index.width} key={index.dataField + '_' + key} />
        //         }
        //     })}
        // </DataGrid>
    );
}
export default DataGridCustom