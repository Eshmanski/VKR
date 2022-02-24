import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { AddBox, Cable } from '@mui/icons-material';

function RouteSpeedDial({onOpen, startCreateLine}) {
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
        <SpeedDialAction icon={<AddBox />} tooltipTitle={'create workshop'} onClick={onOpen}/>
        <SpeedDialAction icon={<Cable />} tooltipTitle={'create connect'} onClick={startCreateLine}/>
    </SpeedDial>
  </Box>
  )
}

export default RouteSpeedDial;
