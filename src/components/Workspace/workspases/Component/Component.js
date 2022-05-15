import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import styles from './Component.module.css'
import Title from '../../../Title/Title';
import ConfirmDel from '../../../modals/ConfirmDel/ConfirmDel';
import { changeBody, deleteBody, returnBody, saveBody, setIsBodyChanging, fetchBody } from '../../../../store/actions/stateProjectActions';

function Component({ modelId }) {
  const { chosenBody, isBodyChanging } = useSelector(store => store.stateProject);
  const routeModels = useSelector(store => store.stateProject.enterpriseModels.filter(model => model.type === 'route'));

  const dispatch = useDispatch();

  const changeField = (key, value) => {
    dispatch(changeBody({ ...chosenBody, [key]: value}))
  }

  const handleMoveTo = (model) => {
    dispatch(fetchBody(model.id, model.type, model.bodyId));
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

  const { name, drawing, routeId, description } = chosenBody;

  const [showConfirmDel, setShowConfirmDel] = useState(false);

  return (
    <div className={styles.info}>
      <Title modelId={modelId} ></Title>

      <table>
        <tbody>
          <tr>
            <td>Наименование детали</td>
            <td>
              {isBodyChanging || <div className={styles.inputBox}>{name}</div>}
              {isBodyChanging && 
                <input 
                  className={styles.hiddenInput} 
                  type="text" 
                  onChange={(e)=> changeField('name', e.target.value)} 
                  value={name}
                />}       
            </td>
          </tr>
          <tr>
            <td>Чертеж</td>
            <td>
              {isBodyChanging || <div className={styles.inputBox}>{drawing}</div>}
              {isBodyChanging && 
                <input 
                  className={styles.hiddenInput} 
                  type="text" 
                  onChange={(e)=>changeField('drawing', e.target.value)} 
                  value={drawing}
                />}  
            </td>
          </tr>
          <tr>
            <td>Маршрут</td>
            <td>
              {isBodyChanging || 
                <div 
                  onClick={routeId ? () => handleMoveTo(routeModels.find(item=>item.bodyId === routeId)) : null} 
                  className={styles.inputBox + ' ' + styles.link}
                >
                  { routeModels.find(item=>item.bodyId === routeId)?.title || ''}
                </div>
              }
              {isBodyChanging && <select className={styles.hiddenSelect} value={routeId} onChange={(e)=>changeField('routeId', e.target.value)}>
                <option value=''></option>
                { routeModels.map(item => <option key={item.id} value={item.bodyId}>{item.title}</option>) }
              </select>}  
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
        type={'component'}
        id={modelId}
      ></ConfirmDel>
    </div>
  )
}

export default Component;
