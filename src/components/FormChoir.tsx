import { AddContext } from "@/state/AddContext";
import { useContext, useState } from "react";
// import { Modal } from "./Modal";
import type { IChoir, ID } from "@/types/types";
import Modal from "./ui/modal/Modal";

interface Props {
  choirId: string;
  handleAction: (v: 'change' | 'remove') => void;
}

const FormChoir = ({ choirId = 'lorem', handleAction }: Props) => {
  const [openChange, setOpenChange] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentSelect, setCurrentSelect] = useState<ID>();
  const { state, updateState } = useContext(AddContext);
  const { chorus } = state;

  const action = (key: 'change' | 'remove', _state?: IChoir) => {
    if (key === 'remove') {
      handleAction(key);
    }
    if (key === 'change') {
      handleAction(key);

      setCurrentSelect(_state?.id)
    }
  };

  const getChoir = () => {
    return chorus.find(c => c.id === choirId)?.choir || '';
  }

  return (
    <div className={'form-choir__content'}>
      <div className="p-2">
        {/* {state.chorus.map(c => <p>{c.choir}</p>)} */}
        {(chorus.find(c => c.id === choirId)?.choir || '').split('\\n').map(c => (<p>{c}</p>))}
      </div>
      <div className="btn-wrap">

        <Modal
          onAccept={() => {
            setOpenChange(false);
          }}
          onClose={() => setOpenChange(false)}
          isOpen={openChange}
          title="Cambiar"
          trigger={
            <>

              <button style={btnStyle} onClick={() => {
                setOpenChange(true);
              }}>Cambiar</button>
            </>
          }  >
          <div>
            {state.chorus.map(c => {
              return (
                <div key={c.id} >
                  <button style={{
                    padding: 3, borderRadius: 12, border: '1px solid gray', width: '100%', marginBottom: 8,
                    backgroundColor: currentSelect === c.id ? '#e6fff7' : 'transparent'
                  }} onClick={() => action('change', c)}>
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
          isOpen={open}
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
  fontSize: 16

  // display: 'none'
}