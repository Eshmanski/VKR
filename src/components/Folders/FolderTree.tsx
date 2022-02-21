import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import AddIcon from '@mui/icons-material/Add';
import { PropsFolderTree } from '../../shared/interfaces';
import styles from './FolderTree.module.css';


function FolderTree({ folders, handleOpen }: PropsFolderTree) {
  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{height: '100%', width: 'inherit', overflowX: 'hidden', fontSize: '14px'}}
      expanded={['0']}
      selected={['123']}
    >
      {folders.map((folder, index) => {
        return (
            <div style={{position: 'relative'}} key={index.toString()}>
            <div className={styles.addBtn} onClick={() => handleOpen(folder.name)}><AddIcon></AddIcon></div>
              <TreeItem nodeId={index.toString()} label={folder.name}>
                {folder.files.map(file => <TreeItem nodeId={file.id.toString()} label={file.name} key={file.id.toString()}/> )}
              </TreeItem>
            </div>
        );
      })}
    </TreeView>
  )
}

export default FolderTree;
