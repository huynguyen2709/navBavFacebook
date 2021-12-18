import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SettingsIcon from '@mui/icons-material/Settings';
import { CSSTransition } from 'react-transition-group';

function App() {
  return (
    <div className="App">
      <NavBar>
        <NavItem icon={<AddIcon/>} />
        <NavItem icon={<NotificationsIcon/>} />
        <NavItem icon={<ChatIcon/>} />
        <NavItem icon={<KeyboardArrowDownIcon/>}>
          <DropdownMenu/>
        </NavItem>
      </NavBar>
    </div>
  );
}

function NavBar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        { props.children }
      </ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      {/* eslint-disable-next-line */}
      <a href="#" className="icon-button" onClick={() => setOpen(!open)} >
        { props.icon }
      </a>

      { open && props.children }
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);

  function calcHeight(el) {
    console.log(el.className);
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return(
      // eslint-disable-next-line
      <a href="#" className="menu-item" onClick={() =>  props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{ props.leftIcon}</span>
        { props.children }
        <span className="icon-right">{ props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight}}>
      <CSSTransition in={activeMenu === 'main'} 
      unmountOnExit
      timeout={500}
      classNames='menu-primary'
      onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem>
            My Profile
          </DropdownItem>

          <DropdownItem 
          leftIcon={<SettingsIcon/>}
          goToMenu="settings">
            Settings
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition in={activeMenu === 'settings'} 
      unmountOnExit
      timeout={500}
      classNames='menu-secondary'
      onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" >Back</DropdownItem>
          <DropdownItem>Random 1</DropdownItem>
          <DropdownItem>Random 2</DropdownItem>
          <DropdownItem>Random 3</DropdownItem>
          <DropdownItem>Random 4</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default App;
