import { Button, Modal, Typography, Box } from '@mui/material';
import { styleModal } from '../../../shared/stylesMUI';


function SaveChanges({isOpen, callBack, clearAlertOption}) {
  const saveBodyHandler = () => {
    const saveBody = new CustomEvent('saveBody');

    window.dispatchEvent(saveBody);
    callBack();
    clearAlertOption();
  }

  const dontSaveBodyHandler = () => {
    const removeChange = new CustomEvent('removeChange');

    window.dispatchEvent(removeChange);
    callBack();
    clearAlertOption();
  }

  const cancelHandler = () => {
    clearAlertOption();
  }

  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-body"
    >
      <Box sx={styleModal} component="form">
        <Typography id="modal-body" variant="h6" component="h2" sx={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
          Сохранить изменения?
          <Box sx={{display: 'flex', flexDirection: 'row', padding: '20px', justifyContent: 'space-between'}}>
            <Button
              color="success" 
              variant="contained"
              onClick={() => saveBodyHandler()}
            >
              Сохранить
            </Button>
            <Button
              color="primary" 
              variant="contained"
              onClick={() => dontSaveBodyHandler()}
            >
              Не сохранять
            </Button>
            <Button
              color="error" 
              variant="contained"
              onClick={() => cancelHandler()}
            >
              Отменить
            </Button>
          </Box>
        </Typography>
      </Box>
    </Modal>
  );
}

export default SaveChanges;