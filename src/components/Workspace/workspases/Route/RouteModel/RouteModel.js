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
    const idx = newWorkshopNodes.findIndex((item) => item.id === id);

    if(idx !== -1) {
      newWorkshopNodes[idx] = { id, position };
      changeField({workshopNodes: newWorkshopNodes});
    }
  }

  const chooseBox = (workshopId) => {
    if(!chosenBox) {
      setChosenBox(workshopId);
    } else {
      if(chosenBox === workshopId) return 0;

      const lineId = `${chosenBox}-${workshopId}`;
      if(lines.findIndex(item => item.id === lineId) === -1)
        changeField({lines: [...lines, {id: lineId, start: chosenBox, end: workshopId}]});

      clearStatus();
    }
  }

  const deleteBox = (id) => {
    const newWorkshopNodes = workshopNodes.filter((item) => item.id !== id);
    const newLines = lines.filter((item) => item.start !== id && item.end !== id);

    changeField({workshopNodes: newWorkshopNodes, lines: newLines});
    clearStatus();
  }

  const deleteArrow = (id) => {
    const newLines = lines.filter((item) => item.id !== id);
    changeField({lines: newLines});
    clearStatus();
  }

  const renderBoxs = () => {
    return (
      <>
        {workshopNodes.map((workshopNode) => <WorkshopBox
          workshopNodes={workshopNodes}
          key={workshopNode.id}
          refDisplay={refDisplay}
          workshopNode={workshopNode}
          isActive={chosenBox === workshopNode.id}
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
    </>
  )
}

export default RouteModel;