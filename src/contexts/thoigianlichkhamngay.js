import { getModule } from 'api';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';


const INIT = {
}
const reducer = (state = INIT, action) => {
  switch (action.type) {
    case "add":
  
      return {
        ...state, ...action.payload
      }

    default:
      return 1
  }
}



function ThoigianlichkhamngayProvider(props) {
  const [id, setId] = useState(null)
  const [module, setModule] = useState()
  const [state, dispatch] = useReducer(reducer, INIT)

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
    
    <ThoigianlichkhamngayContext.Provider value={{ id, setIdLichkhamngay, module, dispatch, state }} {...props} />
  );
}

const  ThoigianlichkhamngayContext = createContext({});
const useThoigianlichkhamngay = () => useContext(ThoigianlichkhamngayContext);

export { ThoigianlichkhamngayProvider, useThoigianlichkhamngay };

