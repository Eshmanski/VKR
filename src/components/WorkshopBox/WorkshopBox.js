import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './WorkshopBox.module.css';


function WorkshopBox({refDisplay, workshopNode, isCreateLine, isActive, isDelete, chooseBox, deleteBox, updatePosition, parentUpdate, workshopNodes}) {
  const workshopData = useSelector(store => store
    .workshopData
    .items
    .filter(item => item.id === workshopNode.id))[0];
    
  const [position, setPosition] = useState({x: 0, y: 0});

  const isUpdatePos = useRef(true);

  useEffect(() => {
    setPosition({...workshopNode.position});
    parentUpdate();
  }, [
    workshopNode.position,
    parentUpdate,
  ]);

  useEffect(() => {
    return () => setPosition({x: 0, y: 0});
  }, [])

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
    let x = 0;
    let y = 0;

    refDisplay.current.onmousemove = (e) => {
      e.stopPropagation();  
      x = e.pageX - e.currentTarget.getBoundingClientRect().left;
      y = e.pageY - e.currentTarget.getBoundingClientRect().top;

      if(isUpdatePos) {
        isUpdatePos.current = false;
        setTimeout(() => {
          setPosition({x, y});
          parentUpdate();
          isUpdatePos.current = true;
        }, 20);
      }
    }

    refDisplay.current.onmouseup = () => {
      updatePosition(workshopNode.id, {x, y});
      refDisplay.current.onmousemove = null;
      refDisplay.current.onmouseup = null;
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
