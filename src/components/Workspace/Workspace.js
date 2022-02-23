import { useSelector } from 'react-redux';
import Product from './workspases/Product/Product';
import Component from './workspases/Component/Component';
import Route from './workspases/Route/Route';
import Workshop from './workspases/Workshop/Workshop';
import styles from './Workspace.module.css';

function Workspace() {
  const { chosenType, chosenItemId } = useSelector(store => store.stateProject);

  function renderComponent(itemType, itemId) {
    switch(itemType) {
      case 'product':
        return <Product itemType={itemType} itemId={itemId}></Product>
      case 'component':
        return <Component itemType={itemType} itemId={itemId}></Component>
      case 'route':
        return <Route itemType={itemType} itemId={itemId}></Route>
      case 'workshop':
        return <Workshop itemType={itemType} itemId={itemId}></Workshop>
      default: 
        return null;
    }
  }

  return (
    <div className={styles.workspace}>
      {renderComponent(chosenType, chosenItemId)}
    </div>
  )
}

export default Workspace;
