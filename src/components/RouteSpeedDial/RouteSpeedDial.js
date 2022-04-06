import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { AddBox, Cable, Delete } from '@mui/icons-material';

function RouteSpeedDial({onOpen, startCreateLine, startDelete}) {
  return (
    <Box sx={{ 
      height: 320, 
      transform: 'translateZ(0px)', 
      flexGrow: 1,
      position: 'absolute',
      right: 0,
      bottom: 0,
    }}>
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: 'absolute', bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
    >
        <SpeedDialAction icon={<AddBox />} tooltipTitle={'Создать цех'} onClick={onOpen}/>
        <SpeedDialAction icon={<Cable />} tooltipTitle={'Создать связь'} onClick={startCreateLine}/>
        <SpeedDialAction icon={<Delete />} tooltipTitle={'Удалить элемент'} onClick={startDelete}/>
    </SpeedDial>
  </Box>
  )
}

export default RouteSpeedDial;
