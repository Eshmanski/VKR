import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import nextId from "react-id-generator";
import RouteSpeedDial from '../../../RouteSpeedDial/RouteSpeedDial';
import WorkshopBox from '../../../WorkshopBox/WorkshopBox';
import CreateBox from '../../../modals/CreateBox/CreateBox';
import Title from '../../../Title/Title';
import styles from './Route.module.css';
import Xarrow from "react-xarrows";
import { addLineRoad, addWorkshopRoad } from '../../../../store/actions/dataActions';
import { filterWorkshops } from '../../../../shared/utils';


function Route({itemType, itemId}) {
  const [modalOptions, setModalOptions] = useState({isOpen: false});
  const [isCreateLine, setIsCreateLine] = useState(false);

  const data = useSelector(store => store.data);
  const projectItem = data[itemType].items.find((item) => item.id === itemId);
  const workshops = projectItem.body.workshops || [];
  const lines = projectItem.body.lines || [];
  const dispatch = useDispatch();

  const refDisplay = useRef(null);
  const newLine = useRef({start: '', end: ''});

  const handleOpen = () => setModalOptions({isOpen: true});
  const handleClose = () => setModalOptions({isOpen: false});

  const addBox = (workshopId) => {
    handleClose();
    dispatch(addWorkshopRoad({itemId, workshop: {id: workshopId, position: {x: 100, y: 100}}, packType: itemType}));
  }

  const startCreateLine = () => {
    console.log(1);
    setIsCreateLine(true);
  }

  const chooseBox = (workshopId) => {
    if(!newLine.current.start) {
      newLine.current.start = workshopId;
    } else {
      if(newLine.current.start === workshopId) return 0;

      newLine.current.end = workshopId;
      dispatch(addLineRoad({itemId, line: {...newLine.current, id: nextId('line-')}}));
      newLine.current = {start: '', end: ''};
      setIsCreateLine(false);
    }
  }

  return (
    <div className={styles.info}>
      <Title projectItem={projectItem} itemId={itemId} itemType={itemType}></Title>
      <div 
        className={styles.display} 
        ref={refDisplay}
      >
        <RouteSpeedDial onOpen={handleOpen} startCreateLine={startCreateLine}></RouteSpeedDial>

        {workshops.map((workshop) => <WorkshopBox
          chooseBox={chooseBox}
          isCreateLine={isCreateLine} 
          refDisplay={refDisplay} 
          workshop={workshop} 
          key={workshop.id}
          itemType={itemType}
          itemId={itemId}
        ></WorkshopBox>)}

        {lines.map(line => <Xarrow key={line.id} start={line.start} end={line.end}></Xarrow>)}
          
        <CreateBox         
          modalOptions={modalOptions}
          onAddBox={addBox}
          onClose={handleClose}
          workshopItems={filterWorkshops(data['workshop'].items, workshops)}
        ></CreateBox> 
      </div>
    </div>
  );
}

export default Route;
