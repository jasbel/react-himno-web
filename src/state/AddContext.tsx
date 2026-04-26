import { initSong } from "@/utils/constant";
import { IChorusPos, ID, IDPos, ISongModel } from "@/types/types";
import { createContext, useState } from "react";

interface IAddContext {
  state: ISongModel,
  updateState: (newValues: Partial<ISongModel>) => void,
  updateChorusInParagraph: (id: ID, chorusPos: IChorusPos) => void,
}
// @ts-ignore
export const AddContext = createContext<IAddContext>({
  // state: initAdd, updateState: () => {}
});

export const AddProvider = ({ children }: any) => {
  const [state, setState] = useState<ISongModel>(initSong());

  const updateState = (newValues: Partial<ISongModel>) => {
    setState(prevState => ({
      ...prevState,
      ...newValues,
    }));
  };

  const updateChorusInParagraph = (idParagraph: ID, _chorusPos: IChorusPos) => {
    const { paragraphs } = state
  
    const _paragraphs = paragraphs.map(it => {
      if (it.id === idParagraph) {
        it.chorusPos = _chorusPos
        return it
      }

      return it
    })

    setState(prevState => ({
      ...prevState,
      paragraphs: _paragraphs,
    }));
  }
  const changeChoirInParagraphs = (idParagraph: ID, idPosChoir: IDPos, pos = 1) => {
    const { paragraphs } = state
    const paragraph = paragraphs.find(it => it.id === idParagraph)

    if (!paragraph) {
      console.log('No se encuentra la relacion con el parrafo')
      return
    }

    const { chorusPos } = paragraph


  }

  return (
    <AddContext.Provider value={{ state, updateState, updateChorusInParagraph }}>
      {children}
    </AddContext.Provider>
  );
};