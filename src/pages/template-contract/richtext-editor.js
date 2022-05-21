import React, { useEffect, useState, useContext } from "react";

// import "devextreme/dist/css/dx.dark.css";
import "devexpress-richedit/dist/dx.richedit.css";

import "devextreme/dist/css/dx.light.compact.css";
import {
  create,
  RichEdit,
  DocumentFormat,
  RibbonTabType,
  MailMergeTabItemId,
} from "devexpress-richedit";
import { Button } from "devextreme-react";
import "./template-contract.scss";
import "./richtext-editor.scss";
import api from "api/methods";
import DataSource from "devextreme/data/data_source";
import ArrayStore from "devextreme/data/array_store";
import { ThemContext } from "./Context";
import { CRUDMauHopDong } from "api";
import {test} from './data';
var rich = RichEdit;
export default function RichEditComponent() {
  const [noidungsua, setnoidungsua] = useState("");
  const { hopdong, setName, name, options } = useContext(ThemContext);
  const [employees, setEmployees] = useState([]);

  function flattenObject(ob) {
    var toReturn = {};

    for (var i in ob) {
        if (!ob.hasOwnProperty(i)) continue;

        if ((typeof ob[i]) == 'object' && ob[i] !== null) {
            var flatObject = flattenObject(ob[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;

                toReturn[x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
}
  const dataEmployee = new DataSource({
    store: new ArrayStore({
      data:[ flattenObject(test)],
    }),
  });


  const sendRequest = async (method = "GET", data = {}) => {
    if (method === "GET") {
      return await CRUDMauHopDong(method);
    }

    if (data) {
      return await CRUDMauHopDong(method, data);
    }
  };
  useEffect(() => {
    const richEditEl = document.getElementById("richEdit");

    try {
      rich = create(richEditEl, options);
      rich.updateRibbon(function (r) {
        const a = r.getTab(RibbonTabType.MailMerge);
        a.removeItem(MailMergeTabItemId.UpdateAllFields);
        a.removeItem(MailMergeTabItemId.UpdateAllFields);

        for (var enumMember in MailMergeTabItemId) {
          var isValueProperty = parseInt(enumMember, 10) >= 0;
          if (isValueProperty) {
            if (
              MailMergeTabItemId[enumMember] !== "ShowInsertMergeFieldDialog"
            ) {
              a.removeItem(enumMember);
            }
          }
        }
      });

      rich.saveDocument(DocumentFormat.Rtf);
    } catch (error) {
      console.log("Rich ERROR", error);
    }
    api("users?join=chucvu%7C%7Cid,tenchucvu&join=chucdanh&join=thoihanhopdong&join=dmhopdong&join=dmtrinhdo&join=dmdantoc&join=dmquoctich&join=dmloaitinhluong&join=dmnganhang&join=dmdonvi&join=dmbophan&join=dmphongban&join=dmloaikhoi&join=chuyenkhoa&join=nhanvienhopdongs&join=nccmnd&join=nccchn&join=phamvichungchihanhnghe&join=phamvihanhnghebosung&join=dienthianhvans&join=nhanvienbangcaps&join=nhanvienbangcaps.loaibangcap&join=nhanvienhopdongs.loaihopdong", null, "get", null).then((data) => {
      setEmployees(data);
    });


  }, []);

  useEffect(() => {
    rich.mailMergeOptions.setDataSource(dataEmployee);
  }, [employees]);
  useEffect(() => {
    try {
      if (hopdong?.noidung) {
        rich.openDocument(hopdong?.noidung, "DocumentName", DocumentFormat.Rtf);
      } else {
        rich.newDocument();
      }

      rich.events.saving.addHandler(function (s, e) {
        setnoidungsua(e.base64);
        e.handled = false;
      });
    } catch (error) {
      console.log("Rich ERROR", error);
    }
  }, [hopdong]);

  useEffect(() => {
    const dataChanged = {
      ...hopdong,
      noidung: noidungsua,
      updatedBy: 1,
      updatedAt: new Date().toISOString(),
    };

    if (hopdong) {
      sendRequest("PATCH", {
        key: hopdong?.id,
        values: JSON.stringify(dataChanged),
      }).then(()=>{
        console.log("oke")
        setName(noidungsua);
      });
    
    }
  }, [noidungsua]);

  const handleSave = (e) => {
    rich.saveDocument(DocumentFormat.Rtf);
    e.handled = false;
  };
  return (
    <>
    < Button icon="save" text="Lưu" onClick={handleSave} type="success" className='btnStyle'/>
    
      <div id="richEdit"></div>
    </>
  );
}
