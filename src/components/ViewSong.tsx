import { AddContext } from "@/state/AddContext";
import { useContext } from "react";
import WrapItemHimno from "./himno/WrapItemHimno";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ViewSong = ({isSmall}: {isSmall?: boolean}) => {
  const { state } = useContext(AddContext);
  return (
    <Card className="h-full border-2 border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-center border-b pb-2">{state.title || "Sin título"}</CardTitle>
        <p className="text-xs text-muted-foreground text-center">Nota: {state.musicalNote}</p>
      </CardHeader>
      <CardContent className="pt-2 text-sm overflow-y-auto max-h-[600px]">
        <WrapItemHimno
          chorus={state.chorus}
          paragraphs={state.paragraphs}
          isSmall={isSmall}
        />
      </CardContent>
    </Card>
  )
}

export default ViewSong