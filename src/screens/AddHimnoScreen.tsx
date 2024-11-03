import { createContext, useState } from "react";
import Layout from "../layout/Layout";
import { Box } from "@components/ui";
import FormSongBase from "../components/FormSongBase";
import FormParagraphs from "../components/FormParagraphs";
import ViewSong from "../components/ViewSong";
import LayoutMain from "../layout/LayoutMain";
import { ILetter } from "../components/himno/ItemHimnoLetter";
import { ISongNew } from "@src/types/types";
import { v4 } from "uuid";

const initAdd: ISongNew = { 
  chorus: [],
  code: '',
  id: v4(),
  musicalNote: '_',
  paragraphs: [],
  title: ''
 }

 interface IAddContext {
  state: ISongNew,
  updateState: (newValues: Partial<ISongNew>) => void,
 }
// @ts-ignore
export const AddContext = createContext<IAddContext>({
  // state: initAdd, updateState: () => {}
});

const AddProvider = ({children}: any) => {
  const [state, setState] = useState<ISongNew>(initAdd);

  const updateState = (newValues: Partial<ISongNew>) => {
    setState(prevState => ({
      ...prevState,
      ...newValues
    }));
  };

  return (
    <AddContext.Provider value={{ state, updateState }}>
      {children}
    </AddContext.Provider>
  );
};

const AddHimnoScreen = () => {
  const [letter, setLetter] = useState<ILetter>()
  return (
    <AddProvider>

    <Layout>
      <div style={{ minHeight: "calc(100vh - 193px)" }}>
        <div>
          <div className="">
            {/* <div className="grid grid-cols-12 gap-4"> */}
            {/* <div className="col-span-7 bg-light"> */}
            <Box>
              <LayoutMain>
                <FormSongBase />
              </LayoutMain>
              <LayoutMain>
                <FormParagraphs />
              </LayoutMain>
            </Box>

            {/* <ItemHimnoLetter item={{
              
            }} /> */}
            {/* </div> */}
          </div>
          <div>
            {/* <div className="col-span-5 bg-bermuda"> */}
            <LayoutMain>
              <ViewSong />
            </LayoutMain>
            {/* </div> */}
          </div>
        </div>
      </div>
    </Layout>
    </AddProvider>

  );
};

export default AddHimnoScreen;
