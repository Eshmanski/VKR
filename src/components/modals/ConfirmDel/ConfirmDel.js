import { Button, Modal, Typography, Box } from '@mui/material';
import { styleModal } from '../../../shared/stylesMUI';


function ConfirmDel({isOpen, onClose, onDel, type, id}) {

  const typeNames = {
    workshop: 'цех',
    route: 'маршрут',
    component: 'деталь',
    product: 'изделие'
  };

  const renderModal = () => {
    return (
      <Modal
        open={isOpen}
        aria-labelledby="modal-body"
      >
        <Box sx={{...styleModal, width: '300px'}} component="form">
          <Typography id="modal-body" variant="h6" component="h2" sx={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
            Удалить {typeNames[type]}?
            <Box sx={{display: 'flex', flexDirection: 'row', padding: '20px', justifyContent: 'space-between', marginTop: '20px'}}>
              <Button
                color="error" 
                variant="contained"
                onClick={() => onDel()}
              >
                Удалить
              </Button>
  
              <Button
                color="primary" 
                variant="contained"
                onClick={onClose}
              >
                Отменить
              </Button>
            </Box>
          </Typography>
        </Box>
      </Modal>
    );
  }

  return renderModal();
}

export default ConfirmDel;
