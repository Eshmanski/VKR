import { useRef } from 'react';
import { useSelector } from 'react-redux';

import styles from './WorkshopBox.module.css';

function WorkshopBox({refDisplay, workshopNode, isCreateLine, chooseBox, isActive, isDelete, deleteBox, updatePosition}) {
  const workshopData = useSelector(store => store
    .workshopData
    .items
    .filter(item => item.id === workshopNode.id))[0];
    

  const position = workshopNode.position;
  const isUpdatePos = useRef(true);

  const width = 100;
  const height = 40;
  const style = {
    top: position.y - (height/2) +'px', 
    left: position.x - (width/2) + 'px',
    width: width,
    height: height,
  }
  
  isCreateLine || isDelete
    ? style.cursor='pointer'
    : style.cursor='grab';

  isActive
    ? style.border='1px solid blue'
    : style.border='1px solid black';
  
  const switchDrag = () => {
    refDisplay.current.onmousemove = (e) => {
      e.stopPropagation();  
      const x = e.pageX - e.currentTarget.getBoundingClientRect().left;
      const y = e.pageY - e.currentTarget.getBoundingClientRect().top;

      if(isUpdatePos) {
        isUpdatePos.current = false;
        setTimeout(() => {
          updatePosition(workshopNode.id, {x, y});
          isUpdatePos.current = true;
        }, 20);
      }
    }

    refDisplay.current.onmouseup = () => {
      refDisplay.current.onmousemove = null;
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
