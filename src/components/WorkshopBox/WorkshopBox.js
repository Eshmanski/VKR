import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { kitcut } from '../../shared/utils';
import LinkIcon from '@mui/icons-material/Link';
import styles from './WorkshopBox.module.css';
import { fetchBody } from '../../store/actions/stateProjectActions';


function WorkshopBox({refDisplay, workshopNode, isCreateLine, isActive, isDelete, chooseBox, deleteBox, updatePosition, parentUpdate}) {
  const workshopModel = useSelector(store => store.stateProject.enterpriseModels.find(model => model.type === 'workshop' && workshopNode.workshopId === model.bodyId));
  const dispatch = useDispatch();
    
  const [position, setPosition] = useState({x: 0, y: 0});
  const [isShowLink, setIsShowLink] = useState(false);

  const isUpdatePos = useRef(true);

  useEffect(() => {
    setPosition({x: workshopNode.positionX, y: workshopNode.positionY});
    parentUpdate();
  }, [
    workshopNode,
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
        updatePosition(workshopNode.workshopId, {x, y});
      }
      refDisplay.current.onmousemove = null;
      refDisplay.current.onmouseup = null;
    }
  }


  const handleMoveTo = (model) => {
    dispatch(fetchBody(model.id, model.type, model.bodyId));
  }

  const renderElement = () => {
    if(!isCreateLine && !isDelete) {
      return <div
        id={workshopNode.workshopId.toString()}
        className={styles.workshopBox} 
        style={style} 
        onMouseDown={(e) => {switchDrag(e)}}
        onMouseMove={null}
        onMouseEnter={()=>setIsShowLink(true)}
        onMouseLeave={()=>setIsShowLink(false)}
        title={workshopModel.title}
      >
        { kitcut(workshopModel.title, 12) }
        {isShowLink && <div className={styles.link} onClick={()=>handleMoveTo(workshopModel)}> <LinkIcon></LinkIcon> </div>}
      </div>
    } else {
      return <div 
        id={workshopNode.workshopId.toString()}
        className={styles.workshopBox + ' ' + (isCreateLine ? styles.createLine : styles.deleteBox)} 
        style={style} 
        onMouseDown={null}
        onMouseMove={null}
        onClick={isCreateLine ? () => chooseBox(workshopNode.workshopId) : () => deleteBox(workshopNode.workshopId)}
        title={workshopModel.title}
      >
        { kitcut(workshopModel.title, 12) }
      </div>
    }
  }

  return renderElement();
}

export default WorkshopBox;
