import ModeToggle from "./ModeToggle";

import "../../styles/header/Header.css";
import RestoreStateButton from "./RestoreStateButton";
import GetStateButton from "./GetStateButton";
import ClearCluesButton from "./ClearCluesButton";
import TitleContainer from "./TitleContainer";
import RemovePuzzleButton from "./RemovePuzzleButton";

const Header = () => {
  return (
    <div className="header">
      <TitleContainer />
      <div className="header-options">
        <div className="header-flex-element">
          <RemovePuzzleButton />
          <ClearCluesButton />
        </div>
        <div className="header-flex-element">
          <ModeToggle />
        </div>
        <div className="header-flex-element">
          <div className="state-buttons">
            <GetStateButton />
            <RestoreStateButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
