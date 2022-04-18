import { getModule } from 'api';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import dayjs from 'dayjs'




function ThoigianlichkhamngayProvider(props) {
  const [id, setId] = useState(null)
  const [moduleId, setModuleId] = useState(null)
  const [module, setModule] = useState()
  const [searchDate, setSearchDate] = useState({
    startDate: dayjs().startOf('year'),
    endDate: dayjs().endOf('year')
  })

  const [selectedRowIndex, setSelectedRowIndex] = useState(-1)




  useEffect(() => {
    const getData = async() => {
        const module = await getModule();
        if(module){
          setModule(module)
        }
    }
    return getData()




  },[])

  const setIdLichkhamngay = useCallback((id) => {
    setId(id)
  }, [])



  // const DSModule = useMemo(() => {
  //   return module
  // }, [])

  return (
    
    <ThoigianlichkhamngayContext.Provider value={{ id, setIdLichkhamngay, module, searchDate, selectedRowIndex, setSelectedRowIndex, moduleId, setModuleId }} {...props} />
  );
}

const  ThoigianlichkhamngayContext = createContext({});
const useThoigianlichkhamngay = () => useContext(ThoigianlichkhamngayContext);

export { ThoigianlichkhamngayProvider, useThoigianlichkhamngay };

