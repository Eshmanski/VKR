import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import AddIcon from '@mui/icons-material/Add';
import styles from './FolderTree.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setChosenItem, togglePack } from '../../store/actions/stateProjectActions';
import { useState } from 'react';
import SaveChanges from '../modals/SaveChanges/SaveChanges';


function FolderTree({ data, onOpen }) {
  const {chosenPacks, chosenItemId, isBodyChanging} = useSelector(store => store.stateProject);
  const dispatch = useDispatch();

  const [saveAlertOption, setSaveAlertOption] = useState({isOpen: false, fn: null});

  const clearAlertOption = () => setSaveAlertOption({isOpen: false, fn: null});

  const clickPackHandler = (packType) => dispatch(togglePack(packType));

  const openItem = (itemId, packType) => {
    dispatch(setChosenItem({itemId, packType}));
  }

  const choseItem = (itemId, packType) => {
    if(isBodyChanging) {
      setSaveAlertOption({isOpen: true, fn: () => openItem(itemId, packType)});
    } else {
      openItem(itemId, packType);
    }
  }

  const createItem = (key) => {
    if(isBodyChanging) {
      setSaveAlertOption({isOpen: true, fn: () => onOpen(key)});
    } else {
      onOpen(key);
    }
  }

  return (
    <>
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{
        flexGrow: 1,
        width: 'inherit', 
        overflowX: 'hidden', 
        fontSize: '14px',
        overflowY: 'scroll',
      }}
      expanded={chosenPacks}
      selected={[chosenItemId]}
    >
      {Object.keys(data).map((key) => {
        return (
            <div style={{position: 'relative'}} key={key}>
            <div className={styles.addBtn} onClick={() => createItem(key)}><AddIcon></AddIcon></div>
              <TreeItem nodeId={key} label={data[key].name} onClick={() => clickPackHandler(key)}>
                {data[key].items.map(item => <TreeItem nodeId={item.id} label={item.title} key={item.id} onClick={() => choseItem(item.id, key)}/>)}
              </TreeItem>
            </div>
        );
      })}
    </TreeView>
    <SaveChanges isOpen={saveAlertOption.isOpen} clearAlertOption={clearAlertOption} callBack={saveAlertOption.fn}></SaveChanges>
    </>
  )
}

export default FolderTree;
