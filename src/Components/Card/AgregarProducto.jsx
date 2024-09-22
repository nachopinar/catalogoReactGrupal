import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SendIcon from '@mui/icons-material/Send';
import InputFileUpload from './VisuallyHiddenInput';
import { Stack } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AgregarProducto({ onAgregarProducto }) {
  const [nombre, setNombre] = React.useState('');
  const [descripcion, setDescripcion] = React.useState('');
  const [precio, setPrecio] = React.useState('');
  const [imagen, setImagen] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(''); // Para la previsualización de la imagen

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validarFormulario = () => {
    if (!nombre.trim()) {
      alert("El nombre no puede estar vacío.");
      return false;
    }
    if (!descripcion.trim()) {
      alert("La descripción no puede estar vacía.");
      return false;
    }
    if (!precio || isNaN(precio) || parseFloat(precio) <= 0) {
      alert("El precio debe ser un número positivo.");
      return false;
    }
    return true; 
  };

  const handleSend = () => {
    if (!validarFormulario()) {
      return;
    }

    const nuevoProducto = {
      name: nombre.trim(),
      description: descripcion.trim(),
      price: parseFloat(precio), 
      image: previewUrl || 'https://via.placeholder.com/150', 
    };

    onAgregarProducto(nuevoProducto); 
    setOpen(false); 
    setNombre(''); 
    setDescripcion('');
    setPrecio('');
    setImagen(null);
    setPreviewUrl('');
  };

  const handleFileChange = (file) => {
    setImagen(file); // Guardar el archivo de imagen
    setPreviewUrl(URL.createObjectURL(file)); // Crear una URL temporal para la previsualización
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        Agregar Producto
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={2}>
            <Typography>
              <label>Nombre: </label>
              <input
                type="text"
                placeholder="Nombre del producto"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Typography>

            <Typography>
              <label>Descripción: </label>
              <input
                type="text"
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </Typography>

            <Typography>
              <label>Precio: </label>
              <input
                type="number"
                placeholder="Precio"
                value={precio >= 0}
                onChange={(e) => setPrecio(e.target.value)}
              />
            </Typography>

            <InputFileUpload onFileChange={handleFileChange} />

            {previewUrl && (
              <Box sx={{ mt: 2 }}>
                <Typography>Previsualización de Imagen:</Typography>
                <img src={previewUrl} alt="Imagen cargada" width="100%" />
              </Box>
            )}

            <Button onClick={handleSend} variant="contained" endIcon={<SendIcon />}>
              Enviar
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
