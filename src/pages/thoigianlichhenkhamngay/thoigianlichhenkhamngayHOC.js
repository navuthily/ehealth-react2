import { useThoigianlichkhamngay } from 'contexts/thoigianlichkhamngay.context';
import Thoigianlichhenkhamngay from './thoigianlichhenkhamngay';

export default function ThoigianlichhenkhamngayHOC() {
  const { setIdLichkhamngay, setModuleId, module,  } = useThoigianlichkhamngay();

  return (
    <>
      {module &&
        <Thoigianlichhenkhamngay 
          setId={setIdLichkhamngay}
          module={module}
          setModuleId={setModuleId}

        
        />
      }    
    </>



  )
}
