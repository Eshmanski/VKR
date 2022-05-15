import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { fetchBody, setChosenModel } from '../../store/actions/stateProjectActions';
import styles from './Search.module.css';
import DragLine from './DragLine/DragLine';

function Search({isShowSearch}) {
  let allItems = useSelector(store => store.stateProject.enterpriseModels);

  const dispatch = useDispatch();

  const [textFilter, setTextFilter] = useState('');
  const [includeProduct, setIncludeProduct] = useState(false);
  const [includeComponent, setIncludeComponent] = useState(false);
  const [includeRoute, setIncludeRoute] = useState(false);
  const [includeWorkshop, setIncludeWorkshop] = useState(false);

  allItems = allItems.sort((a, b) => {
    if (a.title > b.title) return 1;
    else if (a.title < b.title) return -1;
    return 0;
  });

  let includeTypes = [];
  if(includeProduct) includeTypes.push('product');
  if(includeComponent) includeTypes.push('component');
  if(includeRoute) includeTypes.push('route');
  if(includeWorkshop) includeTypes.push('workshop');

  if(includeTypes.length !== 0)
    allItems = allItems.filter((item) => {
      return includeTypes.reduce((acum, type) => {
        return item.type === type || acum
      }, false);
    });

  if(textFilter) 
    allItems = allItems.filter((item) => item.title.toLowerCase().includes(textFilter.toLowerCase()));

  const [width, setWidth] = useState(250);

  useEffect(() => {
    if(!isShowSearch) {
      setWidth(250);
    }
  }, [isShowSearch]);

  const style = isShowSearch ? {left: '250px'} : {left: 0, transition: 'left .5s, width .5s'}
  style.width = `${width}px`;

  const handleMoveTo = (itemId, packType, bodyId) => {
    dispatch(fetchBody(itemId, packType, bodyId));
  }

  return (
    <div className={styles.searchBlock} style={style} id = 'ResizableSearch'>
      <div  className={styles.searchMain}>
        <div style={{borderBottom: '2px solid white'}}>
          <div className={styles.filterInput}>
            <input type="text" value={textFilter} onChange={(e) => setTextFilter(e.target.value)}/>
            <div className={styles.loupe}>
              <SearchIcon></SearchIcon>
            </div>
          </div>
          <div className={styles.checkBoxsBlock}>
            <div>
              <input type="checkbox" name="product" id="product" value={includeProduct} onChange={(e) => setIncludeProduct(e.target.checked)}/>
              <label htmlFor="product">Изделия</label>
            </div>
            <div>
              <input type="checkbox" name="component" id="component" value={includeComponent} onChange={(e) => setIncludeComponent(e.target.checked)}/>
              <label htmlFor="component">Детали</label>
            </div>
            <div>
              <input type="checkbox" name="route" id="route" value={includeRoute} onChange={(e) => setIncludeRoute(e.target.checked)}/>
              <label htmlFor="route">Маршруты</label>
            </div>
            <div>
              <input type="checkbox" name="workshops" id="workshops" value={includeWorkshop} onChange={(e) => setIncludeWorkshop(e.target.checked)}/>
              <label htmlFor="workshops">Цеха</label>
            </div>
          </div>
        </div>

        <div className={styles.itemsList}>
          {allItems.map(item => 
            <div key={item.id} className={styles.item} onClick={() => handleMoveTo(item.id, item.type, item.bodyId)}>
              <img src={`./icons/${item.type}-icon.png`} alt="" />
              <div>{item.title}</div>
            </div>)}
        </div>
      </div>
      {isShowSearch && <DragLine setWidth={setWidth} width={width}></DragLine>}
    </div>
  );
}

export default Search;
