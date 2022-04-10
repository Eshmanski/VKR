import { useState } from 'react';
import { Button, Modal, Typography, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { styleModal } from '../../../shared/stylesMUI';

function ChooseComponent({isOpen, onClose, onAddComponent, componentItems}) {
  const [text, setText] = useState('');

  const handleClick = (event) => {
    event.preventDefault();
    onAddComponent(text);
    setText('');
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-body"
    >
      <Box sx={styleModal} component="form">
        <Typography id="modal-body" variant="h6" component="h2" sx={{display: 'flex', flexDirection: 'column'}}>
          <p style={{fontSize: '20px', paddingLeft: 0}}>Выберете деталь</p>
          <FormControl>
            <InputLabel id="select-workspace-label">Деталь</InputLabel>
            <Select
              labelId="select-workspace-label"
              id="demo-simple-select"
              value={text}
              label="Деталь"
              onChange={(e) => {setText(e.target.value)}}
            >
              {componentItems.map(item => {
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

export default ChooseComponent;
