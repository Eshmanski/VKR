import { useSelector, useDispatch } from 'react-redux';
import Title from '../../../Title/Title';
import styles from './Route.module.css';


function Route({itemType, itemId}) {
  const data = useSelector(store => store.data);
  const projectItem = data[itemType].items.find((item) => item.id === itemId);
  const dispatch = useDispatch();

  return (
    <div className={styles.info}>
      <Title projectItem={projectItem} itemId={itemId} itemType={itemType}></Title>
    </div>
  );
}

export default Route;
