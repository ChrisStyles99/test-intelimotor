import { Button, Card, CardContent, CircularProgress, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-toastify';

import { useForm } from '../hooks/useForm';
import { baseInstance } from '../utils/axiosInstance';

function Form({ setImageURL }) {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { formData, handleChange, resetForm } = useForm({price: '', description: ''});

  const handleSubmit = async(e) => {
    e.preventDefault();
    toast('Se está publicando el anuncio', {
      autoClose: true, 
      position: 'top-right',
      theme: 'colored',
      type: 'info'
    });
    setIsSubmitting(true);
    try {
      const data = await baseInstance.post('/save-ad', {
        price: formData.price,
        description: formData.description
      });
      if(data.data.error) {
        setImageURL(null);
        toast('Hubo un error al publicar el anuncio :(', {
          autoClose: true, 
          position: 'top-right',
          theme: 'colored',
          type: 'error'
        });
      } else {
        setImageURL(data.data.url);
        toast('Anuncio publicado con exito', {
          autoClose: true, 
          position: 'top-right',
          theme: 'colored',
          type: 'success'
        });
      }
    } catch (error) {
      if(error?.response?.data?.errors?.length > 0) {
        error?.response?.data?.errors?.forEach(err => {
          toast(err.msg, {
            autoClose: true, 
            position: 'top-right',
            theme: 'colored',
            type: 'error'
          });
        });
      }
    }
    setIsSubmitting(false);
    resetForm();
  }

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto' }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Typography variant='h3' textAlign={"center"}>Formulario</Typography>
          <TextField inputProps={{min: 1000}} name="price" value={formData.price} onChange={handleChange} fullWidth margin='normal' required type="number" label="Precio del carro" 
            placeholder="El precio del auto del anuncio"/>
          <TextField name="description" inputProps={{minLength: 10}} value={formData.description} onChange={handleChange} fullWidth margin='normal' required type="text" minRows={5} multiline 
            label="Descripción del anuncio (Mayor a 10 caracteres)" placeholder="La descripción del auto del anuncio"/>
          {!isSubmitting ? <Button type='submit' variant='contained' color='secondary' fullWidth >Publicar</Button> : <CircularProgress />}
        </form>
      </CardContent>
    </Card>
  )
}

export default Form