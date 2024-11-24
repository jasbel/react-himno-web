import { AddContext } from "@/state/AddContext";
import { useContext, useState } from "react";
import { Modal } from "./Modal";
import { IChoir } from "@/types/types";

interface Props {
  choirId: string;
  handleAction: (v:  'change' | 'remove') => void;
}

const FormChoir = ({ choirId = 'lorem', handleAction }: Props) => {
  const [openChange, setOpenChange] = useState(false);
  const [open, setOpen] = useState(false);
  const { state, updateState } = useContext(AddContext);
  const { chorus } = state
  const action = (key:  'change' | 'remove', _state?: IChoir) => {
    if (key === 'remove') {
      handleAction(key);
    }
    if (key === 'change') {
      handleAction(key);
    }
  };

  const getChoir = () => {
    return chorus.find(c => c.id === choirId)?.choir || '';
  }

  return (
    <div className={'form-choir__content'}>
      <div>{getChoir().split('\\n').map(c => (<p>{c}</p>))}</div>
      <div className="btn-wrap">

        <Modal
          onAccept={() => {
            setOpenChange(false);
          }}
          onClose={() => setOpenChange(false)} open={openChange} title="Cambiar"
          trigger={
            <button style={btnStyle} onClick={() => {
              setOpenChange(true);
            }}>Cambiar</button>
          } >
          <div>
            {state.chorus.map(c => {
              return (
                <div key={c.id} >
                  <button onClick={() => action('change', c)}>
                    <span>{c.choir}</span>
                  </button>
                </div>
              )
            })}
          </div>
        </Modal>



        <Modal
          onAccept={() => {
            action('remove')
            setOpen(false);
          }}
          onClose={() => setOpen(false)}
          open={open}
          title="Borrar"
          trigger={
            <button style={btnStyle} onClick={() => {
              setOpen(true);
            }}>Borrar</button>
          }
        >
          <div>
            {/* <button style={btnStyle} onChange={() => action('remove', c)}>Borrar</button> */}
            <h2>Seguro que desea borrar de este parrafo</h2>

          </div>
        </Modal>
      </div>

    </div>
  );
};

export default FormChoir;

const btnStyle: React.CSSProperties = {
  background: 'skyblue',
  padding: '8px 12px',
  borderRadius: '40px',

  // display: 'none'
}