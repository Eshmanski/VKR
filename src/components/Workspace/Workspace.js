import { useDispatch, useSelector } from 'react-redux';
import Product from './workspases/Product/Product';
import Component from './workspases/Component/Component';
import Route from './workspases/Route/Route';
import Workshop from './workspases/Workshop/Workshop';
import styles from './Workspace.module.css';
import { closeSearch } from '../../store/actions/stateProjectActions';

function Workspace() {
  const { bodyType, chosenModelId, fetching } = useSelector(store => store.stateProject);
  const dispatch = useDispatch();

  function renderComponent() {
    switch(bodyType) {
      case 'product':
        return <Product modelId={chosenModelId} ></Product>
      case 'component':
        return <Component modelId={chosenModelId} ></Component>
      case 'route':
        return <Route modelId={chosenModelId} ></Route>
      case 'workshop':
        return <Workshop modelId={chosenModelId}></Workshop>
      default: 
        return null;
    }
  }

  return (
    <div className={styles.workspace} onClick={() => dispatch(closeSearch())}>
      {!fetching && renderComponent()}
    </div>
  )
}

export default Workspace;
