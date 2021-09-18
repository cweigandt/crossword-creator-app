import { ReactNode } from 'react';
import '../styles/containers/PanelContainer.css';

type PropsType = {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
};

const PanelContainer = ({ left, center, right }: PropsType) => {
  return (
    <div className='panel-container'>
      <div className='panel panel-left'>{left}</div>
      <div className='panel panel-center'>{center}</div>
      <div className='panel panel-right'>{right}</div>
    </div>
  );
};

export default PanelContainer;
