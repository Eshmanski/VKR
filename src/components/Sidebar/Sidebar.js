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

  const addFile = (type, newName) => {
    const idx = data.findIndex(pack => pack.typeItems === type);

    if(idx !== -1) {
      const itemId = nextId(`${type}-`);
      const newItem = { name: newName, id: itemId }

      handleClose();
      dispatch(addItem(idx, newItem));
      dispatch(setChosenItem(itemId, type));
    }
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
        handleOpen={handleOpen}
      ></FolderTree>
      <CreateItem modalOptions={modalOptions} onAddFile={addFile} onClose={handleClose}></CreateItem>
    </div>

  )
}

export default Sidebar;
