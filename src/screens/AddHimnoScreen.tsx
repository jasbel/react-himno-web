import { createContext, useState } from "react";
import Layout from "../layout/Layout";
import { Box, Flex } from "@components/ui";
import FormSongBase from "../components/FormSongBase";
import FormParagraphs from "../components/FormParagraphs";
import ViewSong from "../components/ViewSong";
import LayoutMain from "../layout/LayoutMain";
import { ILetter } from "../components/himno/ItemHimnoLetter";
import { IChoir, ISong } from "@/types/types";
import { initSong } from "@/res/constant";
import { uuid } from "@/res/helpers";
import ChoirList from "@/components/ChoirList";


const AddHimnoScreen = () => {
  const [letter, setLetter] = useState<ILetter>()
  const [chorus, setChorus] = useState<IChoir[]>([{ id: uuid(), choir: "asdfdfsdf"}])
  return (
      <Layout>
        <div style={{ minHeight: "calc(100vh - 193px)" }}>
          <Flex>
            <Box style={{flex: 3}}>
              <LayoutMain>
                <FormSongBase />
                
                <ChoirList />
              </LayoutMain>
            </Box>
            <Box  style={{flex: 6, minWidth: '45%'}}>
              <LayoutMain>
                <FormParagraphs />
              </LayoutMain>
            </Box>
            <Box  style={{flex: 3}}>
              <LayoutMain>
                <ViewSong isSmall />
              </LayoutMain>
            </Box>
          </Flex>
        </div>
      </Layout>

  );
};

export default AddHimnoScreen;
