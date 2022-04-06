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
    <div className={styles.workspace}>
      {renderComponent(chosenType, chosenItemId)}
    </div>
  )
}

export default Workspace;
