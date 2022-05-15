import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FolderTree from '../Folders/FolderTree';
import nextId from "react-id-generator";
import CreateItem from '../modals/CreateItem/CreateItem'
import { useDispatch, useSelector } from 'react-redux';
import { createModel, switchSearch } from '../../store/actions/stateProjectActions';
import styles from './Sidebar.module.css';
import Search from '../Search/Search';


function Sidebar() {
  const [modalOptions, setModalOptions] = useState({ isOpen: false, typeData: '' });
  const {productData, componentData, workshopData, routeData, stateProject: { isShowSearch }} = useSelector(store => store);
  const dispatch = useDispatch();

  const addFile = (packType, itemName) => {
    const itemId = nextId(`${packType}-`);
    handleClose();
    dispatch(createModel(packType, itemName));
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
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.nameProject}>Предприятие</div>
          <div 
            className={styles.search + ' ' +  (isShowSearch ? styles.activeSearch : '')}
            onClick={() => dispatch(switchSearch())}
          >
              <SearchIcon className={styles.loup}></SearchIcon>
              { isShowSearch 
                ? <ArrowBackIosIcon></ArrowBackIosIcon>
                : <ArrowForwardIosIcon></ArrowForwardIosIcon>

              }
          </div>
        </div>
        <FolderTree 
          data={{productData, componentData, routeData, workshopData}} 
          onOpen={handleOpen}
        ></FolderTree>
        <CreateItem modalOptions={modalOptions} onAddFile={addFile} onClose={handleClose}></CreateItem>
      </div>
      <Search isShowSearch={isShowSearch}></Search>
    </div>
  )
}

export default Sidebar;
