import { Fragment, useContext, useEffect, useState } from "react";
import { IParagraph } from "../types/types";
import FormChoir from "./FormChoir";
import { uuid } from "@/utils/helpers";
import { AddContext } from "@/state/AddContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

const FormParagraphs = () => {
  const { updateState, state } = useContext(AddContext);
  const [paragraphs, setParagraphs] = useState<IParagraph[]>([]);

  const onChange = (value: string, idx: number) => {
    const _paragraphs = paragraphs.map((p, i) => ({ ...p, paragraph: i === idx ? value : p.paragraph }))
    setParagraphs(_paragraphs);
    updateState({paragraphs: _paragraphs})
  };

  const newParagraph = () => {
    setParagraphs([...paragraphs, { chorusPos: [[1]], paragraph: "", id: uuid() }])
  }

  const removeParagraph = (idx: number) => {
    const _paragraphs = paragraphs.filter((_, i) => i !== idx);
    setParagraphs(_paragraphs);
    updateState({paragraphs: _paragraphs});
  }

  // useEffect(() => {
  //   updateState({ paragraphs: paragraphs })
  // }, [paragraphs])

  useEffect(() => {
    if (state.paragraphs && state.paragraphs.length > 0) {
      setParagraphs(state.paragraphs)
    } else {
      newParagraph()
    }
  }, [state.paragraphs.length === 0]) // Run once if empty or when mounting

  useEffect(() => {
    // Sync external state changes if needed, but be careful of loops
    if (JSON.stringify(state.paragraphs) !== JSON.stringify(paragraphs)) {
       setParagraphs(state.paragraphs)
    }
  }, [state])

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <CardTitle className="text-lg">Estrofas</CardTitle>
        <Button 
          onClick={() => newParagraph()}
          size="sm"
          className="h-8 gap-1"
        >
          <Plus className="h-4 w-4" /> Agregar Estrofa
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 flex-1 overflow-y-auto">
        {paragraphs.map((p, i) => 
          (
            <Card key={p.id} className="relative overflow-hidden border-dashed">
              <div className="bg-muted/50 px-4 py-2 flex justify-between items-center border-b border-dashed">
                <Label className="font-semibold text-muted-foreground">Estrofa {i + 1}</Label>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 text-muted-foreground hover:text-destructive"
                  onClick={() => removeParagraph(i)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              <div className="p-4 space-y-4">
                <Textarea 
                  value={p.paragraph} 
                  onChange={(e) => onChange(e.target.value, i)} 
                  className="resize-none font-medium min-h-[100px]"
                  placeholder="Escribe la letra de la estrofa aquí..."
                />
                <div className="bg-muted/30 rounded-md p-3">
                  <Label className="text-xs text-muted-foreground mb-2 block">Coros asociados</Label>
                  <FormChoir idParagraph={p.id} chorusIdOrPos={p.chorusPos} />
                </div>
              </div>
            </Card>
          )
        )}
        
        {paragraphs.length === 0 && (
           <div className="text-center py-10 text-muted-foreground">
             No hay estrofas. Agrega una para comenzar.
           </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FormParagraphs;
