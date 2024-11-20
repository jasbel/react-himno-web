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
            <Box>
              <LayoutMain>
                <FormSongBase />
                <ChoirList />
                
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

  );
};

export default AddHimnoScreen;
