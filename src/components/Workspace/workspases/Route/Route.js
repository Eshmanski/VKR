import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import nextId from "react-id-generator";
import { Button } from '@mui/material';
import RouteSpeedDial from '../../../RouteSpeedDial/RouteSpeedDial';
import WorkshopBox from '../../../WorkshopBox/WorkshopBox';
import CreateBox from '../../../modals/CreateBox/CreateBox';
import Title from '../../../Title/Title';
import styles from './Route.module.css';
import Xarrow from "react-xarrows";
import { filterWorkshops } from '../../../../shared/utils';
import { createWorkshopNode, createWorkshopNodeLine, deleteRoute, deleteWorkshopNode, deleteWorkshopNodeLine } from '../../../../store/actions/routeDataAction';
import { clearChosenItem } from '../../../../store/actions/stateProjectActions';


function Route({ itemId }) {
  const [modalOptions, setModalOptions] = useState({isOpen: false});
  const [isCreateLine, setIsCreateLine] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [chosenBox, setChosenBox] = useState('');

  const routeDataItem = useSelector(store => store.routeData.items.find(item => item.id === itemId));
  const workshopNodes = routeDataItem.body.workshopNodes || [];
  const lines = routeDataItem.body.lines || [];
  const workshops = useSelector(store => store.workshopData.items);

  const dispatch = useDispatch();

  const refDisplay = useRef(null);
  const newLine = useRef({start: '', end: ''});

  const handleOpen = () => setModalOptions({isOpen: true});
  const handleClose = () => setModalOptions({isOpen: false});

  const clearStatus = () => {
    setIsDelete(false);
    setIsCreateLine(false);
    setChosenBox('');
    newLine.current = {start: '', end: ''}
  }

  const addBox = (workshopId) => {
    clearStatus();
    setIsCreateLine(false);
    handleClose();
    dispatch(createWorkshopNode({itemId, workshopNode: {id: workshopId, position: {x: 100, y: 100}}}));
  }

  const startCreateLine = () => {
    clearStatus();
    setIsCreateLine(true);
  }

  const startDelete = () => {
    clearStatus();
    setIsDelete(true);
  }

  const chooseBox = (workshopId) => {
    if(!newLine.current.start) {
      newLine.current.start = workshopId;
      setChosenBox(workshopId);
    } else {
      if(newLine.current.start === workshopId) return 0;

      newLine.current.end = workshopId;
      dispatch(createWorkshopNodeLine({itemId, line: {...newLine.current, id: nextId('line-')}}));
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
    dispatch(deleteWorkshopNodeLine({itemId, lineId: id}));
    clearStatus();
  }

  const deleteBox = (id) => {
    dispatch(deleteWorkshopNode({itemId, workshopId: id}));
    clearStatus();
  }

  const deleteItem = () => {
    dispatch(clearChosenItem());
    dispatch(deleteRoute({itemId}));
  }
  
  return (
    <div className={styles.info} onMouseUp={(e) => clickHandler(e)} onContextMenu={(e)=>{
      e.stopPropagation();
      e.preventDefault();
    }}>
      <Title projectItem={routeDataItem} itemId={itemId} itemType={'routeData'}></Title>
      <div 
        className={styles.display} 
        ref={refDisplay}
      >
        {isCreateLine && <div className={styles.supportText}>Выберете два цеха для создания маршрута</div>}
        {isDelete && <div className={styles.supportText}>Выберете связь или цех, который хотите удалить</div>}  
        <RouteSpeedDial onOpen={handleOpen} startCreateLine={startCreateLine} startDelete={startDelete}></RouteSpeedDial>

        {workshopNodes.map((workshopNode) => <WorkshopBox
          deleteBox={deleteBox}
          isDelete={isDelete}
          isActive={chosenBox === workshopNode.id}
          chooseBox={chooseBox}
          isCreateLine={isCreateLine}
          refDisplay={refDisplay}
          workshopNode={workshopNode}
          key={workshopNode.id}
          itemId={itemId}
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
      </div>
      

      <Button onClick={() => deleteItem()} sx={{margin:'10px'}} color="error" variant="contained">Удалить</Button>
    </div>
  );
}

export default Route;
