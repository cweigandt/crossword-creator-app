import ModeToggle from './ModeToggle';

import '../../styles/header/Header.css';
import RestoreStateButton from './RestoreStateButton';
import GetStateButton from './GetStateButton';
import ClearCluesButton from './ClearCluesButton';

const Header = () => {
  return (
    <div className='header'>
      <div className='header-flex-element'>
        <ClearCluesButton />
      </div>
      <div className='header-flex-element'>
        <ModeToggle />
      </div>
      <div className='header-flex-element'>
        <div className='state-buttons'>
          <GetStateButton />
          <RestoreStateButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
