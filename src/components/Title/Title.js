import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Edit, CheckCircle } from '@mui/icons-material';
import { declinationTitle } from '../../shared/utils';
import { changeLabel } from '../../store/actions/dataActions';
import styles from './Title.module.css';


function Title({itemType, itemId, projectItem}) {
  const dispatch = useDispatch();
  const [isEditLabel, setIsEditLabel] = useState(false);
  const [inputLabel, setInputLabel] = useState('');
  
  useEffect(() => {
    setInputLabel(projectItem.label);
  }, [
    projectItem.label,
  ]);

  const saveLabel = () => {
    dispatch(changeLabel({itemId, newLabel: inputLabel, packType: itemType}));
    setIsEditLabel(false);
  }

  return (
    <div className={styles.header}>
      {declinationTitle(itemType, 1)}:
      {isEditLabel ||
        <>
          <div className={styles.label}>{inputLabel}</div>
          <Edit className={styles.editIcon} onClick={() => setIsEditLabel(true)}></Edit>
        </>
      }
      {isEditLabel &&
        <>
          <input className={styles.inputLabel} onChange={(e)=>setInputLabel(e.target.value)} type="text" value={inputLabel}/>
          <CheckCircle className={styles.editIcon} onClick={saveLabel}></CheckCircle>
        </>
      }
    </div>
  );
}

export default Title;
