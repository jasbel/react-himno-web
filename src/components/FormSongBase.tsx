import { useContext } from "react";
import { AddContext } from "@/state/AddContext";
import { TNote } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const FormSongBase = () => {
  const { state, updateState } = useContext(AddContext);
  const onChange = (val: string, type: string) => {
    console.log({val})
    if(type === 'title') updateState({title: val})
    if(type === 'description') updateState({description: val})
    if(type === 'note-musical') updateState({musicalNote: val as TNote})
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">Información Básica</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input 
            id="title" 
            placeholder="Ingrese el título del himno"
            value={state.title} 
            onChange={(e) => onChange(e.target.value, "title")} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="note-musical">Nota Musical</Label>
          <Input 
            id="note-musical" 
            placeholder="Ej: C | Do"
            value={state.musicalNote} 
            onChange={(e) => onChange(e.target.value, "note-musical")} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Descripción</Label>
          <Input 
            id="description" 
            placeholder="Descripción opcional"
            value={state.description || ''} 
            onChange={(e) => onChange(e.target.value, "description")} 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default FormSongBase;
