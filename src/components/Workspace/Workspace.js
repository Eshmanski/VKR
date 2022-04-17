import { useDispatch, useSelector } from 'react-redux';
import Product from './workspases/Product/Product';
import Component from './workspases/Component/Component';
import Route from './workspases/Route/Route';
import Workshop from './workspases/Workshop/Workshop';
import styles from './Workspace.module.css';
import { closeSearchComponent } from '../../store/actions/stateProjectActions';

function Workspace() {
  const { chosenType, chosenItemId, fetching } = useSelector(store => store.stateProject);
  const dispatch = useDispatch();

  function renderComponent(itemType, itemId) {
    switch(itemType) {
      case 'productData':
        return <Product itemId={itemId}></Product>
      case 'componentData':
        return <Component itemId={itemId}></Component>
      case 'routeData':
        return <Route itemId={itemId}></Route>
      case 'workshopData':
        return <Workshop itemId={itemId}></Workshop>
      default: 
        return null;
    }
  }

  return (
    <div className={styles.workspace} onClick={() => dispatch(closeSearchComponent())}>
      {!fetching && renderComponent(chosenType, chosenItemId)}
    </div>
  )
}

export default Workspace;
