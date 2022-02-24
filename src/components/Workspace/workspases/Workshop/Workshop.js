import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import styles from './Workshop.module.css'
import { changeBodyWorkshop } from '../../../../store/actions/dataActions';
import Title from '../../../Title/Title';


function Workshop({itemType, itemId}) {
  const data = useSelector(store => store.data);
  const projectItem = data[itemType].items.find((item) => item.id === itemId);
  const dispatch = useDispatch();

  const [isEditBody, setIsEditBody] = useState(true);

  const [inputName, setInputName] = useState('');
  const [inputDescription, setInputDescription] = useState('');

  useEffect(() => {
    setInputName(projectItem.body.name);

    projectItem.body.description 
      ? setInputDescription(projectItem.body.description)
      : setInputDescription('');
  }, [
    projectItem.body.name,
    projectItem.body.description,
  ]);

  const saveBody = () => {
    dispatch(changeBodyWorkshop({itemId, newBody: {name: inputName, description: inputDescription}, packType: itemType}));
    setIsEditBody(false);
  }

  return (
    <div className={styles.info}>
      <Title projectItem={projectItem} itemId={itemId} itemType={itemType}></Title>

      <table>
        <tbody>
          <tr>

            <td>Наименование цеха</td>
            <td>
              {isEditBody || <div className={styles.inputBox}>{inputName}</div>}
              {isEditBody && <input className={styles.hiddenInput} type="text" onChange={(event)=>setInputName(event.target.value)} value={inputName}/>}       
            </td>

          </tr>
          <tr >

            <td>Описание</td>
            <td>
              <textarea
                className={styles.description}
                type="text-area" disabled={!isEditBody}
                onChange={(e)=>setInputDescription(e.target.value)}
                value={inputDescription} 
              />

            </td>

          </tr>
        </tbody>
      </table>
      {isEditBody || <Button onClick={() => setIsEditBody(true)} sx={{margin:'10px'}} color="secondary" variant="contained">Редактировать</Button>}
      {isEditBody && 
        <>
          <Button onClick={() => setIsEditBody(false)} sx={{margin:'10px'}} color="error" variant="contained">Отменить</Button>
          <Button onClick={saveBody} sx={{margin:'10px'}} color="success" variant="contained">Сохранить</Button>
        </>
      }
    </div>
  )
}

export default Workshop;
