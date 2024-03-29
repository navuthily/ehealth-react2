import React, { useEffect, useState, useContext } from "react";
import { ThemContext } from "../template-contract/Context";
// import "devextreme/dist/css/dx.dark.css";
import "devexpress-richedit/dist/dx.richedit.css";
import moment from "moment";
import "devextreme/dist/css/dx.light.compact.css";
import { create, RichEdit, DocumentFormat } from "devexpress-richedit";
import { Button } from "devextreme-react";
import options from "./options";
import { CRUDNhanvien, CRUDHopdongNhanvien } from "api";
import DataSource from "devextreme/data/data_source";
import ArrayStore from "devextreme/data/array_store";
var rich = RichEdit;
function flattenObject(ob) {
  var toReturn = {};
  function isIsoDate(str) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
    var d = new Date(str);
    return d.toISOString() === str;
  }
  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if (typeof ob[i] == "object" && ob[i] !== null) {
      var flatObject = flattenObject(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;
        if (isIsoDate(flatObject[x]) === true) {
          flatObject[x] = moment(flatObject[x]).format("DD/MM/YYYY");
        }
        toReturn[x] = flatObject[x];
      }
    } else {
      if (isIsoDate(ob[i]) === true) {
        ob[i] = moment(ob[i]).format("DD/MM/YYYY");
      }
      if(ob[i]===null){
        console.log(ob[i]);
        ob[i]=''
      }
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
}

export default function RichTextContract() {
  const { templateContract, idNhanvien, hopdong, setName } =
    useContext(ThemContext);
  const [employee, setEmployee] = useState([]);
  const [noidungsua, setnoidungsua] = useState(null);

  const dataEmployee = new DataSource({
    store: new ArrayStore({
      data: [flattenObject(employee)],
    }),
  });
  const sendRequest = async (method = "GET", data = {}) => {
    if (method === "GET") {
      return await CRUDNhanvien(method, { key: idNhanvien });
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
    try {
      rich.saveDocument(DocumentFormat.Rtf);

      if (templateContract?.noidung) {
        rich.openDocument(
          templateContract?.noidung,
          "DocumentName",
          DocumentFormat.Rtf,
          () => {
            rich.mailMergeOptions.viewMergedData = false;
            rich.mailMergeOptions.viewMergedData = true;
          }
        );
      } else {
        rich.newDocument();
      }
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
  const handleSave = (e) => {
    rich.saveDocument(DocumentFormat.Rtf);
    e.handled = false;
  };
  return (
    <>
      <Button
        icon="save"
        text="Lưu"
        onClick={handleSave}
        type="success"
        className="btnStyle"
      />
      <div id="richEdit"></div>
    </>
  );
}
