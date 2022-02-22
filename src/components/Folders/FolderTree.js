import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import AddIcon from '@mui/icons-material/Add';
import styles from './FolderTree.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setChosenItem, togglePack } from '../../store/actions/stateProjectActions';


function FolderTree({ data, handleOpen}) {
  const {chosenPacks, chosenItem} = useSelector(store => store.stateProject);
  const dispatch = useDispatch();

  const clickPackHandler = (type) => dispatch(togglePack(type));
  const clickItemHandler = (id, type) => dispatch(setChosenItem(id, type));

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{height: '100%', width: 'inherit', overflowX: 'hidden', fontSize: '14px'}}
      expanded={chosenPacks}
      selected={[chosenItem]}
    >
      {data.map((pack) => {
        return (
            <div style={{position: 'relative'}} key={pack.typeItems}>
            <div className={styles.addBtn} onClick={() => handleOpen(pack.typeItems)}><AddIcon></AddIcon></div>
              <TreeItem nodeId={pack.typeItems} label={pack.name} onClick={() => clickPackHandler(pack.typeItems)}>
                {pack.items.map(item => <TreeItem nodeId={item.id} label={item.name} key={item.id} onClick={() => clickItemHandler(item.id, pack.typeItems)}/>)}
              </TreeItem>
            </div>
        );
      })}
    </TreeView>
  )
}

export default FolderTree;
