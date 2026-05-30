import { useContext } from "react";
import Layout from "../layout/Layout";
import FormSongBase from "../components/FormSongBase";
import FormParagraphs from "../components/FormParagraphs";
import ViewSong from "../components/ViewSong";
import ChoirList from "@/components/ChoirList";
import { AddContext } from "@/state/AddContext";
import { createSong } from "@/api/songService";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { validateSong } from "@/utils/validation";

const AddHimnoScreen = () => {
  const { state } = useContext(AddContext);
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      // Validate before sending to Supabase
      const validation = validateSong(state);
      if (!validation.isValid) {
        alert('Errores de validación:\n' + validation.errors.join('\n'));
        return;
      }

      await createSong(state);
      alert('Himno creado correctamente');
      navigate(-1);
    } catch (error) {
      console.error(error);
      alert('Error al crear el himno: ' + (error as Error).message);
    }
  };

  return (
      <Layout>
        <div className="flex items-center justify-between px-6 py-4 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-foreground">Nuevo Himno</h1>
          <Button
            onClick={handleSave}
            variant="default"
            size="default"
            className="gap-2 shadow-md hover:shadow-lg transition-shadow"
          >
            <Save className="w-4 h-4" />
            Guardar
          </Button>
        </div>
        <div className="min-h-[calc(100vh-73px)] bg-muted/30 p-4">
          <div className="flex flex-col xl:flex-row gap-4 h-full">
            {/* Left Column: Song Info & Choirs */}
            <div className="flex-1 min-w-[320px] max-w-full xl:max-w-xs flex flex-col gap-4">
                <FormSongBase />
                <div className="flex-1 min-h-[300px]">
                  <ChoirList />
                </div>
            </div>
            
            {/* Middle Column: Paragraphs - Takes most space */}
            <div className="flex-[2] min-w-[320px]">
                <FormParagraphs />
            </div>

            {/* Right Column: Preview - Visible on large screens, wraps on smaller */}
            <div className="flex-1 min-w-[320px] xl:max-w-sm">
                <ViewSong isSmall />
            </div>
          </div>
        </div>
      </Layout>

  );
};

export default AddHimnoScreen;
