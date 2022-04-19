import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { kitcut } from '../../shared/utils';
import LinkIcon from '@mui/icons-material/Link';
import styles from './WorkshopBox.module.css';
import { setChosenItem } from '../../store/actions/stateProjectActions';


function WorkshopBox({refDisplay, workshopNode, isCreateLine, isActive, isDelete, chooseBox, deleteBox, updatePosition, parentUpdate, workshopNodes}) {
  const workshopData = useSelector(store => store
    .workshopData
    .items
    .filter(item => item.id === workshopNode.id))[0];
  const dispatch = useDispatch();
    
  const [position, setPosition] = useState({x: 0, y: 0});
  const [isShowLink, setIsShowLink] = useState(false);

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
    let isChanged = false;
    let x = 0;
    let y = 0;

    refDisplay.current.onmousemove = (e) => {
      e.stopPropagation();  
      x = e.pageX - e.currentTarget.getBoundingClientRect().left;
      y = e.pageY - e.currentTarget.getBoundingClientRect().top;

      if(isUpdatePos) {
        isChanged = true;
        isUpdatePos.current = false;
        setTimeout(() => {
          setPosition({x, y});
          parentUpdate();
          isUpdatePos.current = true;
        }, 20);
      }
    }

    refDisplay.current.onmouseup = () => {
      if(isChanged) {
        updatePosition(workshopNode.id, {x, y});
      }
      refDisplay.current.onmousemove = null;
      refDisplay.current.onmouseup = null;
    }
  }


  const handleMoveTo = (itemId, packType) => {
    dispatch(setChosenItem({itemId, packType}));
  }

  const renderElement = () => {
    if(!isCreateLine && !isDelete) {
      return <div
        id={workshopNode.id}
        className={styles.workshopBox} 
        style={style} 
        onMouseDown={(e) => {switchDrag(e)}}
        onMouseMove={null}
        onMouseEnter={()=>setIsShowLink(true)}
        onMouseLeave={()=>setIsShowLink(false)}
        title={workshopData.title}
      >
        { kitcut(workshopData.title, 12) }
        {isShowLink && <div className={styles.link} onClick={()=>handleMoveTo(workshopData.id, 'workshopData')}> <LinkIcon></LinkIcon> </div>}
      </div>
    } else {
      return <div 
        id={workshopNode.id}
        className={styles.workshopBox + ' ' + (isCreateLine ? styles.createLine : styles.deleteBox)} 
        style={style} 
        onMouseDown={null}
        onMouseMove={null}
        onClick={isCreateLine ? () => chooseBox(workshopNode.id) : () => deleteBox(workshopNode.id)}
        title={workshopData.title}
      >
        { kitcut(workshopData.title, 12) }
      </div>
    }
  }

  return renderElement();
}

export default WorkshopBox;
