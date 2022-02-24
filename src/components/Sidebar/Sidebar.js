import { useState } from 'react';
import FolderTree from '../Folders/FolderTree';
import styles from './Sidebar.module.css';
import nextId from "react-id-generator";
import CreateItem from '../modals/CreateItem/CreateItem'
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../store/actions/dataActions';
import { setChosenItem } from '../../store/actions/stateProjectActions'



function Sidebar() {
  const [modalOptions, setModalOptions] = useState({
    isOpen: false,
    typeData: '',
  });
  

  const data = useSelector(store => store.data);
  const dispatch = useDispatch();

  const addFile = (packType, itemName) => {
    const itemId = nextId(`${packType}-`);
 
    handleClose();
    dispatch(addItem({itemId, itemName, packType}));
    dispatch(setChosenItem({itemId, packType}));
  } 

  const handleOpen = (typeData) => setModalOptions({
      isOpen: true,
      typeData,
  });

  const handleClose = () => setModalOptions({
    isOpen: false,
    typeData: '',
  });

  return (
    <div className={styles.sidebar}>
      <p>Предприятие</p>
      <FolderTree 
        data={data} 
        onOpen={handleOpen}
      ></FolderTree>
      <CreateItem modalOptions={modalOptions} onAddFile={addFile} onClose={handleClose}></CreateItem>
    </div>
  )
}

export default Sidebar;
