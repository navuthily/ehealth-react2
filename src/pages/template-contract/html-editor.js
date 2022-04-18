import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useMemo,
  useLayoutEffect,
} from "react";
import { ThemContext } from "./template-contract";
import HtmlEditor, {
  Toolbar,
  MediaResizing,
  Item,
} from "devextreme-react/html-editor";
import SelectBox from "devextreme-react/select-box";
import CheckBox from "devextreme-react/check-box";
import "./template-contract.scss";
const sizeValues = ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"];
const fontValues = [
  "Arial",
  "Courier New",
  "Georgia",
  "Impact",
  "Lucida Console",
  "Tahoma",
  "Times New Roman",
  "Verdana",
];
const headerValues = [false, 1, 2, 3, 4, 5];
const arrAttribute = [
  { id: 1, name: "địa chỉ" },
  { id: 2, name: "số điện thoại" },
  { id: 3, name: "email" },
];
export default function EditContent() {
  const htmlEditor = useRef();
  const { hopdong, setName, name } = useContext(ThemContext);
const [id, setId] = useState(0);
  const [isMultiline, setIsMultiline] = useState(true);
  const [markup, setMarkup] = useState(hopdong?.noidung);
  function multilineChanged(e) {
    setIsMultiline(e.value);
  }
  useEffect(() => {
    setMarkup(hopdong?.noidung);
  }, [hopdong]);
  function onSaveTemplate() {
    //htmlEditor.current.instance.getText()
    const d = {
      ...hopdong,
      noidung: markup,
      updatedAt: new Date().toISOString(),
    };
    const id = hopdong?.id;
    if (hopdong?.id) {
      fetch(`http://localhost:7000/templatehd/${id}`, {
        method: "PATCH",
        body: JSON.stringify(d),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => setName(markup))
        .catch(() => {
          throw new Error("Data Loading Error");
        });
    }
  }
  const insertTextAtTheBeginning = (data) => {
    // console.log(  htmlEditor.current.instance.getSelection()?.index,'index')
    const item = `{{${data}}}`;
    // if(htmlEditor.current.instance.getSelection()){
      htmlEditor.current.instance.insertText(id, "I will be the first", { 
        bold: true, 
        color: "green" 
    });
    // }
 
  };
  const selectBoxOptions = useMemo(() => {
    return {
      width: 140,
      items: ["All", "Family", "Favorites"],
      onItemClick: function (e) {
        // ...
        console.log(e,'ee')
        // htmlEditor.current.instance.focus()
        // console.log(  htmlEditor.current.instance.getSelection()?.index,'index')
        insertTextAtTheBeginning(e.itemData)
  
      },
    };
  }, []);

  const handleChangeText = (e) => {
    setId(htmlEditor.current.instance.getSelection()?.index)
    setMarkup(e.value);
  };
  return (
        <div className="widget-container">
   
          <HtmlEditor
            height="405px"
            value={markup}
            ref={htmlEditor}
            onValueChanged={handleChangeText}
          >
            <MediaResizing enabled={true} />
            <Toolbar>
              <Item name="undo" />
              <Item name="redo" />
              <Item name="separator" />
              <Item name="size" acceptedValues={sizeValues} />
              <Item name="font" acceptedValues={fontValues} />
              <Item name="separator" />
              <Item name="bold" />
              <Item name="italic" />
              <Item name="strike" />
              <Item name="underline" />
              <Item name="separator" />
              <Item name="alignLeft" />
              <Item name="alignCenter" />
              <Item name="alignRight" />
              <Item name="alignJustify" />
              <Item name="separator" />
              <Item name="orderedList" />
              <Item name="bulletList" />
              <Item name="separator" />
              <Item name="header" acceptedValues={headerValues} />
              <Item name="separator" />
              <Item name="color" />
              <Item name="background" />
              <Item name="separator" />
              <Item name="link" />
              <Item name="image" />
              <Item name="separator" />
              <Item name="clear" />
              <Item name="codeBlock" />
              <Item name="blockquote" />
              <Item name="separator" />
              <Item name="insertTable" />
              <Item name="deleteTable" />
              <Item name="insertRowAbove" />
              <Item name="insertRowBelow" />
              <Item name="deleteRow" />
              <Item name="insertColumnLeft" />
              <Item name="insertColumnRight" />
              <Item name="deleteColumn" />
              <Item widget="dxSelectBox" options={selectBoxOptions} />
            </Toolbar>
          </HtmlEditor>

          <div className="options">
            <div className="caption">Options</div>
            <div className="option">
              <CheckBox
                text="Multiline toolbar"
                value={isMultiline}
                onValueChanged={multilineChanged}
              />
            </div>
          </div>
          <div className="div-save">
            <button onClick={onSaveTemplate}>Save</button>
          </div>
        </div>

  );
}
