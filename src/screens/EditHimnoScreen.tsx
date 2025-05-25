import Layout from "../layout/Layout";
import { Box, Flex } from "@components/ui";
import FormSongBase from "../components/FormSongBase";
import FormParagraphs from "../components/FormParagraphs";
import ViewSong from "../components/ViewSong";
import LayoutMain from "../layout/LayoutMain";
import ChoirList from "@/components/ChoirList";
import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AddContext } from "@/state/AddContext";
import { useDinamicSong } from "@/hooks/useDinamicSong";
import { ID } from "@/types/types";


const EditHimnoScreen = () => {
  const { id } = useParams();
  const { state, updateState } = useContext(AddContext);
  const { changeSongBySearch, song, getSong } = useDinamicSong();

  const getSongEdit = async () => {
    const _song =    await getSong(id as ID)
    updateState(_song)      

    // setTimeout(() => {
    // }, 50);
  }

  useEffect(() => {
    getSongEdit();
  }, [])
  useEffect(() => {
    console.log(state)
  }, [state])
  

  return (
      <Layout>
        <h1>{id}</h1>
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

export default EditHimnoScreen;
