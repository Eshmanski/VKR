import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Edit, CheckCircle } from '@mui/icons-material';
import { declinationTitle } from '../../shared/utils';
import styles from './Title.module.css';
import { changeTitle } from '../../store/actions/stateProjectActions';


function Title({ modelId }) {
  const enterpriseModel  = useSelector(store => store.stateProject.enterpriseModels.find(model => model.id === modelId));
  const dispatch = useDispatch();
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [inputTitle, setInputTitle] = useState('');

  useEffect(() => {
    setInputTitle(enterpriseModel.title);
  }, [
    enterpriseModel.title,
  ]);

  const saveTitle = () => {
    dispatch(changeTitle( modelId, inputTitle ));
    setIsEditTitle(false);
  }

  return (
    <div className={styles.header}>
      {declinationTitle(enterpriseModel.type, 1)}:
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
