import React, { useEffect, useState, useContext, useRef } from "react";

// import "devextreme/dist/css/dx.dark.css";
import "devexpress-richedit/dist/dx.richedit.css";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.material.blue.light.compact.css";
import {
  create,
  RichEdit,
  DocumentFormat,
  MailMergeTabCommandId,
  RibbonTabType,
  MailMergeTabItemId,
} from "devexpress-richedit";
import ApplyButton from "./Button";
import documentAsBase64 from "./data/docs";
import { getApi, patchApi } from "../../callApi";
import "./template-contract.scss";
import "./richtext-editor.scss";
import DataSource from "devextreme/data/data_source";
import ArrayStore from "devextreme/data/array_store";
import { ThemContext } from "./Context";
var rich = RichEdit;
export default function RichEditComponent() {
  const renderCount = useRef(0);
  console.log(renderCount.current++, "rich text");
  const [noidungsua, setnoidungsua] = useState("");
  const { hopdong, setName, name, options } = useContext(ThemContext);
  const [employees, setEmployees] = useState([]);
  const dataEmployee = new DataSource({
    store: new ArrayStore({
      data: employees,
    }),

  });
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

    getApi(
      `users?join=chucvu%7C%7Cid,tenchucvu&join=chucdanh&join=thoihanhopdong&join=dmhopdong&join=dmtrinhdo&join=dmdantoc&join=dmquoctich&join=dmloaitinhluong&join=dmnganhang&join=dmdonvi&join=dmbophan&join=dmphongban&join=dmloaikhoi&join=tinhtranghonnhan&join=chuyenkhoa&join=nhanvienhopdongs&join=nccmnd&join=nccchn&join=phamvichungchihanhnghe&join=phamvihanhnghebosung&join=dienthianhvans&join=nhanvienbangcaps&join=nhanvienbangcaps.loaibangcap&join=nhanvienhopdongs.loaihopdong`
    ).then((data) => {
      setEmployees(data?.data?.data);
    });
  }, []);

  useEffect(() => {
    rich.mailMergeOptions.setDataSource(dataEmployee);
  }, [employees]);
  useEffect(() => {
    try {
      if(hopdong?.noidung){
        rich.openDocument(hopdong?.noidung, "DocumentName", DocumentFormat.Rtf);
      }else{
        rich.newDocument()
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
      patchApi(`templatehd/${hopdong?.id}`, dataChanged).then(() => {
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
      <ApplyButton click={handleSave} />
      <div id="richEdit"></div>
    </>
  );
}
