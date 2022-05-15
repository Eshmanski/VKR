import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import styles from './Product.module.css'
import Title from '../../../Title/Title';
import AddIcon from '@mui/icons-material/Add';
import { changeBody, deleteBody, returnBody, saveBody, setIsBodyChanging, fetchBody } from '../../../../store/actions/stateProjectActions';
import ChooseItem from '../../../modals/ChooseItem/ChooseItem';
import ConfirmDel from '../../../modals/ConfirmDel/ConfirmDel';
import ClearIcon from '@mui/icons-material/Clear';
import { copyObject } from '../../../../shared/utils';



function Product({ modelId }) {
  const { chosenBody, isBodyChanging } = useSelector(store => store.stateProject);
  const routeModels = useSelector(store => store.stateProject.enterpriseModels.filter(model => model.type === 'route'));
  const componentModels = useSelector(store => store.stateProject.enterpriseModels.filter(model => model.type === 'component'));
  const productModels = useSelector(store => store.stateProject.enterpriseModels.filter(model => model.type === 'product'));

  const dispatch = useDispatch();

  const changeField = (key, value) => {
    dispatch(changeBody({...chosenBody, [key]: value}));
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



  const { name, drawing, routeId, usedComponents, usedProducts, description } = chosenBody;

  const [showChooseComponent, setShowChooseComponent] = useState(false);
  const [showChooseProduct, setShowChooseProduct] = useState(false);
  const [showConfirmDel, setShowConfirmDel] = useState(false);

  const onAddComponent = (id) => {
    changeField('usedComponents', [...usedComponents, {id, count: 1}]);
    setShowChooseComponent(false);
  }

  const onChangeCountComponent = (id, count) => {
    const newComponents = copyObject(usedComponents);
    const idx = newComponents.findIndex(item => item.id === id);
    newComponents[idx].count = count;
    changeField('usedComponents', newComponents);
  }

  const removeComponent = (id) => {
    const newComponents = usedComponents.filter(item => item.id !== id);
    changeField('usedComponents', newComponents);
  }

  const onAddProduct = (id) => {
    changeField('usedProducts', [...usedProducts, {id, count: 1}]);
    setShowChooseProduct(false);
  }
  
  const onChangeCountProduct = (id, count) => {
    const newProducts = copyObject(usedProducts);
    const idx = newProducts.findIndex(item => item.id === id)
    newProducts[idx].count = count;
    changeField('usedProducts', newProducts);
  }

  const removeProduct = (id) => {
    const newProducts = usedProducts.filter(item => item.id !== id);
    changeField('usedProducts', newProducts);
  }

  return (
    <div className={styles.info}>
      <Title modelId={modelId}></Title>

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
                  onClick={routeId ? () => handleMoveTo(routeModels.find(item=>item.bodyId === routeId)) : null} 
                  className={styles.inputBox + ' ' + styles.link}
                >
                  {routeModels.find(item=>item.bodyId === routeId)?.title}
                </div>
              }
              {isBodyChanging && <select className={styles.hiddenSelect} value={routeId} onChange={(e) => changeField('routeId', e.target.value)}>
                <option value=''></option>
                {routeModels.map(item => <option key={item.bodyId} value={item.bodyId}>{item.title}</option>)}
              </select>}  
            </td>
          </tr>

          <tr>
            <td className='top'>Изделия</td>
            <td>
              {isBodyChanging || 
                <>
                  {usedProducts.map((item) =>
                    <div className={styles.itemCard} key={item.id}>
                      <div className={styles.itemNum + ' ' + styles.itemNumShow}>
                        {item.count}                        
                      </div>
                      <div 
                        onClick={() => handleMoveTo(productModels.find(model=>model.bodyId === item.id))}
                        className={styles.itemName + ' ' + styles.link}
                      >
                        {productModels.find(model=>model.bodyId === item.id).title}
                      </div>
                    </div>     
                  )}
                </>
              }
              {isBodyChanging && 
                <>
                  {usedProducts.map((item) =>
                    <div className={styles.itemCard} key={item.id}>
                      <div>
                        <input value={item.count} className={styles.itemNum} type="number" onChange={(e)=>onChangeCountProduct(item.id, e.target.value)}/>
                      </div>
                      <div 
                        className={styles.itemName + ' ' + styles.itemRed}
                      >
                        {productModels.find(model=>model.bodyId === item.id).title}
                      </div>
                      <div className={styles.clearIcon}>
                          <ClearIcon onClick={() => removeProduct(item.id)} sx={{textAlign: 'center', marginTop: '3px'}}></ClearIcon>
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
                  {usedComponents.map((item) =>
                    <div className={styles.itemCard} key={item.id}>
                      <div className={styles.itemNum + ' ' + styles.itemNumShow}>
                        {item.count}                        
                      </div>
                      <div 
                        onClick={() => handleMoveTo(componentModels.find(model=>model.bodyId === item.id))}
                        className={styles.itemName + ' ' + styles.link}
                      > 
                        {componentModels.find(model=>model.bodyId === item.id)?.title}
                      </div>
                    </div>     
                  )}
                </>
              }
              {isBodyChanging && 
                <>
                  {usedComponents.map((item) =>
                    <div className={styles.itemCard} key={item.id}>
                      <div>
                        <input value={item.count} className={styles.itemNum} type="number" onChange={(e)=>onChangeCountComponent(item.id, e.target.value)}/>
                      </div>
                      <div 
                        className={styles.itemName + ' ' + styles.itemRed}
                      >
                        {componentModels.find(model=>model.bodyId === item.id)?.title}
                      </div>
                      <div className={styles.clearIcon}>
                          <ClearIcon onClick={() => removeComponent(item.id)} sx={{textAlign: 'center', marginTop: '3px'}}></ClearIcon>
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
            <Button onClick={saveBodyHandler} sx={{margin:'10px'}} color="success" variant="contained">Сохранить</Button>
          </div>
        }
        <Button onClick={() => setShowConfirmDel(true)} sx={{margin:'10px'}} color="error" variant="contained">Удалить</Button>
      </div>

      <ChooseItem 
        isOpen={showChooseComponent}
        onClose={() => setShowChooseComponent(false)}
        onAdd={onAddComponent}
        items={componentModels.filter(model => usedComponents.reduce((acum, usedModel) => {
          if(model.bodyId === usedModel.id) return acum && false;
          else return acum;
        }, true))}
        type='component'
      ></ChooseItem>

      <ChooseItem 
        isOpen={showChooseProduct}
        onClose={() => setShowChooseProduct(false)}
        onAdd={onAddProduct}
        items={productModels.filter(item => item.id !== modelId).filter(model => usedProducts.reduce((acum, usedModel) => {
          if(model.bodyId === usedModel.id) return acum && false;
          else return acum;
        }, true))}
        type='product'
      ></ChooseItem>

      <ConfirmDel
        isOpen={showConfirmDel}
        onClose={() => setShowConfirmDel(false)}
        onDel={() => deleteItem()}
        type={'product'}
        id={modelId}
      ></ConfirmDel>
    </div>
  );
}

export default Product;
