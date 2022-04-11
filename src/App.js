import './App.css';
import Layout from './hoc/lauout/Layout';
import ProjectPage from './pages/ProjectPage/ProjectPage';
import rootReducers from './store/reducers/rootReduser';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      thunk: true,
    }),
});

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <div className="App">
          <ProjectPage></ProjectPage>
        </div>
      </Layout>
    </Provider>
  );
}

export default App;
