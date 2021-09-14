import '../styles/containers/PanelContainer.css';

const PanelContainer = ({ left, center, right }) => {
  return (
    <div className='panel-container'>
      <div className='panel panel-left'>{left}</div>
      <div className='panel panel-center'>{center}</div>
      <div className='panel panel-right'>{right}</div>
    </div>
  );
};

export default PanelContainer;
