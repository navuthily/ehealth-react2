import React, { useState, useMemo,useContext,useEffect } from "react";
import { useParams } from "react-router-dom";
import RichTextContract from "./richtext-editor";
import { getApi, patchApi } from "../../callApi";
export default function Contract() {
  let { id } = useParams();
  useEffect(() => {
    getApi(
      `users/${id}?join=chucvu%7C%7Cid,tenchucvu&join=chucdanh&join=thoihanhopdong&join=dmhopdong&join=dmtrinhdo&join=dmdantoc&join=dmquoctich&join=dmloaitinhluong&join=dmnganhang&join=dmdonvi&join=dmbophan&join=dmphongban&join=dmloaikhoi&join=tinhtranghonnhan&join=chuyenkhoa&join=nhanvienhopdongs&join=nccmnd&join=nccchn&join=phamvichungchihanhnghe&join=phamvihanhnghebosung&join=dienthianhvans&join=nhanvienbangcaps&join=nhanvienbangcaps.loaibangcap&join=nhanvienhopdongs.loaihopdong`
    ).then((data) => {
      console.log(data?.data,"data nè");
    });
  }, []);
  return (

<RichTextContract/> 
  
  );
}
