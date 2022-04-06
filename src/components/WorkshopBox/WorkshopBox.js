import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateWorkshopNodePosition } from '../../store/actions/routeDataAction';
import styles from './WorkshopBox.module.css';

function WorkshopBox({refDisplay, workshopNode, itemId, isCreateLine, chooseBox, isActive, isDelete, deleteBox}) {
  const workshopData = useSelector(store => store
    .workshopData
    .items
    .filter(item => item.id === workshopNode.id))[0];
    
  const [position, setPosition] = useState({x: 0, y: 0});
  const [isDrag, setIsDrag] = useState(false);
  const dispatch = useDispatch();

  const isUpdatePos = useRef(true);

  useEffect(() => {
    setPosition(workshopNode.position);
  }, [
    workshopNode.position,
  ]);

  const width = 100;
  const height = 40;
  const style = {
    top: position.y - (height/2) +'px', 
    left: position.x - (width/2) + 'px',
    width: width,
    height: height,
  }
  
  isDrag 
    ? style.pointerEvents='none'
    : style.pointerEvent='';
  
  isCreateLine || isDelete
    ? style.cursor='pointer'
    : style.cursor='grab';

  isActive
    ? style.border='1px solid blue'
    : style.border='1px solid black';
  
  const switchDrag = () => {
    setIsDrag(true);

    refDisplay.current.onmousemove = (e) => {
      e.stopPropagation();  
      const x = e.pageX - e.currentTarget.getBoundingClientRect().left;
      const y = e.pageY - e.currentTarget.getBoundingClientRect().top;

      if(isUpdatePos) {
        isUpdatePos.current = false;
        setTimeout(() => {
          dispatch(updateWorkshopNodePosition({itemId, workshopNodeId: workshopNode.id, position: {x, y}}));
          isUpdatePos.current = true;
        }, 30);
      }
    }

    refDisplay.current.onmouseup = () => {
      refDisplay.current.onmousemove = null;
      setIsDrag(false);
    }
  }

  const renderElement = () => {
    if(!isCreateLine && !isDelete) {
      return <div
        id={workshopNode.id}
        className={styles.workshopBox} 
        style={style} 
        onMouseDown={(e) => {switchDrag(e)}}
        onMouseMove={null}
      >
        {workshopData.title}
      </div>
    } else {
      return <div 
        id={workshopNode.id}
        className={styles.workshopBox + ' ' + (isCreateLine ? styles.createLine : styles.deleteBox)} 
        style={style} 
        onMouseDown={null}
        onMouseMove={null}
        onClick={isCreateLine ? () => chooseBox(workshopNode.id) : () => deleteBox(workshopNode.id)}
      >
        {workshopData.title}
      </div>
    }
  }

  return renderElement();
}

export default WorkshopBox;
