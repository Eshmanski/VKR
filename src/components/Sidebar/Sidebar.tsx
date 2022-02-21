import { File } from '../../shared/interfaces';
import { MouseEvent, MouseEventHandler, useState } from 'react';
import FolderTree from '../Folders/FolderTree';
import { Button, Input, Modal, Typography, Box } from '@mui/material';
import { styleModal } from '../../shared/stylesMUI';
import styles from './Sidebar.module.css';
import nextId from "react-id-generator";


function Sidebar(): JSX.Element {
  const [newFileName, setNewFileName] = useState('');
  const [modalOptions, setModalOptions] = useState({
    isOpen: false,
    folderName: '',
    name: '',
  }); 
  const [folders, setFolders] = useState([
    {
      name: 'Изделия',
      files: [
        {id: '123', name: 'Изделие_1'},
        {id: '124', name: 'Изделие_2'},
      ]
    },
    {
      name: 'Детали',
      files: [
        {id: '201', name: 'Деталь_1'}
      ]
    },
    {
      name: 'Цеха',
      files: [
        {id: '301', name: 'Цех_1'}
      ]
    },
    {
      name: 'Маршруты',
      files: [
        {id: '401', name: 'Маршрут_1'}
      ]
    }
  ]);

  const addFile = (name: string) => {
    return ()  => {
      const idx = folders.findIndex(item => item.name === name);
      console.log(idx)
      if(idx !== -1) {
        const newFolders = [...folders]
        const newFiles = [...newFolders[idx].files];
        const id: string = nextId(`${newFileName}-`);

        const newFile: File = {
          name: newFileName,
          id
        };
        newFiles.push(newFile);
        newFolders[idx].files = newFiles;
        setFolders(newFolders);
        handleClose();
        setNewFileName('');
      }
    }
  } 

  const handleOpen = (folderName: string) => {
    const names: any = {
      'Изделия': 'Изделия',
      'Детали': 'Детали',
      'Цеха': 'Цеха',
      'Маршруты': 'Маршрута'
    }

    const key: keyof any = folderName

    setModalOptions({
      isOpen: true,
      name: names[key],
      folderName,
    });
  } 

  const handleClose = () => setModalOptions({
    isOpen: false,
    folderName: '',
    name: '',
  });

  
  return (
    <div className={styles.sidebar}>
      <p>Наименование Предприятия</p>
      <FolderTree folders={folders} handleOpen={handleOpen}></FolderTree>
      
      
      <Modal
        open={modalOptions.isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Введите название {modalOptions.name.toLowerCase()}
            <Input onChange={event => setNewFileName(event.target.value)} value={newFileName}></Input>
            <Button 
              sx={{ marginTop: '10px' }} 
              color="success" 
              variant="contained"
              onClick={addFile(modalOptions.folderName)}
            >
              Добавить
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>

  )
}

export default Sidebar;
