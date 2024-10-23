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
    <div>
      <div>{getChoir().split('\\n').map(c => (<p>{c}</p>))}</div>
      <div>
        <button onChange={() => action('add')}>ADD</button>
        <button onChange={() => action('change')}>CHANGE</button>
        <button onChange={() => action('remove')}>REMOVE</button>
      </div>
    </div>
  );
};

export default FormChoir;
