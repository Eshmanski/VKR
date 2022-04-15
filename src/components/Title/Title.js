import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Edit, CheckCircle } from '@mui/icons-material';
import { declinationTitle } from '../../shared/utils';
import styles from './Title.module.css';
import { updateRouteTitle } from '../../store/actions/routeDataAction';
import { updateWorkshopTitle } from '../../store/actions/workshopDataAction';
import { updateProductTitle } from '../../store/actions/productDataActons';
import { updateComponentTitle } from '../../store/actions/componentDataAction';

const titleActions = {
  componentData: updateComponentTitle,
  productData: updateProductTitle,
  workshopData: updateWorkshopTitle,
  routeData: updateRouteTitle,
}

function Title({itemType, itemId, projectItem}) {
  const dispatch = useDispatch();
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [inputTitle, setInputTitle] = useState('');
  
  useEffect(() => {
    setInputTitle(projectItem.title);
  }, [
    projectItem.title,
  ]);

  const saveTitle = () => {
    dispatch(titleActions[itemType]({ itemId, newTitle: inputTitle }))
    setIsEditTitle(false);
  }

  return (
    <div className={styles.header}>
      {declinationTitle(itemType, 1)}:
      {isEditTitle ||
        <>
          <div className={styles.title}>{inputTitle}</div>
          <Edit className={styles.editIcon} onClick={() => setIsEditTitle(true)}></Edit>
        </>
      }
      {isEditTitle &&
        <>
          <input className={styles.inputTitle} onChange={(e)=>setInputTitle(e.target.value)} type="text" value={inputTitle}/>
          <CheckCircle className={styles.editIcon} onClick={saveTitle}></CheckCircle>
        </>
      }
    </div>
  );
}

export default Title;
