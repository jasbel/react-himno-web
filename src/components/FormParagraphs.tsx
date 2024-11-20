import { Fragment, useContext, useEffect, useState } from "react";
import Button from "../elements/Button";
import FormParagraph from "./FormParagraph";
import { IParagraph } from "../types/types";
import FormChoir from "./FormChoir";
import { uuid } from "@/res/helpers";
import { AddContext } from "@/state/AddContext";

const FormParagraphs = () => {
  const { state, updateState } = useContext(AddContext);
  const [paragraphs, setParagraphs] = useState<IParagraph[]>([]);

  const onChange = (value: string, idx: number) => {
    const _paragraphs = paragraphs.map( (p, i) => ({...p, paragraph: i === idx ? value : p.paragraph}))
    setParagraphs(_paragraphs);
  };

  useEffect(() => {
    updateState({paragraphs: paragraphs})
  }, [paragraphs])

  return (
    <div className="p-2 pt-4 pb-2 border">
      {paragraphs.map((p, i) => <Fragment key={p.id}>
        <FormParagraph key={p.id} label={"Parrafo " + (i + 1)} handleChange={(v) => onChange(v, i)} />
        <FormChoir choirId={'p.chorusPos'} handleAction={(a) => {}} />
      </Fragment>
      )}

      <Button title="+ Parrafo" onClick={() => setParagraphs([...paragraphs, { chorusPos: [[1]], paragraph: "", id: uuid() }])} />
    </div>
  );
};

export default FormParagraphs;
