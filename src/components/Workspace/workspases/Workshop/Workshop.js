import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import styles from './Workshop.module.css'
import Title from '../../../Title/Title';
import { deleteWorkshop, updateWorkshopBody } from '../../../../store/actions/workshopDataAction';
import { clearChosenItem } from '../../../../store/actions/stateProjectActions';


function Workshop({ itemId }) {
  const workshopDataItem = useSelector(store => store.workshopData.items.find(item => item.id === itemId));
  const dispatch = useDispatch();

  const [isEditBody, setIsEditBody] = useState(false);

  const [inputName, setInputName] = useState('');
  const [inputDescription, setInputDescription] = useState('');

  useEffect(() => {
    setInputName(workshopDataItem.body.name);

    workshopDataItem.body.description 
      ? setInputDescription(workshopDataItem.body.description)
      : setInputDescription('');
  }, [
    workshopDataItem.body.name,
    workshopDataItem.body.description,
  ]);

  useEffect(() => {
    setIsEditBody(false);
  }, [itemId])

  const saveBody = () => {
    dispatch(updateWorkshopBody({itemId, newBody: {name: inputName, description: inputDescription}}));
    setIsEditBody(false);
  }

  const deleteItem = () => {
    dispatch(clearChosenItem());
    dispatch(deleteWorkshop({itemId}));
  }

  return (
    <div className={styles.info}>
      <Title projectItem={workshopDataItem} itemId={itemId} itemType={'workshopData'}></Title>

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
      <div className={styles.btnList}>
        {isEditBody || <Button onClick={() => setIsEditBody(true)} sx={{margin:'10px'}} color="secondary" variant="contained">Редактировать</Button>}
        {isEditBody && 
          <div>
            <Button onClick={() => setIsEditBody(false)} sx={{margin:'10px'}} color="error" variant="contained">Отменить</Button>
            <Button onClick={saveBody} sx={{margin:'10px'}} color="success" variant="contained">Сохранить</Button>
          </div>
        }
        <Button onClick={() => deleteItem()} sx={{margin:'10px'}} color="error" variant="contained">Удалить</Button>
      </div>
    </div>
  )
}

export default Workshop;
