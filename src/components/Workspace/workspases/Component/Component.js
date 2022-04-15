import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import styles from './Component.module.css'
import Title from '../../../Title/Title';
import { changeBodyItem, deleteChosenItem, returnBodyItem, saveBodyItem, setBodyChanging, setChosenItem } from '../../../../store/actions/stateProjectActions';

function Component() {
  const { chosenItem, isBodyChanging } = useSelector(store => store.stateProject);
  const routeDataItems = useSelector(store => store.routeData.items);

  const dispatch = useDispatch();

  const changeField = (key, value) => {
    dispatch(changeBodyItem({ ...chosenItem.body, [key]: value}))
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
  const { name, drawing, routeId, description } = chosenItem.body;

  return (
    <div className={styles.info}>
      <Title projectItem={chosenItem} itemId={itemId} itemType={'componentData'}></Title>

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
                  onClick={routeId ? () => handleMoveTo(routeId, 'routeData') : null} 
                  className={styles.inputBox + ' ' + styles.link}
                >
                  {routeDataItems.find(item=>item.id===routeId)?.title || ''}
                </div>
              }
              {isBodyChanging && <select className={styles.hiddenSelect} value={routeId} onChange={(e)=>changeField('routeId', e.target.value)}>
                <option value=''></option>
                {routeDataItems.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
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
            <Button onClick={saveBody} sx={{margin:'10px'}} color="success" variant="contained">Сохранить</Button>
          </div>
        }
        <Button onClick={() => deleteItem()} sx={{margin:'10px'}} color="error" variant="contained">Удалить</Button>
      </div>
    </div>
  )
}

export default Component;


// function Component({itemId}) {
//   const componentStoreBuf = useSelector(store => store.stateProject.chosenItem);

//   const chosenItem = useSelector(store => store.componentData.items.find(item => item.id === itemId));
//   const routeDataItems = useSelector(store => store.routeData.items);
//   const dispatch = useDispatch();

//   const [isEditBody, setIsEditBody] = useState(false);

//   const [inputName, setInputName] = useState('');
//   const [inputDrawing, setInputDrawing] = useState('');
//   const [inputRouteId, setInputRouteId] = useState('');
//   const [inputDescription, setInputDescription] = useState('');

//   // useEffect(() => {
//   //   dispatch(changeBodyItem({name: inputName, drawing: inputDrawing, routeId: inputRouteId, description: inputDescription}));
//   // }, [
//   //   inputName,
//   //   inputDrawing,
//   //   inputRouteId,
//   //   inputDescription
//   // ]);

//   // useEffect(() => {
//   //   setInputName(componentStoreBuf.body.name);
//   //   setInputDrawing(componentStoreBuf.body.drawing);
//   //   setInputRouteId(componentStoreBuf.body.routeId);
//   //   setInputDescription(componentStoreBuf.body.description);
//   // }, [
//   //   itemId
//   // ]);

//   useEffect(() => {
//     setInputName(componentStoreBuf.body.name);
//     setInputDrawing(componentStoreBuf.body.drawing);
//     setInputRouteId(componentStoreBuf.body.routeId);
//     setInputDescription(componentStoreBuf.body.description);
//   }, [
//     componentStoreBuf.body.name,
//     componentStoreBuf.body.drawing,
//     componentStoreBuf.body.routeId,
//     componentStoreBuf.body.description,
//   ]);

//   const handleMoveTo = (itemId, packType) => {
//     dispatch(setChosenItem({itemId, packType}));
//   }

//   const saveBody = () => {
//     dispatch(saveBodyItem());
//     dispatch(setBodyChanging(false));
//     setIsEditBody(false);
//   }

//   const deleteItem = () => {
//     dispatch(setBodyChanging(false));
//     dispatch(deleteComponent({itemId}));
//   }

//   const switchChange = () => {
//     dispatch(setBodyChanging(true));
//     setIsEditBody(true);
//   }

//   const removeChange = () => {
//     dispatch(returnBodyItem());
//     dispatch(setBodyChanging(false));
//     setIsEditBody(false);
//   }

//   useEffect(() => {
//     setIsEditBody(false);
//   }, [itemId]);

//   return (
//     <div className={styles.info}>
//       <Title projectItem={productDataItem} itemId={itemId} itemType={'componentData'}></Title>

//       <table>
//         <tbody>
//           <tr>
//             <td>Наименование детали</td>
//             <td>
//               {isEditBody || <div className={styles.inputBox}>{inputName}</div>}
//               {isEditBody && <input className={styles.hiddenInput} type="text" onChange={(event)=>setInputName(event.target.value)} value={inputName}/>}       
//             </td>
//           </tr>
//           <tr>
//             <td>Чертеж</td>
//             <td>
//               {isEditBody || <div className={styles.inputBox}>{inputDrawing}</div>}
//               {isEditBody && <input className={styles.hiddenInput} type="text" onChange={(event)=>setInputDrawing(event.target.value)} value={inputDrawing}/>}  
//             </td>
//           </tr>
//           <tr>
//             <td>Маршрут</td>
//             <td>
//               {isEditBody || 
//                 <div 
//                   onClick={inputRouteId ? () => handleMoveTo(inputRouteId, 'routeData') : null} 
//                   className={styles.inputBox + ' ' + styles.link}
//                 >
//                   {routeDataItems.find(item=>item.id===inputRouteId)?.title || ''}
//                 </div>
//               }
//               {isEditBody && <select className={styles.hiddenSelect} value={inputRouteId} onChange={(e) => setInputRouteId(e.target.value)}>
//                 <option value=''></option>
//                 {routeDataItems.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
//               </select>}  
//             </td>
//           </tr>
//           <tr >
//             <td className='top'>Описание</td>
//             <td>
//               <textarea
//                 className={styles.description}
//                 type="text-area" disabled={!isEditBody}
//                 onChange={(e)=>setInputDescription(e.target.value)}
//                 value={inputDescription} 
//               />
//             </td>

//           </tr>
//         </tbody>
//       </table>
//       <div className={styles.btnList}>
//         {isEditBody || <Button onClick={() => switchChange()} sx={{margin:'10px'}} color="secondary" variant="contained">Редактировать</Button>}
//         {isEditBody && 
//           <div>
//             <Button onClick={() => removeChange()} sx={{margin:'10px'}} color="error" variant="contained">Отменить</Button>
//             <Button onClick={saveBody} sx={{margin:'10px'}} color="success" variant="contained">Сохранить</Button>
//           </div>
//         }
//         <Button onClick={() => deleteItem()} sx={{margin:'10px'}} color="error" variant="contained">Удалить</Button>
//       </div>
//     </div>
//   )
// }