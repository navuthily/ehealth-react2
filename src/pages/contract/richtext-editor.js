import React, { useEffect, useState, useContext } from "react";
import { ThemContext } from "../template-contract/Context";
import CustomStore from "devextreme/data/custom_store";
// import "devextreme/dist/css/dx.dark.css";
import "devexpress-richedit/dist/dx.richedit.css";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.material.blue.light.compact.css";
import {
  create,
  RichEdit,
  DocumentFormat,

} from "devexpress-richedit";

import options from "./options";
import { CRUDNhanvien, CRUDHopdongNhanvien } from "api";
import DataSource from "devextreme/data/data_source";
import ArrayStore from "devextreme/data/array_store";
var rich = RichEdit;
export default function RichTextContract() {
  const { templateContract, idNhanvien, hopdong, setName } =
    useContext(ThemContext);
  const [employee, setEmployee] = useState([]);
  const [noidungsua, setnoidungsua] = useState(null);
  const dataEmployee = new DataSource({
    store: new ArrayStore({
      data: [employee],
    }),
  });
  const sendRequest = async (method = "GET", data = {}) => {
    if (method === "GET") {
      return await CRUDNhanvien(method, {key:idNhanvien});
    }

    if (data) {
      return await CRUDNhanvien(method, data);
    }
  };
  const sendRequestEmployeeContract = async (method, data = {}) => {
    if (method === "GET") {
      return await CRUDHopdongNhanvien(method, idNhanvien);
    }

    if (data) {
      return await CRUDHopdongNhanvien(method, data);
    }
  };
  useEffect(() => {
    const richEditEl = document.getElementById("richEdit");
    try {
      rich = create(richEditEl, options);

      rich.saveDocument(DocumentFormat.Rtf);
    } catch (error) {
      console.log("Rich ERROR", error);
    }
    sendRequest("GET", idNhanvien).then((data) => {
      setEmployee(data);
    });
  }, []);

  useEffect(() => {
    console.log("select temp...");
    try {
      rich.saveDocument(DocumentFormat.Rtf);

      if (templateContract?.noidung) {
        rich.openDocument(
          templateContract?.noidung,
          "DocumentName",
          DocumentFormat.Rtf
          ,()=>{
            rich.mailMergeOptions.viewMergedData = false;
            rich.mailMergeOptions.viewMergedData = true;
          }
        );
      } else {
        rich.newDocument();
      }
      console.log(dataEmployee);



      rich.mailMergeOptions.setDataSource(dataEmployee);


    } catch (error) {
      console.log("Rich ERROR", error);
    }
  }, [templateContract]);

  useEffect(() => {
    const dataChanged = {
      ...hopdong,
      noidunghopdong: noidungsua,
    };
    if (hopdong) {
      sendRequestEmployeeContract("PATCH", {
        values: dataChanged,
        key: hopdong?.id,
      }).then(() => {
        setName(noidungsua);
      });
    }
  }, [noidungsua]);

  useEffect(() => {
    try {
      if (hopdong?.noidunghopdong) {
        rich.openDocument(
          hopdong?.noidunghopdong,
          "DocumentName",
          DocumentFormat.Rtf
        );
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

  return (
    <>
      <div id="richEdit"></div>
    </>
  );
}
