import TreeView from '@mui/lab/TreeView';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import AddIcon from '@mui/icons-material/Add';
import styles from './FolderTree.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBody, togglePack } from '../../store/actions/stateProjectActions';
import { useState } from 'react';
import SaveChanges from '../modals/SaveChanges/SaveChanges';
import { kitcut } from '../../shared/utils';

const modelLabels = {
  workshop: 'Цеха',
  route: 'Маршруты',
  component: 'Детали',
  product: 'Изделия'
}


function FolderTree({ onOpen }) {
  const {chosenPack, chosenModelId, isBodyChanging, enterpriseModels} = useSelector(store => store.stateProject);
  const dispatch = useDispatch();

  const [saveAlertOption, setSaveAlertOption] = useState({isOpen: false, fn: null});

  const clearAlertOption = () => setSaveAlertOption({isOpen: false, fn: null});

  const clickPackHandler = (type) => dispatch(togglePack(type));

  const openItem = (item) => {
    dispatch(fetchBody(item.id, item.type, item.bodyId));
  }

  const choseItem = (item) => {
    if(isBodyChanging) {
      setSaveAlertOption({isOpen: true, fn: () => openItem(item)});
    } else {
      openItem(item);
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

  const prepareEnterpriseModels = {
    product: [],
    component: [],
    route: [],
    workshop: []
  }

  enterpriseModels.forEach((item) => {
    prepareEnterpriseModels[item.type].push(item);
  });

  prepareEnterpriseModels.route = prepareEnterpriseModels.route.sort((a, b) => a.title.localeCompare(b.title, undefined, {numeric: true, sensitivity: "base"}))

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
      expanded={[ chosenPack ]}
      selected={[ chosenModelId.toString() ]}
    >
      {Object.keys(prepareEnterpriseModels).map((key) => {
        return (
            <div style={{position: 'relative'}} key={key}>
              <div className={styles.addBtn} onClick={() => createItem(key)}><AddIcon></AddIcon></div>

              <TreeItem nodeId={key} label={modelLabels[key]} onClick={() => clickPackHandler(key)} >

                {prepareEnterpriseModels[key].map(item => 
                  <CustomizedTreeItem
                    nodeId={ item.id.toString() }
                    label={ kitcut(item.title, 22) }
                    key={ item.id }
                    onClick={() => choseItem(item)}
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
