import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import nextId from "react-id-generator";
import { Button, Box } from '@mui/material';
import RouteSpeedDial from '../../../RouteSpeedDial/RouteSpeedDial';
import WorkshopBox from '../../../WorkshopBox/WorkshopBox';
import CreateBox from '../../../modals/CreateBox/CreateBox';
import Title from '../../../Title/Title';
import styles from './Route.module.css';
import Xarrow from "react-xarrows";
import { filterWorkshops } from '../../../../shared/utils';
import { deleteRoute, updateRouteBody } from '../../../../store/actions/routeDataAction';
import { clearChosenItem, setBodyChanging } from '../../../../store/actions/stateProjectActions';


function Route({ itemId }) {
  const [modalOptions, setModalOptions] = useState({isOpen: false});
  const [isCreateLine, setIsCreateLine] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [chosenBox, setChosenBox] = useState('');

  const [workshopNodes, setWorkshopNodes] = useState([]);
  const [lines, setLines] = useState([]);

  const routeDataItem = useSelector(store => store.routeData.items.find(item => item.id === itemId));
  const workshops = useSelector(store => store.workshopData.items);
  const dispatch = useDispatch();

  const refDisplay = useRef(null);
  const newLine = useRef({start: '', end: ''});

  const fillField = useCallback(() => {
    setWorkshopNodes(routeDataItem.body.workshopNodes);
    setLines(routeDataItem.body.lines);
  }, [
    routeDataItem.body.workshopNodes,
    routeDataItem.body.lines
  ]);

  useEffect(() => {
    fillField();
  }, [
    fillField
  ]);

  const handleOpen = () => setModalOptions({isOpen: true});
  const handleClose = () => setModalOptions({isOpen: false});

  const clearStatus = () => {
    setIsDelete(false);
    setIsCreateLine(false);
    setChosenBox('');
    newLine.current = {start: '', end: ''}
  }

  const startCreateLine = () => {
    clearStatus();
    setIsCreateLine(true);
  }

  const startDelete = () => {
    clearStatus();
    setIsDelete(true);
  }


  const addBox = (workshopId) => {
    clearStatus();
    setIsCreateLine(false);
    handleClose();
    setWorkshopNodes([...workshopNodes, {id: workshopId, position: {x: 100, y: 100}}]);
  }

  const updatePosition = (id, position) => {
    const newWorkshopNodes = [...workshopNodes];
    const idx = newWorkshopNodes.findIndex((item) => item.id === id);

    if(idx !== -1) {
      newWorkshopNodes[idx] = { id, position };
      setWorkshopNodes(newWorkshopNodes);
    }
  }

  const chooseBox = (workshopId) => {
    if(!newLine.current.start) {
      newLine.current.start = workshopId;
      setChosenBox(workshopId);
    } else {
      if(newLine.current.start === workshopId) return 0;

      newLine.current.end = workshopId;

      setLines([...lines, {...newLine.current, id: nextId('line-')}]);
      newLine.current = {start: '', end: ''};
      setIsCreateLine(false);
      setChosenBox('');
    }
  }

  const clickHandler = (e) => {
    if(e.button === 2) {
      clearStatus();
    }
  }

  const deleteArrow = (id) => {
    const newLines = lines.filter((item) => item.id !== id);
    setLines(newLines);
    clearStatus();
  }

  const deleteBox = (id) => {
    const newWorkshopNodes = workshopNodes.filter((item) => item.id !== id);
    const newLines = lines.filter((item) => item.start !== id && item.end !== id);

    setLines(newLines);
    setWorkshopNodes(newWorkshopNodes);
    clearStatus();
  }

  const saveBody = () => {
    dispatch(updateRouteBody({itemId, newBody: {workshopNodes, lines}}));
    dispatch(setBodyChanging(false));
  }

  const removeChange = () => {
    fillField();
  }

  const deleteItem = () => {
    dispatch(clearChosenItem());
    dispatch(deleteRoute({itemId}));
  }

  const isChanged = (workshopNodes !== routeDataItem.body.workshopNodes || lines !== routeDataItem.body.lines);

  useEffect(() => {
    if(isChanged) {
      dispatch(setBodyChanging(true));
    } else {
      dispatch(setBodyChanging(false));
    }
  }, [
    dispatch,
    isChanged
  ]);

  window.addEventListener('saveBody', saveBody);
  window.addEventListener('removeChange', removeChange);

  return (
    <div className={styles.info} onMouseUp={(e) => clickHandler(e)} onContextMenu={(e)=>{
      e.stopPropagation();
      e.preventDefault();
    }}>
      <Title projectItem={routeDataItem} itemId={itemId} itemType={'routeData'}></Title>
      <div className={styles.displayWrapper}>
        <div 
          className={styles.display} 
          ref={refDisplay}
        >
          {isCreateLine && <div className={styles.supportText}>Выберете два цеха для создания маршрута</div>}
          {isDelete && <div className={styles.supportText}>Выберете связь или цех, который хотите удалить</div>}  
          <RouteSpeedDial onOpen={handleOpen} startCreateLine={startCreateLine} startDelete={startDelete}></RouteSpeedDial>

          {workshopNodes.map((workshopNode) => <WorkshopBox
            key={workshopNode.id}
            refDisplay={refDisplay}
            workshopNode={workshopNode}
            isActive={chosenBox === workshopNode.id}
            isCreateLine={isCreateLine}
            isDelete={isDelete}
            chooseBox={chooseBox}
            deleteBox={deleteBox}
            updatePosition={updatePosition}
          ></WorkshopBox>)}

          {lines.map(line => <Xarrow 
            key={line.id}
            start={line.start}
            end={line.end}
            passProps={isDelete 
              ? {
              onClick: () => deleteArrow(line.id),
              cursor: 'pointer'
              }
              : {}
            }
          ></Xarrow>)}
          
          <CreateBox        
            modalOptions={modalOptions}
            onAddBox={addBox}
            onClose={handleClose}
            workshopItems={filterWorkshops(workshops, workshopNodes)}
          ></CreateBox>

          <Button onClick={() => deleteItem()} sx={{position: 'absolute', right: 0, }} color="error" variant="contained">Удалить</Button>
        </div>
        { isChanged && 
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
