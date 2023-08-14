import { DeleteOutline, SaveOutlined, UploadFileOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components/ImageGallery";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { useMemo, useRef } from "react";
import { useEffect } from "react";
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {

  const dispatch = useDispatch();

  const {active:note,messageSaved, isSaving} = useSelector(state => state.journal);

  const {body,title,date,onInputChange,formState} = useForm(note);
  
  
  const dataString = useMemo(() => {
      const newDate = new Date(date);
      return newDate.toUTCString();
  }, 
  [date])

  const fileInputRef = useRef(); // referencia html a nuestro input

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState])

  useEffect(() => {
    if(messageSaved.length > 0) {
      Swal.fire('Nota actualizada',messageSaved,'success');
    }
   
  }, [messageSaved])
  

  const onSaveNote= () => {
      dispatch(startSaveNote());
  }

  const onFileInputChange = ({target}) => {
      if(target.files === 0) return;
      dispatch(startUploadingFiles(target.files));
  }

  const onDelete = () => {
    dispatch(startDeletingNote());
  }
  

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dataString}
        </Typography>
      </Grid>
      <Grid item>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={onFileInputChange}
          style={{display:'none'}}
        />
        <IconButton 
        color="primary"
        disabled={isSaving}
        onClick={() => fileInputRef.current.click()}
         >
          <UploadFileOutlined/>
        </IconButton>
        <Button
        disabled={isSaving} 
        onClick={onSaveNote}
        color="primary" 
        sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingresa un titulo"
          label="titulo"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Que sucedio en el dia de hoy?"
          sx={{ border: "none", mb: 1 }}
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
        <Grid container justifyContent='end'>
          <Button
          onClick={onDelete}
          sx={{mt: 2}}
          color="error"

          >
            <DeleteOutline/>
            Borrar
          </Button>
        </Grid>
        <ImageGallery images={note.imageUrls}/>
      </Grid>
    </Grid>
  );
};
