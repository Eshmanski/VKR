import Box from '@mui/material/Box';
import { Provider } from 'react-redux';
// import { createStore } from 'redux';
import Sidebar from '../../components/Sidebar/Sidebar';
import Workspace from '../../components/Workspace/Workspace';
import rootReducers from '../../store/reducers/rootReduser';
import { configureStore } from '@reduxjs/toolkit';
 

const store = configureStore({reducer: rootReducers});

function ProjectPage() {
  return (
    <Provider store={store}>
      <Box
        sx={{
          position: 'relative',
          height: 'calc(100vh - 50px)',
        }}
      >
        <Sidebar></Sidebar>
        <Workspace></Workspace>
      </Box>
    </Provider>
  )
}

export default ProjectPage;
