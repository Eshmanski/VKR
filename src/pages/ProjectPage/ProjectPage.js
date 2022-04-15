import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
// import { createStore } from 'redux';
import Sidebar from '../../components/Sidebar/Sidebar';
import Workspace from '../../components/Workspace/Workspace';
import { useEffect } from 'react';
import { fetchProject } from '../../store/actions/stateProjectActions';
 


function ProjectPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProject());
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        height: 'calc(100vh - 50px)',
      }}
    >
      <Sidebar></Sidebar>
      <Workspace></Workspace>
    </Box>
  );
}

export default ProjectPage;
