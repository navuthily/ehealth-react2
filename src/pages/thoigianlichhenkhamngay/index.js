// import {  } from 'devextreme-react';
import { ThoigianlichkhamngayProvider } from 'contexts/thoigianlichkhamngay.context';
import { DateBox, Form } from 'devextreme-react';
import { ButtonItem, GroupItem, Item, SimpleItem } from 'devextreme-react/form';
import { Location } from 'devextreme-react/map';
import ResponsiveBox, { Col, Item as ItemBox, Row } from 'devextreme-react/responsive-box';
import 'whatwg-fetch';
import SearchBox from './searchBox';
import ThoigianlichhenkhamgioHOC from './thoigianlichhenkhamgioHOC';
import ThoigianlichhenkhamngayHOC from './thoigianlichhenkhamngayHOC';




function ThoiGianLichHenKhamNgayWrap() {
  return (

      <ThoigianlichkhamngayProvider>
        <ResponsiveBox>
          <Row/>
          <Row/>
          <Col ratio={1} />
    
          <Col  ratio={1} />      

          <ItemBox>
              <Location screen="xs sm md lg"  row={0} col={0} />

              <SearchBox/>
                {/* <DateBox width={"200"}></DateBox>                */}
           

            </ItemBox>     

          <ItemBox >
            <Location screen="xs sm md lg" row={1} col={0} />

            <ThoigianlichhenkhamngayHOC/>

          </ItemBox>

   
            <ItemBox>
              <Location screen="xs sm md lg" row={1} col={1} />
              <ThoigianlichhenkhamgioHOC/>
            </ItemBox>        
         

        
        </ResponsiveBox>

      </ThoigianlichkhamngayProvider>

   



  );
}

export default ThoiGianLichHenKhamNgayWrap;