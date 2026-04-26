import Layout from "../layout/Layout";
import { Box, Flex } from "@components/ui";
import FormSongBase from "../components/FormSongBase";
import FormParagraphs from "../components/FormParagraphs";
import ViewSong from "../components/ViewSong";
import LayoutMain from "../layout/LayoutMain";
import ChoirList from "@/components/ChoirList";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AddContext } from "@/state/AddContext";
import { useDinamicSong } from "@/hooks/useDinamicSong";
import { ID } from "@/types/types";
import { updateSong } from "@/api/songService";


const EditHimnoScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, updateState } = useContext(AddContext);
  const { getSong } = useDinamicSong();

  const getSongEdit = async () => {
    if (!id) return;
    try {
      const _song = await getSong(id as ID);
      if (_song) {
        updateState(_song);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleUpdate = async () => {
    try {
      await updateSong(state);
      alert('Himno actualizado correctamente');
      navigate(-1);
    } catch (error) {
      console.error(error);
      alert('Error al actualizar el himno');
    }
  };

  useEffect(() => {
    getSongEdit();
  }, [])
  useEffect(() => {
    console.log(state)
  }, [state])
  

  return (
      <Layout>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
          <h1 style={{ fontSize: 24, fontWeight: 'bold' }}>Editar Himno</h1>
          <button 
            onClick={handleUpdate}
            style={{
              padding: '10px 20px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            Actualizar
          </button>
        </div>
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
