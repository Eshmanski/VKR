import { Button, Modal, Typography, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { styleModal } from '../../../shared/stylesMUI';
import { returnBody, saveBody } from '../../../store/actions/stateProjectActions';


function SaveChanges({isOpen, callBack, clearAlertOption}) {
  const dispatch = useDispatch();

  const saveBodyHandler = async () => {
    dispatch(saveBody());
    callBack();
    clearAlertOption();
  }

  const dontSaveBodyHandler = () => {
    dispatch(returnBody());
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
