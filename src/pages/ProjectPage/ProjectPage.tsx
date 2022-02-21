import Box from '@mui/material/Box';
import Sidebar from '../../components/Sidebar/Sidebar';
import Workspace from '../../components/Workspace/Workspace';


function ProjectPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Sidebar></Sidebar>
      <Workspace></Workspace>
    </Box>
  )
}

export default ProjectPage;
