import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import AddIcon from '@mui/icons-material/Add';
import styles from './FolderTree.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setChosenItem, togglePack } from '../../store/actions/stateProjectActions';


function FolderTree({ data, handleOpen}) {
  const {chosenPacks, chosenItemId} = useSelector(store => store.stateProject);
  const dispatch = useDispatch();

  const clickPackHandler = (packType) => dispatch(togglePack(packType));
  const clickItemHandler = (itemId, packType) => {
    dispatch(setChosenItem({itemId, packType}));
  }

  return (
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
            <div className={styles.addBtn} onClick={() => handleOpen(key)}><AddIcon></AddIcon></div>
              <TreeItem nodeId={key} label={data[key].name} onClick={() => clickPackHandler(key)}>
                {data[key].items.map(item => <TreeItem nodeId={item.id} label={item.label} key={item.id} onClick={() => clickItemHandler(item.id, key)}/>)}
              </TreeItem>
            </div>
        );
      })}
    </TreeView>
  )
}

export default FolderTree;
