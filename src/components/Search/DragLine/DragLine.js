import { useState } from 'react';
import styles from './DragLine.module.css';

function DragLine({setWidth}) {

  const [initialPos,   setInitialPos] = useState(null);
  const [initialSize, setInitialSize] = useState(null);

  const initial = (e) => {
    const resizable = document.getElementById('ResizableSearch');
    setInitialPos(e.clientX);
    setInitialSize(resizable.offsetWidth);

    let width;

    const finish = () => {
      setWidth(width);
      window.onmousemove = null;
      window.onmouseup = null;
    }
    
    window.onmousemove = (e) => {
      const lenght = parseInt(initialSize) + parseInt(e.clientX - initialPos);
      
      if(lenght < 420 && lenght > 250) {
        width = lenght;
        resizable.style.width = `${lenght}px`;
      } else finish();
    }

    window.onmouseup = (e) => {
      finish();
    }
  }

  return (
    <div 
      className={styles.dragLine}
      onMouseDown={initial}
    ></div>
  );
}

export default DragLine;