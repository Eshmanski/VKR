import { useState } from 'react';
import { Button, Modal, Typography, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { styleModal } from '../../../shared/stylesMUI';

function CreateBox({modalOptions, onAddBox, onClose, workshopItems}) {
  const [text, setText] = useState('');

  const handleClick = (event) => {
    event.preventDefault();
    onAddBox(text);
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
          <p style={{fontSize: '20px', paddingLeft: 0}}>Выберете цех</p>
          <FormControl>
            <InputLabel id="select-workspace-label">Цех</InputLabel>
            <Select
              labelId="select-workspace-label"
              id="demo-simple-select"
              value={text}
              label="Цех"
              onChange={(e) => {setText(e.target.value)}}
            >
              {workshopItems.map(item => {
                return <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
              })}
            </Select>
            <Button
              sx={{marginTop: '20px'}}
              type='submit'
              color="success" 
              variant="contained"
              onClick={(e) => handleClick(e)}
              disabled={!(text.trim())}
            >
              Добавить
            </Button>
          </FormControl>
        </Typography>
      </Box>
    </Modal>
  )
}

export default CreateBox;
