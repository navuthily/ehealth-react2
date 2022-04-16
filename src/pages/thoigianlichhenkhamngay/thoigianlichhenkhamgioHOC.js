import { useThoigianlichkhamngay } from "contexts/thoigianlichkhamngay.context";
import ThoiGianLichHenGio from "./thoigianlichhenkhamgio";

export default function ThoigianlichhenkhamgioHOC() {
  const { id } = useThoigianlichkhamngay();
  return (
    <ThoiGianLichHenGio id={id}/>

  )
}
