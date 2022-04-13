import { useThoigianlichkhamngay } from "contexts/thoigianlichkhamngay";
import ThoiGianLichHenGio from "./thoigianlichhenkhamgio";

export default function ThoigianlichhenkhamgioHOC() {
  const { id } = useThoigianlichkhamngay();
  return (
    <ThoiGianLichHenGio id={id}/>

  )
}
