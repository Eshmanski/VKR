import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import styles from './Product.module.css'
import Title from '../../../Title/Title';
import AddIcon from '@mui/icons-material/Add';
import { changeBodyItem, deleteChosenItem, returnBodyItem, saveBodyItem, setBodyChanging, setChosenItem } from '../../../../store/actions/stateProjectActions';

import ChooseComponent from '../../../modals/ChooseComponent/ChooseComponent';
import ClearIcon from '@mui/icons-material/Clear';


function Product() {
  const { chosenItem, isBodyChanging } = useSelector(store => store.stateProject);
  const routeDataItems = useSelector(store => store.routeData.items);
  const componentDataItems = useSelector(store => store.componentData.items);

  const dispatch = useDispatch();

  const changeField = (key, value) => {
    dispatch(changeBodyItem({...chosenItem.body, [key]: value}));
  }

  const handleMoveTo = (itemId, packType) => {
    dispatch(setChosenItem({itemId, packType}));
  }

  const switchChange = () => {
    dispatch(setBodyChanging(true));
  }

  const saveBody = () => {
    dispatch(saveBodyItem());
  }

  const removeChange = () => {
    dispatch(returnBodyItem());
  }

  const deleteItem = () => {
    dispatch(deleteChosenItem());
  }


  const itemId = chosenItem.id;
  const { name, drawing, routeId, componentsId, description } = chosenItem.body;

  const [showChooseComponent, setShowChooseComponent] = useState(false);

  const onAddComponent = (id) => {
    changeField('componentsId', [...componentsId, id]);
    setShowChooseComponent(false);
  }

  const removeComponent = (id) => {
    changeField('componentsId', componentsId.filter(componentId => componentId !== id));
  }


  return (
    <div className={styles.info}>
      <Title projectItem={chosenItem} itemId={itemId} itemType={'productData'}></Title>

      <table>
        <tbody>
          <tr>
            <td>Наименование изделия</td>
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

          <tr>
            <td>Чертеж</td>
            <td>
              {isBodyChanging || <div className={styles.inputBox}>{drawing}</div>}
              {isBodyChanging && 
                <input 
                  className={styles.hiddenInput} 
                  type="text" 
                  onChange={(e)=>changeField('drawing', e.target.value)} 
                  value={drawing}/>}  
            </td>
          </tr>

          <tr>
            <td>Маршрут</td>
            <td>
              {isBodyChanging || 
                <div
                  onClick={routeId ? () => handleMoveTo(routeId, 'routeData') : null} 
                  className={styles.inputBox + ' ' + styles.link}
                >
                  {routeDataItems.find(item=>item.id === routeId)?.title}
                </div>
              }
              {isBodyChanging && <select className={styles.hiddenSelect} value={routeId} onChange={(e) => changeField('routeId', e.target.value)}>
                <option value=''></option>
                {routeDataItems.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
              </select>}  
            </td>
          </tr>

          <tr>
            <td className='top'>Детали</td>
            <td>
              {isBodyChanging || 
                <>
                  {componentsId.map((id) =>
                    <div 
                      key={id}
                      onClick={() => handleMoveTo(id, 'componentData')}
                      className={styles.componentBox + ' ' + styles.link}
                    >
                      {componentDataItems.find(item=>item.id === id)?.title}
                    </div>     
                  )}
                </>
              }
              {isBodyChanging && 
                <>
                  {componentsId.map((id) =>
                    <div className={styles.componentCard} key={id}>
                      <div 
                        className={styles.componentBox + ' ' + styles.componentRed}
                      >
                        {componentDataItems.find(item=>item.id === id)?.title}
                      </div>
                      <div className={styles.clearIcon}>
                          <ClearIcon onClick={() => removeComponent(id)} sx={{textAlign: 'center', marginTop: '3px'}}></ClearIcon>
                      </div>
                    </div>
                  )}
                  <div className={styles.addWrapper}>
                    <AddIcon onClick={() => setShowChooseComponent(true)} className={styles.addBotton}></AddIcon>
                  </div>
                </>
              }  
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
            <Button onClick={saveBody} sx={{margin:'10px'}} color="success" variant="contained">Сохранить</Button>
          </div>
        }
        <Button onClick={() => deleteItem()} sx={{margin:'10px'}} color="error" variant="contained">Удалить</Button>
      </div>

      <ChooseComponent 
        isOpen={showChooseComponent}
        onClose={() => setShowChooseComponent(false)}
        onAddComponent={onAddComponent}
        componentItems={componentDataItems}
      ></ChooseComponent>
    </div>
  );
}

export default Product;
