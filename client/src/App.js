import { Box, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Form from "./components/Form";
import Navbar from "./components/Navbar";

function App() {

  const [imageURL, setImageURL] = useState(null);

  const imageMatches = useMediaQuery('(max-width: 1000px)');

  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Typography variant="h2" textAlign={"center"}>Añadir anuncio</Typography>
      <Typography variant="body1" textAlign={"center"}>
        Este formulario sirve para poder añadir anuncios en la pagina seminuevos.com, con esto, se hace mas facil la tarea de añadir anuncios, solamente se tiene
        que añadir el precio del carro del anuncio, y una descripción de las caracteristicas que tenga el auto.
      </Typography>
      <Box marginTop={4}>
        <Form setImageURL={setImageURL} />
      </Box>
      {imageURL && <>
        <Typography variant="h4" textAlign={"center"}>Imagen del anuncio</Typography>
        <Box display={"flex"} marginTop={4} justifyContent={imageMatches ? 'start' : 'center'}  overflow={"auto"}>
          <img src={imageURL} alt="Screenshot del anuncio publicado" style={{maxWidth: '1000px'}} />
        </Box>
      </>}
    </div>
  );
}

export default App;
