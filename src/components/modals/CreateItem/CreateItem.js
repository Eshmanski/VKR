import { useState } from 'react';
import { declinationTitle } from '../../../shared/utils';
import { Button, Modal, Typography, Box, TextField } from '@mui/material';
import { styleModal } from '../../../shared/stylesMUI';

function CreateItem({modalOptions, onAddFile, onClose}) {
  const [text, setText] = useState('')

  const handleClick = (event, type) => {
    event.preventDefault();
    onAddFile(type, text);
    setText('');
  }

  return (
    <Modal
      open={modalOptions.isOpen}
      onClose={onClose}
      aria-labelledby="modal-body"
    >
      <Box sx={styleModal} component="form">
        <Typography id="modal-body" variant="h6" component="h2" sx={{display: 'flex', flexDirection: 'column'}}>
          Введите название {declinationTitle(modalOptions.typeData, 0).toLowerCase() || 'элемента'}
          <TextField
            required={true}
            sx={{margin: '20px 0'}}
            id="outlined-basic" 
            label={declinationTitle(modalOptions.typeData, 1)?.toLowerCase() || 'элемент'} 
            variant="outlined"
            onChange={({target: {value}}) => setText(value)} value={text}
          />
          <Button
            type='submit'
            color="success" 
            variant="contained"
            onClick={(event) => handleClick(event, modalOptions.typeData)}
            disabled={!(text.trim())}
          >
            Добавить
          </Button>
        </Typography>
      </Box>
    </Modal>
  );
}

export default CreateItem;