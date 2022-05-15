import { useState, useCallback } from "react";
import Xarrow from "react-xarrows";
import WorkshopBox from '../../../../WorkshopBox/WorkshopBox';

function RouteModel({
  refDisplay, 
  workshopNodes,
  lines,
  chosenBox,
  changeField,
  clearStatus,
  setChosenBox,
  isCreateLine,
  isDelete
}) {

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const updatePosition = (id, position) => {
    const newWorkshopNodes = [...workshopNodes];
    const idx = newWorkshopNodes.findIndex((item) => item.workshopId === id);

    if(idx !== -1) {
      newWorkshopNodes[idx] = { workshopId: id, positionX: position.x, positionY: position.y };
      changeField({workshopNodes: newWorkshopNodes});
    }
  }

  const chooseBox = (workshopId) => {
    if(!chosenBox) {
      setChosenBox(workshopId);
    } else {
      if(chosenBox === workshopId) return 0;

      if(lines.findIndex(item => item.start === chosenBox && item.end === workshopId) === -1)
        changeField({workshopLines: [...lines, {start: chosenBox, end: workshopId}]});

      clearStatus();
    }
  }

  const deleteBox = (id) => {
    const newWorkshopNodes = workshopNodes.filter((item) => item.workshopId !== id);
    const newLines = lines.filter((item) => item.start !== id && item.end !== id);

    changeField({workshopNodes: newWorkshopNodes, workshopLines: newLines});
    clearStatus();
  }

  const deleteArrow = (start, end) => {
    const newLines = lines.filter((item) => {return item.start !== start || item.end !== end});

    changeField({workshopLines: newLines});
    clearStatus();
  }

  const renderBoxs = () => {
    return (
      <>
        {workshopNodes.map((workshopNode) => <WorkshopBox
          key={workshopNode.workshopId}
          refDisplay={refDisplay}
          workshopNode={workshopNode}
          isActive={chosenBox === workshopNode.workshopId}
          isCreateLine={isCreateLine}
          isDelete={isDelete}
          chooseBox={chooseBox}
          deleteBox={deleteBox}
          updatePosition={updatePosition}
          parentUpdate={forceUpdate}
        ></WorkshopBox>)}
      </>
    );
  }

  return (
    <>       
      {renderBoxs()}

      {lines.map((line) => <Xarrow 
        key={line.start.toString() + '-' + line.end.toString()}
        start={line.start.toString()}
        end={line.end.toString()}
        passProps={isDelete 
          ? {
          onClick: () => deleteArrow(line.start, line.end),
          cursor: 'pointer'
          }
          : {}
        }
      ></Xarrow>)}
    </>
  )
}

export default RouteModel;
