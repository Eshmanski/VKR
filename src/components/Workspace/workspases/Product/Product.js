import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import styles from './Product.module.css'
import Title from '../../../Title/Title';
import AddIcon from '@mui/icons-material/Add';
import { changeBodyItem, deleteChosenItem, returnBodyItem, saveBodyItem, setBodyChanging, setChosenItem } from '../../../../store/actions/stateProjectActions';
import ChooseItem from '../../../modals/ChooseItem/ChooseItem';
import ConfirmDel from '../../../modals/ConfirmDel/ConfirmDel';
import ClearIcon from '@mui/icons-material/Clear';
import { copyObject } from '../../../../shared/utils';



function Product() {
  const { chosenItem, isBodyChanging } = useSelector(store => store.stateProject);
  const routeDataItems = useSelector(store => store.routeData.items);
  const componentDataItems = useSelector(store => store.componentData.items);
  const productDataItems = useSelector(store => store.productData.items);

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
  const { name, drawing, routeId, componentsId, productsId, description } = chosenItem.body;

  const [showChooseComponent, setShowChooseComponent] = useState(false);
  const [showChooseProduct, setShowChooseProduct] = useState(false);
  const [showConfirmDel, setShowConfirmDel] = useState(false);

  const onAddComponent = (id) => {
    changeField('componentsId', {...componentsId, [id]: {count: 1}});
    setShowChooseComponent(false);
  }

  const onChangeCountComponent = (id, count) => {
    const newComponentsId = copyObject(componentsId);
    newComponentsId[id] = {count};
    changeField('componentsId', newComponentsId);
  }

  const removeComponent = (id) => {
    const newComponentsId = copyObject(componentsId);
    delete newComponentsId[id];
    changeField('componentsId', newComponentsId);
  }

  const onAddProduct = (id) => {
    changeField('productsId', {...productsId, [id]: {count: 1}});
    setShowChooseProduct(false);
  }
  
  const onChangeCountProduct = (id, count) => {
    const newProductsId = copyObject(productsId);
    newProductsId[id] = {count};
    changeField('productsId', newProductsId);
  }

  const removeProduct = (id) => {
    const newProductsId = copyObject(productsId);
    delete newProductsId[id];
    changeField('productsId', newProductsId);
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
            <td className='top'>Изделия</td>
            <td>
              {isBodyChanging || 
                <>
                  {Object.keys(productsId).map((id) =>
                    <div className={styles.itemCard} key={id}>
                      <div className={styles.itemNum + ' ' + styles.itemNumShow}>
                        {productsId[id].count}                        
                      </div>
                      <div 
                        onClick={() => handleMoveTo(id, 'productData')}
                        className={styles.itemName + ' ' + styles.link}
                      >
                        {productDataItems.find(item=>item.id === id)?.title}
                      </div>
                    </div>     
                  )}
                </>
              }
              {isBodyChanging && 
                <>
                  {Object.keys(productsId).map((id) =>
                    <div className={styles.itemCard} key={id}>
                      <div>
                        <input value={productsId[id].count} className={styles.itemNum} type="number" onChange={(e)=>onChangeCountProduct(id, e.target.value)}/>
                      </div>
                      <div 
                        className={styles.itemName + ' ' + styles.itemRed}
                      >
                        {productDataItems.find(item=>item.id === id)?.title}
                      </div>
                      <div className={styles.clearIcon}>
                          <ClearIcon onClick={() => removeProduct(id)} sx={{textAlign: 'center', marginTop: '3px'}}></ClearIcon>
                      </div>
                    </div>
                  )}
                  <div className={styles.addWrapper}>
                    <AddIcon onClick={() => setShowChooseProduct(true)} className={styles.addBotton}></AddIcon>
                  </div>
                </>
              }  
            </td>
          </tr>

          <tr>
            <td className='top'>Детали</td>
            <td>
              {isBodyChanging || 
                <>
                  {Object.keys(componentsId).map((id) =>
                    <div className={styles.itemCard} key={id}>
                      <div className={styles.itemNum + ' ' + styles.itemNumShow}>
                        {componentsId[id].count}                        
                      </div>
                      <div 
                        onClick={() => handleMoveTo(id, 'componentData')}
                        className={styles.itemName + ' ' + styles.link}
                      >
                        {componentDataItems.find(item=>item.id === id)?.title}
                      </div>
                    </div>     
                  )}
                </>
              }
              {isBodyChanging && 
                <>
                  {Object.keys(componentsId).map((id) =>
                    <div className={styles.itemCard} key={id}>
                      <div>
                        <input value={componentsId[id].count} className={styles.itemNum} type="number" onChange={(e)=>onChangeCountComponent(id, e.target.value)}/>
                      </div>
                      <div 
                        className={styles.itemName + ' ' + styles.itemRed}
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
        <Button onClick={() => setShowConfirmDel(true)} sx={{margin:'10px'}} color="error" variant="contained">Удалить</Button>
      </div>

      <ChooseItem 
        isOpen={showChooseComponent}
        onClose={() => setShowChooseComponent(false)}
        onAdd={onAddComponent}
        items={componentDataItems}
        type='component'
      ></ChooseItem>

      <ChooseItem 
        isOpen={showChooseProduct}
        onClose={() => setShowChooseProduct(false)}
        onAdd={onAddProduct}
        items={productDataItems.filter(item => item.id !== itemId)}
        type='product'
      ></ChooseItem>

      <ConfirmDel
        isOpen={showConfirmDel}
        onClose={() => setShowConfirmDel(false)}
        onDel={() => deleteItem()}
        type={'product'}
        id={itemId}
      ></ConfirmDel>
    </div>
  );
}

export default Product;
