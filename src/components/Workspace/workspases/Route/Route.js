import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Box } from '@mui/material';
import RouteSpeedDial from '../../../RouteSpeedDial/RouteSpeedDial';
import CreateBox from '../../../modals/CreateBox/CreateBox';
import Title from '../../../Title/Title';
import { filterWorkshops } from '../../../../shared/utils';
import { changeBody, deleteBody, returnBody, saveBody, setIsBodyChanging } from '../../../../store/actions/stateProjectActions';
import RouteModel from './RouteModel/RouteModel';
import ConfirmDel from '../../../modals/ConfirmDel/ConfirmDel';
import styles from './Route.module.css';

function Route({ modelId }) {
  const { chosenBody, isBodyChanging } = useSelector(store => store.stateProject);
  const workshopModels = useSelector(store => store.stateProject.enterpriseModels.filter(model => model.type === 'workshop'));

  const dispatch = useDispatch();

  const changeField = (newState) => {
    dispatch(changeBody({...chosenBody, ...newState}));
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


  const {workshopNodes, workshopLines} = chosenBody;

  const [isCreateBox, setIsCreateBox] = useState(false);
  const [isCreateLine, setIsCreateLine] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [chosenBox, setChosenBox] = useState('');
  const [showConfirmDel, setShowConfirmDel] = useState(false);

  const refDisplay = useRef(null);

  const clearStatus = () => {
    setIsCreateBox(false);
    setIsCreateLine(false);
    setIsDelete(false);
    setChosenBox('');
  }

  const addBox = (workshopId) => {
    changeField({workshopNodes: [...workshopNodes, {workshopId, positionX: 100, positionY: 100}]});
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
      <Title modelId={modelId}></Title>
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
            lines={workshopLines}
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
            workshopItems={filterWorkshops(workshopModels, workshopNodes)}
          ></CreateBox>

          <Button onClick={() => setShowConfirmDel(true)} sx={{position: 'absolute', right: 0, }} color="error" variant="contained">Удалить</Button>
        </div>
        { isBodyChanging && 
          <Box sx={{margin:'10px', position: 'absolute', left: '0px'}}>
            <Button onClick={saveBodyHandler} sx={{marginRight: '10px'}} color="success" variant="contained">Сохранить</Button>
            <Button onClick={removeChange} sx={{marginRight: '10px'}} color="error" variant="contained">Отменить</Button>
          </Box>
        }
       
      </div>


      <ConfirmDel
        isOpen={showConfirmDel}
        onClose={() => setShowConfirmDel(false)}
        onDel={() => deleteItem()}
        type={'route'}
        id={modelId}
      ></ConfirmDel>
    </div>
  );
}

export default Route;
