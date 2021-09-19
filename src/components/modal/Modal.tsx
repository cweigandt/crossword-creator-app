import React from 'react';

import '../../styles/modal/Modal.css';

type PropsType = {
  classes: string;
  children: React.ReactNode;
};

const Modal = ({ classes, children }: PropsType) => {
  return (
    <div className='modal-bg'>
      <div className={`modal ${classes}`}>{children}</div>
    </div>
  );
};

export default Modal;
