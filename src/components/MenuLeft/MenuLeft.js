import React, { useState, useEffect } from "react";
import "./MenuLeft.scss";
import { Menu, Icon } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

function MenuLeft(props) {
  const { user, location } = props;

  const [activeMenu, setActiveMenu] = useState(location.pathname);

  const handleMenu = (e, menu) => {
    setActiveMenu(menu.to);
  };

  return (
    <Menu className="menu-left" vertical>
      <div className="top">
        <Menu.Item
          name="home"
          as={Link}
          to="/"
          active={activeMenu === "/"}
          onClick={handleMenu}
        >
          <Icon name="home" />
          Inicio
        </Menu.Item>
        <Menu.Item
          name="artists"
          as={Link}
          to="/artists"
          active={activeMenu === "/artists"}
          onClick={handleMenu}
        >
          <Icon name="music" />
          Artistas
        </Menu.Item>
      </div>
      <div className="footer">
        <Menu.Item name="">
          <Icon name="plus square outline" />
          Nuevo Artista
        </Menu.Item>
        <Menu.Item name="">
          <Icon name="plus square outline" />
          Nueva Cancion
        </Menu.Item>
      </div>
    </Menu>
  );
}

export default withRouter(MenuLeft);
