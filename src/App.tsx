import './App.css';
import Layout from './hoc/lauout/Layout';
import ProjectPage from './pages/ProjectPage/ProjectPage';

function App() {
  return (
    <Layout>
      <div className="App">
        <ProjectPage></ProjectPage>
      </div>
    </Layout>
  );
}

export default App;
