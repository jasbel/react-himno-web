import { ChangeEvent, ChangeEventHandler, SetStateAction, useState } from 'react'
import Button from '../elements/Button'
import FormTextArea from '../elements/FormTextArea'
import FormParagraph from './FormParagraph'

const FormParagraphs = () => {
  const [paragrapsh, setParagraphs] = useState({})

 const onChange = (value: string, p: string) => {
  setParagraphs(_v => ({..._v, [p]: value}))
 }
 

  return (
    <div className='bg-cyan-100'>
      <FormParagraph label="Parrafo 1" handleChange={v => onChange(v, 'p1')}/>
      <FormParagraph label="Parrafo 2" handleChange={v => onChange(v, 'p2')}/>
      <FormParagraph label="Parrafo 3" handleChange={v => onChange(v, 'p3')}/>
      <FormParagraph label="Parrafo 4" handleChange={v => onChange(v, 'p4')}/>

      <Button title='+ Parrafo' />
      <pre>{JSON.stringify(paragrapsh, null, 2)}</pre>
    </div>
  )
}

export default FormParagraphs