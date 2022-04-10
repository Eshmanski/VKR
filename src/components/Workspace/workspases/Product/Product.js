import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import styles from './Product.module.css'
import Title from '../../../Title/Title';
import AddIcon from '@mui/icons-material/Add';
import { clearChosenItem, setBodyChanging, setChosenItem } from '../../../../store/actions/stateProjectActions';
import { deleteProduct, updateProductBody } from '../../../../store/actions/productDataActons';
import ChooseComponent from '../../../modals/ChooseComponent/ChooseComponent';
import ClearIcon from '@mui/icons-material/Clear';


function Product({itemId}) {
  const productDataItem = useSelector(store => store.productData.items.find(item => item.id === itemId));
  const routeDataItems = useSelector(store => store.routeData.items);
  const componentDataItems = useSelector(store => store.componentData.items);
  const dispatch = useDispatch();

  const [isEditBody, setIsEditBody] = useState(false);

  const [inputName, setInputName] = useState('');
  const [inputDrawing, setInputDrawing] = useState('');
  const [inputRouteId, setInputRouteId] = useState('');
  const [inputComponentsId, setInputComponentsId] = useState([]);
  const [inputDescription, setInputDescription] = useState('');

  const [showChooseComponent, setShowChooseComponent] = useState(false);

  const fillField = useCallback(() => {
    setInputName(productDataItem.body.name);
    setInputDrawing(productDataItem.body.drawing);
    setInputRouteId(productDataItem.body.routeId);
    setInputComponentsId(productDataItem.body.componentsId);
    setInputDescription(productDataItem.body.description);
  }, [
    productDataItem.body.name,
    productDataItem.body.drawing,
    productDataItem.body.routeId,
    productDataItem.body.componentsId,
    productDataItem.body.description
  ]);

  useEffect(() => {
    fillField();
  }, [
    fillField
  ]);

  const handleMoveTo = (itemId, packType) => {
    dispatch(setChosenItem({itemId, packType}));
  }

  const saveBody = () => {
    dispatch(updateProductBody({
      itemId, 
      newBody: {
        name: inputName, 
        drawing: inputDrawing, 
        routeId: inputRouteId,
        componentsId: inputComponentsId,
        description: inputDescription
      }
    }));
    dispatch(setBodyChanging(false));
    setIsEditBody(false);
  }

  const deleteItem = () => {
    dispatch(setBodyChanging(false));
    dispatch(clearChosenItem());
    dispatch(deleteProduct({itemId}));
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

  const onAddComponent = (id) => {
    setInputComponentsId([...inputComponentsId, id]);
    setShowChooseComponent(false);
  }

  const removeComponent = (id) => {
    setInputComponentsId(inputComponentsId.filter(componentId => componentId !== id));
  }

  useEffect(() => {
    setIsEditBody(false);
  }, [itemId])

  window.addEventListener('saveBody', saveBody);
  window.addEventListener('removeChange', removeChange);

  return (
    <div className={styles.info}>
      <Title projectItem={productDataItem} itemId={itemId} itemType={'productData'}></Title>

      <table>
        <tbody>
          <tr>
            <td>Наименование изделия</td>
            <td>
              {isEditBody || <div className={styles.inputBox}>{inputName}</div>}
              {isEditBody && <input className={styles.hiddenInput} type="text" onChange={(event)=>setInputName(event.target.value)} value={inputName}/>}       
            </td>
          </tr>

          <tr>
            <td>Чертеж</td>
            <td>
              {isEditBody || <div className={styles.inputBox}>{inputDrawing}</div>}
              {isEditBody && <input className={styles.hiddenInput} type="text" onChange={(event)=>setInputDrawing(event.target.value)} value={inputDrawing}/>}  
            </td>
          </tr>

          <tr>
            <td>Маршрут</td>
            <td>
              {isEditBody || 
                <div
                  onClick={inputRouteId ? () => handleMoveTo(inputRouteId, 'routeData') : null} 
                  className={styles.inputBox + ' ' + styles.link}
                >
                  {routeDataItems.find(item=>item.id === inputRouteId)?.title}
                </div>
              }
              {isEditBody && <select className={styles.hiddenSelect} value={inputRouteId} onChange={(e) => setInputRouteId(e.target.value)}>
                <option value=''></option>
                {routeDataItems.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
              </select>}  
            </td>
          </tr>

          <tr>
            <td className='top'>Детали</td>
            <td>
              {isEditBody || 
                <>
                  {inputComponentsId.map((id) =>
                    <div 
                      key={id}
                      onClick={inputRouteId ? () => handleMoveTo(id, 'componentData') : null}
                      className={styles.componentBox + ' ' + styles.link}
                    >
                      {componentDataItems.find(item=>item.id === id)?.title}
                    </div>     
                  )}
                </>
              }
              {isEditBody && 
                <>
                  {inputComponentsId.map((id) =>
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
