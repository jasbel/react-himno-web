import { useState } from "react";
import Button from "../elements/Button";
import FormParagraph from "./FormParagraph";
import { IParagraph2 } from "../types/types";
import { v4 } from "uuid";

const FormParagraphs = () => {
  const [paragraphs, setParagraphs] = useState<IParagraph2[]>([]);

  const onChange = (value: string, idx: number) => {
    setParagraphs((_v) => {
      _v.forEach((p, i) => {
        if (i === idx) p.paragraph = value;
      });
      return _v;
    });
  };

  return (
    <div className="bg-cyan-100">
      {paragraphs.map((p, i) => {
        return <FormParagraph key={i} label={"Parrafo " + (i + 1)} handleChange={(v) => onChange(v, i)} />;
      })}

      <Button title="+ Parrafo" onClick={() => setParagraphs([...paragraphs, { chorusPos: [[1]], paragraph: "", id: v4() }])} />
    </div>
  );
};

export default FormParagraphs;
