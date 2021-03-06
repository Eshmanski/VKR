import { useState } from 'react';
import { Button, Modal, Typography, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { styleModal } from '../../../shared/stylesMUI';

function ChooseItem({isOpen, onClose, onAdd, items, type}) {
  const [text, setText] = useState('');

  const handleClick = (event) => {
    event.preventDefault();
    onAdd(text);
    setText('');
  }

  let typeNames = new Array(2);

  switch(type) {
    case 'product':
      typeNames = ['изделие', 'Изделие'];
      break;
    case 'component':
      typeNames = ['деталь', 'Деталь'];
      break;
    default:
      typeNames = ['элемент', 'Элемент'];
      break;
  }


  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-body"
    >
      <Box sx={styleModal} component="form">
        <Typography id="modal-body" variant="h6" component="h2" sx={{display: 'flex', flexDirection: 'column'}}>
          <p style={{fontSize: '20px', paddingLeft: 0}}>Выберете {typeNames[0]}</p>
          <FormControl>
            <InputLabel id="select-workspace-label">{typeNames[1]}</InputLabel>
            <Select
              labelId="select-workspace-label"
              id="demo-simple-select"
              value={text}
              label="Деталь"
              onChange={(e) => {setText(e.target.value)}}
            >
              {items.map(item => {
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

export default ChooseItem;
