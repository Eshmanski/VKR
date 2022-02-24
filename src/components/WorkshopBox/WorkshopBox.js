import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateWorkshopRoad } from '../../store/actions/dataActions';
import styles from './WorkshopBox.module.css';

function WorkshopBox({refDisplay, workshop, itemId, itemType, isCreateLine, chooseBox}) {
  const workshopData = useSelector(store => store
    .data['workshop']
    .items
    .filter(item => item.id === workshop.id))[0];
    
  const [position, setPosition] = useState({x: 0, y: 0});
  const [isDrag, setIsDrag] = useState(false);
  const dispatch = useDispatch();

  const isUpdatePos = useRef(true);

  useEffect(() => {
    setPosition(workshop.position);
  }, [
    workshop.position,
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
  
  isCreateLine
    ? style.cursor='pointer'
    : style.cursor='grab';

  const switchDrag = () => {
    setIsDrag(true);

    refDisplay.current.onmousemove = (e) => {
      e.stopPropagation();  
      const x = e.pageX - e.currentTarget.getBoundingClientRect().left;
      const y = e.pageY - e.currentTarget.getBoundingClientRect().top;

      if(isUpdatePos) {
        isUpdatePos.current = false;
        setTimeout(() => {
          dispatch(updateWorkshopRoad({itemId, workshop: {id: workshop.id, position: {x, y}}, packType: itemType}));
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
    if(!isCreateLine) {
      return <div
        id={workshop.id}
        className={styles.workshopBox} 
        style={style} 
        onMouseDown={(e) => {switchDrag(e)}}
        onMouseMove={null}
      >
        {workshopData.label}
      </div>
    } else {
      return <div 
        id={workshop.id}
        className={styles.workshopBox} 
        style={style} 
        onMouseDown={null}
        onMouseMove={null}
        onClick={() => chooseBox(workshop.id)}
      >
        {workshopData.label}
      </div>
    }
  }

  return renderElement();
}

export default WorkshopBox;
