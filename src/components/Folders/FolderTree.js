import TreeView from '@mui/lab/TreeView';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import AddIcon from '@mui/icons-material/Add';
import styles from './FolderTree.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setChosenItem, togglePack } from '../../store/actions/stateProjectActions';
import { useState } from 'react';
import SaveChanges from '../modals/SaveChanges/SaveChanges';
import { kitcut } from '../../shared/utils';


function FolderTree({ data, onOpen }) {
  const {chosenPacks, chosenItemId, chosenType, isBodyChanging} = useSelector(store => store.stateProject);
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

  const CustomizedTreeItem = styled(TreeItem)`
  & .MuiTreeItem-label {
    margin-left: 10px;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
  & .MuiTreeItem-iconContainer {
    display: none;
  }
`;


  return (
    <>
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{
        flexGrow: 1,
        width: 'inherit', 
        overflowX: 'hidden',
        overflowY: 'scroll',
      }}
      expanded={chosenPacks}
      selected={[chosenItemId, chosenType]}
    >
      {Object.keys(data).map((key) => {
        return (
            <div style={{position: 'relative'}} key={key}>
            <div className={styles.addBtn} onClick={() => createItem(key)}><AddIcon></AddIcon></div>
              <TreeItem nodeId={key} label={data[key].name} onClick={() => clickPackHandler(key)} >
                {data[key].items.map(item => 
                  <CustomizedTreeItem 
                    nodeId={item.id}
                    label={kitcut(item.title, 22)}
                    key={item.id}
                    onClick={() => choseItem(item.id, key)}
                    sx={{overflow: 'hidden', whiteSpace: 'nowrap'}}
                  />
                )}
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
