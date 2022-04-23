import { Button, Modal, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { styleModal } from '../../../shared/stylesMUI';
import { ucFirst } from '../../../shared/utils';
import { setChosenItem } from '../../../store/actions/stateProjectActions';
import styles from './ConfirmDel.module.css';



function ConfirmDel({isOpen, onClose, onDel, type, id}) {
  const data = useSelector(store => {
    const data = {...store};
    delete data.stateProject;
    return data;
  });

  const dispatch = useDispatch();

  let typeNames = [];
  let binding = [];


  switch(type) {
    case 'product': {
      typeNames = ['изделие'];
      const products = findProduct(data.productData.items, id);
      if(products.length !== 0)
        binding.push({name: 'Изделия', type: 'productData', items: products});
      break;
    }
    case 'component': {
      typeNames = ['деталь'];
      const products = findComponent(data.productData.items, id);
      if(products.length !== 0)
        binding.push({name: 'Изделия', type: 'productData', items: products});
      break
    }
    case 'route': {
      typeNames = ['маршрут'];
      const products = findRoute(data.productData.items, id);
      const components = findRoute(data.componentData.items, id);
      if(products.length !== 0)
        binding.push({name: 'Изделия', type: 'productData', items: products});
      if(components.length !== 0)
        binding.push({name: 'Детали', type: 'componentData', items: components});
      break;
    }
    case 'workshop': {
      typeNames = ['цех'];
      const routs = findWorkshop(data.routeData.items, id);
      if(routs.length !== 0)
        binding.push({name: 'Маршрут', type: 'workshopData', items: routs});
      break;
    }
    default:
      break;
  }

  const handleMoveTo = (itemId, packType) => {
    dispatch(setChosenItem({itemId, packType}));
    onClose();
  }


  const renderModal = () => {
    if(binding.length === 0) {
      return (
        <Modal
          open={isOpen}
          aria-labelledby="modal-body"
        >
          <Box sx={{...styleModal, width: '300px'}} component="form">
            <Typography id="modal-body" variant="h6" component="h2" sx={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
              Удалить {typeNames[0]}?
              <Box sx={{display: 'flex', flexDirection: 'row', padding: '20px', justifyContent: 'space-between', marginTop: '20px'}}>
                <Button
                  color="error" 
                  variant="contained"
                  onClick={() => onDel()}
                >
                  Удалить
                </Button>
    
                <Button
                  color="primary" 
                  variant="contained"
                  onClick={onClose}
                >
                  Отменить
                </Button>
              </Box>
            </Typography>
          </Box>
        </Modal>
      );
    } else {
      return (
        <Modal
          open={isOpen}
          aria-labelledby="modal-body"
        >
          <Box sx={styleModal} component="form">
            <Typography id="modal-body" variant="h6" component="h2" sx={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
              <div style={{color: 'red'}}>Удалить {typeNames[0]} нельзя</div>
              <div>{ucFirst(typeNames[0])} используется в других моделях!</div>

              {binding.map((model, index) => {
                return (
                  <div className={styles.bindingBlock} key={index}>
                    <div className={styles.moduleName}>{model.name}:</div>
                    <div className={styles.moduleItemsList}>
                      {model.items.map((item) => <div
                        key={item.id}
                        className={styles.moduleItem} 
                        onClick={() => handleMoveTo(item.id, model.type)}
                      >
                          {item.title}
                      </div>)}
                    </div>
                  </div>
                )
              })}

              <Box sx={{display: 'flex', flexDirection: 'row', padding: '20px', justifyContent: 'space-between', marginTop: '20px'}}>
                <Button
                  color="primary" 
                  variant="contained"
                  onClick={onClose}
                >
                  Отменить
                </Button>
              </Box>
            </Typography>
          </Box>
        </Modal>
      );
    }
  }

  return renderModal();
}

function findProduct(items, id) {
  const suitableItems = items
    .filter((item) => { 
      return Object.keys(item.body.productsId).find(productId => productId === id);
    })
    .map(item => ({id: item.id, title: item.title}));
  return suitableItems;
}

function findComponent(items, id) {
  const suitableItems = items
    .filter((item) => {
      return Object.keys(item.body.componentsId).find(componentId => componentId === id);
    })
    .map(item => ({id: item.id, title: item.title}));
  return suitableItems;
}

function findRoute(items, id) {
  const suitableItems = items
    .filter((item) => item.body.routeId === id)
    .map(item => ({id: item.id, title: item.title}));
  return suitableItems;
}

function findWorkshop(items, id) {
  const suitableItems = items
  .filter((item) => {
    return item.body.workshopNodes.find(node => node.id === id);
  })
  .map(item => ({id: item.id, title: item.title}));
  return suitableItems;
}

export default ConfirmDel;