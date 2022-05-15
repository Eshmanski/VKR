import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import Title from '../../../Title/Title';
import ConfirmDel from '../../../modals/ConfirmDel/ConfirmDel';
import { changeBody, deleteBody, returnBody, saveBody, setIsBodyChanging } from '../../../../store/actions/stateProjectActions';
import styles from './Workshop.module.css'



function Workshop({ modelId }) {
  const { chosenBody, isBodyChanging } = useSelector(store => store.stateProject);

  const dispatch = useDispatch();

  const changeField = (key, value) => {
    dispatch(changeBody({...chosenBody, [key]: value}));
  }

  const switchChange = () => {
    dispatch(setIsBodyChanging(true));
  }

  const saveBodyHandler = () => {
    dispatch(saveBody());
  }

  const removeChange = () => {
    dispatch(returnBody());
  }
  
  const deleteItem = () => {
    dispatch(deleteBody());
  }


  const { name, description } = chosenBody;

  const [showConfirmDel, setShowConfirmDel] = useState(false);

  return (
    <div className={styles.info}>
      <Title modelId={modelId}></Title>

      <table>
        <tbody>
          <tr>

            <td>Наименование цеха</td>
            <td>
              {isBodyChanging || <div className={styles.inputBox}>{name}</div>}
              {isBodyChanging && 
                <input 
                  className={styles.hiddenInput} 
                  type="text" 
                  onChange={(e)=>changeField('name', e.target.value)} 
                  value={name}
                />}       
            </td>

          </tr>
          <tr >

            <td className='top'>Описание</td>
            <td>
              <textarea
                className={styles.description}
                type="text-area" disabled={!isBodyChanging}
                onChange={(e)=>changeField('description', e.target.value)}
                value={description} 
              />

            </td>

          </tr>
        </tbody>
      </table>
      <div className={styles.btnList}>
        {isBodyChanging || <Button onClick={() => switchChange()} sx={{margin:'10px'}} color="secondary" variant="contained">Редактировать</Button>}
        {isBodyChanging && 
          <div>
            <Button onClick={() => removeChange()} sx={{margin:'10px'}} color="error" variant="contained">Отменить</Button>
            <Button onClick={saveBodyHandler} sx={{margin:'10px'}} color="success" variant="contained">Сохранить</Button>
          </div>
        }
        <Button onClick={() => setShowConfirmDel(true)} sx={{margin:'10px'}} color="error" variant="contained">Удалить</Button>
      </div>

      <ConfirmDel
        isOpen={showConfirmDel}
        onClose={() => setShowConfirmDel(false)}
        onDel={() => deleteItem()}
        type={'workshop'}
        id={modelId}
      ></ConfirmDel>
    </div>
  )
}

export default Workshop;
