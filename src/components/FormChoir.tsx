import { AddContext } from "@/state/AddContext";
import { useContext, useState } from "react";
import { Modal } from "./Modal";

interface Props {
  choirId: string;
  handleAction: (v: 'add' | 'change' | 'remove') => void;
}

const FormChoir = ({ choirId = 'lorem', handleAction }: Props) => {
  const [open, setOpen] = useState(false);
  const { state, updateState } = useContext(AddContext);
  const { chorus } = state
  const action = (value: 'add' | 'change' | 'remove') => {
    handleAction(value);
  };

  const getChoir = () => {
    return "lorem asdflsdf  asdfasdf fasdflasdf asdf asdf asdfasdf  /n asdfasdf /n asdfasdf /n"
    return chorus.find(c => c.id === choirId)?.choir || ''
  }

  return (
    <div className={'form-choir__content'}>
      <div>{getChoir().split('\\n').map(c => (<p>{c}</p>))}</div>
      <div className="btn-wrap">

        <button style={btnStyle} onChange={() => action('change')}>Cambiar</button>
        <button style={btnStyle} onChange={() => action('remove')}>Borrar</button>

        <Modal onAccept={() => {
          console.log('accion');
          setOpen(false);
        }} onClose={() => setOpen(false)} open={open} title="Modal" trigger={<button style={btnStyle} onClick={() => {
          setOpen(true);
          action('add')
        }}>Agregar</button>} >
          <div>
            <textarea
              style={{ padding: 3, paddingLeft: 8, border: "1px solid black", borderRadius: 8, width: "100%" }}
              title={'Coro'}
              aria-multiline={true}
              onChange={() => { }}
              onInput={() => { }}
              rows={8}
            />
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