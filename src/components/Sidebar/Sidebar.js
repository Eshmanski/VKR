import { useState } from 'react';
import FolderTree from '../Folders/FolderTree';
import styles from './Sidebar.module.css';
import nextId from "react-id-generator";
import CreateItem from '../modals/CreateItem/CreateItem'
import { useDispatch, useSelector } from 'react-redux';
import { addProductData } from '../../store/actions/productDataActons';
import { addComponentData } from '../../store/actions/componentDataAction';
import { addWorkshopData } from '../../store/actions/workshopDataAction';
import { addRouteData } from '../../store/actions/routeDataAction';


const createActions = {
  productData: addProductData,
  componentData: addComponentData,
  workshopData: addWorkshopData,
  routeData: addRouteData,
}

function Sidebar() {
  const [modalOptions, setModalOptions] = useState({ isOpen: false, typeData: '' });
  const {productData, componentData, workshopData, routeData} = useSelector(store => store);
  const dispatch = useDispatch();

  const addFile = (packType, itemName) => {
    const itemId = nextId(`${packType}-`);
    handleClose();
    dispatch(createActions[packType]({itemId, itemName}));
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
        data={{productData, componentData, routeData, workshopData}} 
        onOpen={handleOpen}
      ></FolderTree>
      <CreateItem modalOptions={modalOptions} onAddFile={addFile} onClose={handleClose}></CreateItem>
    </div>
  )
}

export default Sidebar;
