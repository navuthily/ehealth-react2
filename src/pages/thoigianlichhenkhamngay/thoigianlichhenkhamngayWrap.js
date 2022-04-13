// import {  } from 'devextreme-react';
import { ThoigianlichkhamngayProvider } from 'contexts/thoigianlichkhamngay';
import { Location } from 'devextreme-react/map';
import ResponsiveBox, { Col, Item as ItemBox, Row } from 'devextreme-react/responsive-box';
import 'whatwg-fetch';
import ThoigianlichhenkhamgioHOC from './thoigianlichhenkhamgioHOC';
import ThoigianlichhenkhamngayHOC from './thoigianlichhenkhamngayHOC';




function ThoiGianLichHenKhamNgayWrap() {
  return (

      <ThoigianlichkhamngayProvider>
        <ResponsiveBox>
          <Row/>
          <Col ratio={1} />
    
          <Col  ratio={1} />      

          <ItemBox >
            <Location screen="xs sm md lg" row={0} col={0} />

            <ThoigianlichhenkhamngayHOC/>

          </ItemBox>

   
            <ItemBox>
              <Location screen="xs sm md lg" row={0} col={1} />
              <ThoigianlichhenkhamgioHOC/>
            </ItemBox>        
         

        
        </ResponsiveBox>

      </ThoigianlichkhamngayProvider>

   



  );
}

export default ThoiGianLichHenKhamNgayWrap;