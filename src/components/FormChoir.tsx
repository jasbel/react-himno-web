import { AddContext } from "@src/screens/AddHimnoScreen";
import { useContext } from "react";

interface Props {
  choirId: string;
  handleAction: (v: 'add' | 'change' | 'remove') => void;
}

const FormChoir = ({choirId = 'lorem', handleAction}: Props) => {
  const { state, updateState } = useContext(AddContext);
  const  {chorus} = state
  const action = (value: 'add' | 'change' | 'remove') => {
    handleAction(value);
  };

  const getChoir = ()=> {
   return chorus.find(c => c.id === choirId)?.choir || ''
  }

  return (
    <div style={{minHeight: '200px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid black',
      borderRadius: '12px'

    }}>
      <div>{getChoir().split('\\n').map(c => (<p>{c}</p>))}</div>
      <div className="btn-wrap" style={style}>
        <button style={btnStyle} onChange={() => action('add')}>Agregar</button>
        <button style={btnStyle} onChange={() => action('change')}>Cambiar</button>
        <button style={btnStyle} onChange={() => action('remove')}>Borrar</button>
      </div>
    </div>
  );
};

export default FormChoir;

const style: React.CSSProperties = {
  background: 'red',
  display:  'flex',
  gap: '8px',
  padding: '12px',
  justifyContent: 'center',
  alignItems: 'center'

  // display: 'none'
}
const btnStyle: React.CSSProperties = {
  background: 'skyblue',
  padding: '8px 12px',
  borderRadius: '40px',

  // display: 'none'
}