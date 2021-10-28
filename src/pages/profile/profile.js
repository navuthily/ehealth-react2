import DataGrid, {
  FilterRow,
  Paging,
  Scrolling,
  Selection,
} from "devextreme-react/data-grid";
import DropDownBox from "devextreme-react/drop-down-box";
import React, { useState } from "react";
import KeepAlive from "react-activation";
import "whatwg-fetch";
const gridColumns = ["CompanyName", "City", "Phone"];

const App = () => {
  const [gridDataSource, setGridDataSource] = useState([
    {
      ID: 1,
      CompanyName: "Premier Buy",
      Address: "7601 Penn Avenue South",
      City: "Richfield",
      State: "Minnesota",
      Zipcode: 55423,
      Phone: "(612) 291-1000",
      Fax: "(612) 291-2001",
      Website: "http://www.nowebsitepremierbuy.com",
    },
    {
      ID: 2,
      CompanyName: "ElectrixMax",
      Address: "263 Shuman Blvd",
      City: "Naperville",
      State: "Illinois",
      Zipcode: 60563,
      Phone: "(630) 438-7800",
      Fax: "(630) 438-7801",
      Website: "http://www.nowebsiteelectrixmax.com",
    },
    {
      ID: 3,
      CompanyName: "Video Emporium",
      Address: "1201 Elm Street",
      City: "Dallas",
      State: "Texas",
      Zipcode: 75270,
      Phone: "(214) 854-3000",
      Fax: "(214) 854-3001",
      Website: "http://www.nowebsitevideoemporium.com",
    },
    {
      ID: 4,
      CompanyName: "Screen Shop",
      Address: "1000 Lowes Blvd",
      City: "Mooresville",
      State: "North Carolina",
      Zipcode: 28117,
      Phone: "(800) 445-6937",
      Fax: "(800) 445-6938",
      Website: "http://www.nowebsitescreenshop.com",
    },
    {
      ID: 5,
      CompanyName: "Braeburn",
      Address: "1 Infinite Loop",
      City: "Cupertino",
      State: "California",
      Zipcode: 95014,
      Phone: "(408) 996-1010",
      Fax: "(408) 996-1012",
      Website: "http://www.nowebsitebraeburn.com",
    },
    {
      ID: 6,
      CompanyName: "PriceCo",
      Address: "30 Hunter Lane",
      City: "Camp Hill",
      State: "Pennsylvania",
      Zipcode: 17011,
      Phone: "(717) 761-2633",
      Fax: "(717) 761-2334",
      Website: "http://www.nowebsitepriceco.com",
    },
    {
      ID: 7,
      CompanyName: "Ultimate Gadget",
      Address: "1557 Watson Blvd",
      City: "Warner Robbins",
      State: "Georgia",
      Zipcode: 31093,
      Phone: "(995) 623-6785",
      Fax: "(995) 623-6786",
      Website: "http://www.nowebsiteultimategadget.com",
    },
    {
      ID: 8,
      CompanyName: "EZ Stop",
      Address: "618 Michillinda Ave.",
      City: "Arcadia",
      State: "California",
      Zipcode: 91007,
      Phone: "(626) 265-8632",
      Fax: "(626) 265-8633",
      Website: "http://www.nowebsiteezstop.com",
    },
    {
      ID: 9,
      CompanyName: "Clicker",
      Address: "1100 W. Artesia Blvd.",
      City: "Compton",
      State: "California",
      Zipcode: 90220,
      Phone: "(310) 884-9000",
      Fax: "(310) 884-9001",
      Website: "http://www.nowebsiteclicker.com",
    },
    {
      ID: 10,
      CompanyName: "Store of America",
      Address: "2401 Utah Ave. South",
      City: "Seattle",
      State: "Washington",
      Zipcode: 98134,
      Phone: "(206) 447-1575",
      Fax: "(206) 447-1576",
      Website: "http://www.nowebsiteamerica.com",
    },
    {
      ID: 11,
      CompanyName: "Zone Toys",
      Address: "1945 S Cienega Boulevard",
      City: "Los Angeles",
      State: "California",
      Zipcode: 90034,
      Phone: "(310) 237-5642",
      Fax: "(310) 237-5643",
      Website: "http://www.nowebsitezonetoys.com",
    },
    {
      ID: 12,
      CompanyName: "ACME",
      Address: "2525 E El Segundo Blvd",
      City: "El Segundo",
      State: "California",
      Zipcode: 90245,
      Phone: "(310) 536-0611",
      Fax: "(310) 536-0612",
      Website: "http://www.nowebsiteacme.com",
    },
  ]);
  const [gridBoxValue, setGridBoxValue] = useState([]);
  const [isGridBoxOpened, setIsGridBoxOpened] = useState(false);
  const [isTreeBoxOpened, setIsTreeBoxOpened] = useState(false);

  function dataGridRender() {
    return (
      <DataGrid
        dataSource={gridDataSource}
        columns={gridColumns}
        hoverStateEnabled={true}
        selectedRowKeys={gridBoxValue}
        onSelectionChanged={dataGrid_onSelectionChanged}
        height="100%"
      >
        <Selection mode="single" />
        <Scrolling mode="virtual" />
        <Paging enabled={true} pageSize={10} />
        <FilterRow visible={true} />
      </DataGrid>
    );
  }

  function syncDataGridSelection(e) {
    setGridBoxValue(e?.value);
  }

  function dataGrid_onSelectionChanged(e) {
    setGridBoxValue([
      e?.selectedRowKeys[0]?.ID
        ? e?.selectedRowKeys[0]?.ID
        : e?.currentDeselectedRowKeys[0]?.ID,
    ]);
    setIsGridBoxOpened(false);
  }

  function gridBox_displayExpr(item) {
    return item && `${item?.CompanyName} <${item?.Phone}>`;
  }
  function onGridBoxOpened(e) {
    if (e.name === "opened") {
      setIsGridBoxOpened(e?.value);
    }
  }

  return (
    <KeepAlive>
      <React.Fragment>
        <div className="dx-fieldset">
          <div className="dx-field">
            <div className="dx-field-value">
              <DropDownBox
                value={gridBoxValue}
                opened={isGridBoxOpened}
                valueExpr="ID"
                deferRendering={false}
                displayExpr={gridBox_displayExpr}
                placeholder="Select a value..."
                showClearButton={true}
                dataSource={gridDataSource}
                onValueChanged={syncDataGridSelection}
                onOptionChanged={onGridBoxOpened}
                contentRender={dataGridRender}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
      </KeepAlive>
  );
};

export default App;
