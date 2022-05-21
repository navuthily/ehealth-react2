import { createOptions, ViewType, RichEditUnit } from "devexpress-richedit";

const options = createOptions();

options.bookmarks.visibility = true;
options.bookmarks.color = "#ff0000";

options.confirmOnLosingChanges.enabled = true;
options.confirmOnLosingChanges.message =
  "Are you sure you want to perform the action? All unsaved document data will be lost.";

options.fields.updateFieldsBeforePrint = true;
options.fields.updateFieldsOnPaste = true;
// options.document.protect = 'www'
// options.mailMerge.activeRecord = 2;
// options.mailMerge.viewMergedData = true;
options.mailMerge.activeRecord = 1;
options.mailMerge.viewMergedData = false;
// options.mailMerge.dataSource = [
//   { Name: 'Indy', age: 32 },
//   { Name: 'Andy', age: 28 },
//   { Name: 'Indy', age: 32 },
//   { Name: 'Andy', age: 28 },
// ];
// events
options.events.activeSubDocumentChanged = () => {};
options.events.autoCorrect = () => {};
options.events.calculateDocumentVariable = () => {};
options.events.characterPropertiesChanged = () => {};
options.events.contentInserted = () => {};
options.events.contentRemoved = () => {};
options.events.documentChanged = () => {};
options.events.documentFormatted = () => {};
options.events.documentLoaded = () => {};
options.events.gotFocus = () => {};
options.events.hyperlinkClick = () => {};
options.events.keyDown = () => {};
options.events.keyUp = () => {};
options.events.paragraphPropertiesChanged = () => {};
options.events.lostFocus = () => {};
options.events.pointerDown = () => {};
options.events.pointerUp = () => {};
options.events.saving = (e, s) => {


};
options.events.saved = (e) => {
};
options.events.selectionChanged = () => {};
options.events.customCommandExecuted = (s, e) => {
  switch (e.commandName) {
    case "insertEmailSignature":
      s.document.insertParagraph(s.document.length);
      s.document.insertText(s.document.length, "_________");
      s.document.insertParagraph(s.document.length);
      s.document.insertText(s.document.length, "Best regards,");
      s.document.insertParagraph(s.document.length);
      s.document.insertText(s.document.length, "John Smith");
      s.document.insertParagraph(s.document.length);
      s.document.insertText(s.document.length, "mailto:john@example.com");
      s.document.insertParagraph(s.document.length);
      s.document.insertText(s.document.length, "+1 (818) 844-0000");
      break;
    default:
      console.log("customCommandExecuted");
  }
};

options.unit = RichEditUnit.Inch;

options.view.viewType = ViewType.PrintLayout;
options.view.simpleViewSettings.paddings = {
  left: 10,
  top: 10,
  right: 10,
  bottom: 10,
};
options.exportUrl = "http://localhost:3030/richserver";

options.readOnly = false;
// options.width = "1000px";
// options.height = "1000px";

export default options;
