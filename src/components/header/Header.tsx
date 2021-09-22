import ModeToggle from './ModeToggle';

import '../../styles/header/Header.css';
import RestoreStateButton from './RestoreStateButton';
import GetStateButton from './GetStateButton';

const Header = () => {
  return (
    <div className='header'>
      <ModeToggle />
      <div className='state-buttons'>
        <GetStateButton />
        <RestoreStateButton />
      </div>
    </div>
  );
};

export default Header;
