import { createContext, useState } from "react";
import Layout from "../layout/Layout";
import { Box, Flex } from "@components/ui";
import FormSongBase from "../components/FormSongBase";
import FormParagraphs from "../components/FormParagraphs";
import ViewSong from "../components/ViewSong";
import LayoutMain from "../layout/LayoutMain";
import { ILetter } from "../components/himno/ItemHimnoLetter";
import { ISong } from "@/types/types";
import { v4 } from "uuid";

const initAdd: ISong = {
  chorus: [],
  code: '',
  id: v4(),
  musicalNote: '_',
  paragraphs: [],
  title: ''
}

interface IAddContext {
  state: ISong,
  updateState: (newValues: Partial<ISong>) => void,
}
// @ts-ignore
export const AddContext = createContext<IAddContext>({
  // state: initAdd, updateState: () => {}
});

const AddProvider = ({ children }: any) => {
  const [state, setState] = useState<ISong>(initAdd);

  const updateState = (newValues: Partial<ISong>) => {
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
  const [chorus, setChorus] = useState<string[]>(["asdfdfsdf"])
  return (
    <AddProvider>

      <Layout>
        <div style={{ minHeight: "calc(100vh - 193px)" }}>
          <Flex>
            <Box>
              <LayoutMain>
                <FormSongBase />
                <div>
                {chorus.map(c => {
                  return (<>
                    <p>{c}</p>
                  </>)
                })}


                </div>
              </LayoutMain>
            </Box>
            <Box>
              <LayoutMain>
                <FormParagraphs />
              </LayoutMain>
            </Box>
            <div>
              {/* <div className="col-span-5 bg-bermuda"> */}
              <LayoutMain>
                <ViewSong />
              </LayoutMain>
              {/* </div> */}
            </div>
          </Flex>
        </div>
      </Layout>
    </AddProvider>

  );
};

export default AddHimnoScreen;
