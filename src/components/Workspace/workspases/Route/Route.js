import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Box } from '@mui/material';
import RouteSpeedDial from '../../../RouteSpeedDial/RouteSpeedDial';
import CreateBox from '../../../modals/CreateBox/CreateBox';
import Title from '../../../Title/Title';
import { filterWorkshops } from '../../../../shared/utils';
import { changeBodyItem, deleteChosenItem, returnBodyItem, saveBodyItem, setBodyChanging } from '../../../../store/actions/stateProjectActions';
import RouteModel from './RouteModel/RouteModel';
import styles from './Route.module.css';

function Route({ itemId }) {
  const { chosenItem, isBodyChanging } = useSelector(store => store.stateProject);
  const workshopDataItems = useSelector(store => store.workshopData.items);

  const dispatch = useDispatch();

  const changeField = (newState) => {
    dispatch(changeBodyItem({...chosenItem.body, ...newState}));
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


  const {workshopNodes, lines} = chosenItem.body;

  const [isCreateBox, setIsCreateBox] = useState(false);
  const [isCreateLine, setIsCreateLine] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [chosenBox, setChosenBox] = useState('');

  const refDisplay = useRef(null);

  const clearStatus = () => {
    setIsCreateBox(false);
    setIsCreateLine(false);
    setIsDelete(false);
    setChosenBox('');
  }

  const addBox = (workshopId) => {
    changeField({workshopNodes: [...workshopNodes, {id: workshopId, position: {x: 100, y: 100}}]});
    clearStatus();
  }

  const startCreateLine = () => {
    clearStatus();
    setIsCreateLine(true);
  }

  const startDelete = () => {
    clearStatus();
    setIsDelete(true);
  }

  const clickHandler = (e) => {
    if(e.button === 2) {
      clearStatus();
    }
  }


  return (
    <div className={styles.info} onMouseUp={(e) => clickHandler(e)} onContextMenu={(e)=>{
      e.stopPropagation();
      e.preventDefault();
    }}>
      <Title projectItem={chosenItem} itemId={itemId} itemType={'routeData'}></Title>
      <div className={styles.displayWrapper}>
        <div 
          className={styles.display} 
          ref={refDisplay}
        >
          {isCreateLine && <div className={styles.supportText}>Выберете два цеха для создания маршрута</div>}
          {isDelete && <div className={styles.supportText}>Выберете связь или цех, который хотите удалить</div>}  
          <RouteSpeedDial onOpen={() => setIsCreateBox(true)} startCreateLine={startCreateLine} startDelete={startDelete}></RouteSpeedDial>

          <RouteModel
            refDisplay={refDisplay}
            workshopNodes={workshopNodes}
            lines={lines}
            chosenBox={chosenBox}
            changeField={changeField}
            clearStatus={clearStatus}
            setChosenBox={setChosenBox}
            isCreateLine={isCreateLine}
            isDelete={isDelete}
          ></RouteModel>
          
          <CreateBox        
            isOpen={isCreateBox}
            onAddBox={addBox}
            onClose={() => setIsCreateBox(false)}
            workshopItems={filterWorkshops(workshopDataItems, workshopNodes)}
          ></CreateBox>

          <Button onClick={() => deleteItem()} sx={{position: 'absolute', right: 0, }} color="error" variant="contained">Удалить</Button>
        </div>
        { isBodyChanging && 
          <Box sx={{margin:'10px', position: 'absolute', left: '0px'}}>
            <Button onClick={saveBody} sx={{marginRight: '10px'}} color="success" variant="contained">Сохранить</Button>
            <Button onClick={removeChange} sx={{marginRight: '10px'}} color="error" variant="contained">Отменить</Button>
          </Box>
        }
       
      </div>

    </div>
  );
}

export default Route;
