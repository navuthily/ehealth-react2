import { useThoigianlichkhamngay } from 'contexts/thoigianlichkhamngay';
import Thoigianlichhenkhamngay from './thoigianlichhenkhamngay';

export default function ThoigianlichhenkhamngayHOC() {
  const { setIdLichkhamngay, module, dispatch, state } = useThoigianlichkhamngay();

  return (
    <>
      {module &&
        <Thoigianlichhenkhamngay 
          setId={setIdLichkhamngay}
          module={module}
          dispatch={dispatch}
          state={state}
        
        />
      }    
    </>



  )
}
