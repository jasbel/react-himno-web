import { Fragment, useContext, useEffect, useState } from "react";
import Button from "../elements/Button";
import FormParagraph from "./FormParagraph";
import { IParagraph } from "../types/types";
import FormChoir from "./FormChoir";
import { uuid } from "@/res/helpers";
import { AddContext } from "@/state/AddContext";

const FormParagraphs = () => {
  const { updateState } = useContext(AddContext);
  const [paragraphs, setParagraphs] = useState<IParagraph[]>([]);

  const onChange = (value: string, idx: number) => {
    const _paragraphs = paragraphs.map( (p, i) => ({...p, paragraph: i === idx ? value : p.paragraph}))
    setParagraphs(_paragraphs);
  };

  const newParagraph = () => {
    setParagraphs([...paragraphs, { chorusPos: [[1]], paragraph: "", id: uuid() }])
  }

  useEffect(() => {
    updateState({paragraphs: paragraphs})
  }, [paragraphs])
  useEffect(() => {
    newParagraph()
  }, [])

  return (
    <div className="p-2 pt-4 pb-2 border">
      {paragraphs.map((p, i) => <Fragment key={p.id}>
        <FormParagraph key={p.id} label={"Parrafo " + (i + 1)} handleChange={(v) => onChange(v, i)} />
        <FormChoir choirId={'p.chorusPos'} handleAction={(a) => {}} />
      </Fragment>
      )}

      <Button title="+ Parrafo" onClick={() => newParagraph()} />
    </div>
  );
};

export default FormParagraphs;
