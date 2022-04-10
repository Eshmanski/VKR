import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import styles from './Workshop.module.css'
import Title from '../../../Title/Title';
import { deleteWorkshop, updateWorkshopBody } from '../../../../store/actions/workshopDataAction';
import { clearChosenItem, setBodyChanging } from '../../../../store/actions/stateProjectActions';



function Workshop({ itemId }) {
  const workshopDataItem = useSelector(store => store.workshopData.items.find(item => item.id === itemId));
  const dispatch = useDispatch();

  const [isEditBody, setIsEditBody] = useState(false);

  const [inputName, setInputName] = useState('');
  const [inputDescription, setInputDescription] = useState('');

  const fillField = useCallback(() => {
    setInputName(workshopDataItem.body.name);
    setInputDescription(workshopDataItem.body.description);
  }, [
    workshopDataItem.body.name,
    workshopDataItem.body.description
  ]);

  useEffect(() => {
    fillField();
  }, [
    fillField
  ]);

  const saveBody = () => {
    dispatch(updateWorkshopBody({itemId, newBody: {name: inputName, description: inputDescription}}));
    dispatch(setBodyChanging(false));
    removeChange();
  }

  const deleteItem = () => {
    dispatch(setBodyChanging(false));
    dispatch(clearChosenItem());
    dispatch(deleteWorkshop({itemId}));
  }

  const switchChange = () => {
    dispatch(setBodyChanging(true));
    setIsEditBody(true);
  }

  const removeChange = () => {
    dispatch(setBodyChanging(false));
    fillField();
    setIsEditBody(false);
  }

  useEffect(() => {
    setIsEditBody(false);
  }, [itemId]);

  window.addEventListener('saveBody', saveBody);
  window.addEventListener('removeChange', removeChange);

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

            <td className='top'>Описание</td>
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
        {isEditBody || <Button onClick={() => switchChange()} sx={{margin:'10px'}} color="secondary" variant="contained">Редактировать</Button>}
        {isEditBody && 
          <div>
            <Button onClick={() => removeChange()} sx={{margin:'10px'}} color="error" variant="contained">Отменить</Button>
            <Button onClick={saveBody} sx={{margin:'10px'}} color="success" variant="contained">Сохранить</Button>
          </div>
        }
        <Button onClick={() => deleteItem()} sx={{margin:'10px'}} color="error" variant="contained">Удалить</Button>
      </div>
    </div>
  )
}

export default Workshop;
