import { type ChangeEvent, useContext } from "react";
import { AddContext } from "@/state/AddContext";
import { uuid } from "@/utils/helpers";
import type { ID } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

const ChoirList = () => {
  const { state, updateState } = useContext(AddContext);

  const changeChoir = (e: ChangeEvent<HTMLTextAreaElement>, id: ID) => {
    const choir = e.target.value;
    const chorus = state.chorus.map(c => {
      if (c.id === id) return ({...c, choir});
      return c;
    })
    updateState({chorus})
  }

  const removeChoir = (id: ID) => {
    const chorus = state.chorus.filter(c => c.id !== id);
    updateState({chorus});
  }

  return (
    <Card className="flex flex-col h-full"> 
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <CardTitle className="text-lg">Coros</CardTitle>
        <Button 
          onClick={() => updateState({...state, chorus: [...state.chorus, {choir: '', id: uuid()}]})}
          size="sm"
          variant="secondary"
          className="h-8 gap-1"
        >
          <Plus className="h-4 w-4" /> Agregar
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 flex-1 overflow-y-auto">
        {state.chorus.length === 0 && (
          <div className="text-center text-muted-foreground py-8 text-sm">
            No hay coros agregados
          </div>
        )}
        {state.chorus.map((c, index) => (
          <div key={c.id} className="relative group">
            <Textarea 
              placeholder={`Coro ${index + 1}`}
              rows={4} 
              value={c.choir}
              onChange={e => changeChoir(e, c.id)} 
              className="resize-none pr-10"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => removeChoir(c.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ChoirList;
