import React from 'react'
import Button from '../elements/Button'
import FormTextArea from '../elements/FormTextArea'

const FormSecondary = () => {
  return (
    <div className='bg-cyan-100'>
      <FormTextArea label='Parrafo 1' text='kl' />

      <FormTextArea label='Parrafo 2' text='ss' />

      <Button title='+ Parrafo' />
    </div>
  )
}

export default FormSecondary