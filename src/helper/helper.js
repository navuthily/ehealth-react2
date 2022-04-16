import { formatMessage } from "devextreme/localization";
export default function loadLangguage(key){
  return formatMessage(key) ? formatMessage(key) : key
}