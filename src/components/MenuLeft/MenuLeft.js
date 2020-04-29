import React, { useState, useEffect } from "react";
import "./MenuLeft.scss";
import { Menu, Icon } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { isUserAdmin } from "../../utils/Api";
import BasicModal from "../Modal/BasicModal";
import AddArtistForm from "../Artists/AddArtistForm";
import AddAlbumForm from "../AddAlbumForm";

function MenuLeft(props) {
  const { user, location } = props;
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const [userAdmin, setUserAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location]);

  const handlerMenu = (e, menu) => {
    setActiveMenu(menu.to);
  };

  const handlerModal = (type) => {
    switch (type) {
      case "artist":
        setTitleModal("Nuevo Artista");
        setContentModal(<AddArtistForm setShowModal={setShowModal} />);
        setShowModal(true);
        break;
      case "album":
        setTitleModal("Nuevo Album");
        setContentModal(<AddAlbumForm setShowModal={setShowModal} />);
        setShowModal(true);
        break;
      case "song":
        setTitleModal("Nueva Cancion");
        setContentModal(<h2>Formulario nueva cancion</h2>);
        setShowModal(true);
        break;
      default:
        setTitleModal(null);
        setContentModal(false);
        setShowModal(false);
    }
  };

  useEffect(() => {
    isUserAdmin(user.uid).then((response) => {
      setUserAdmin(response);
    });
  }, [user]);

  return (
    <>
      <Menu className="menu-left" vertical>
        <div className="top">
          <Menu.Item
            name="home"
            as={Link}
            to="/"
            active={activeMenu === "/"}
            onClick={handlerMenu}
          >
            <Icon name="home" />
            Inicio
          </Menu.Item>
          <Menu.Item
            name="artists"
            as={Link}
            to="/artists"
            active={activeMenu === "/artists"}
            onClick={handlerMenu}
          >
            <Icon name="music" />
            Artistas
          </Menu.Item>
        </div>
        {userAdmin && (
          <div className="footer">
            <Menu.Item onClick={() => handlerModal("artist")}>
              <Icon name="plus square outline" />
              Nuevo Artista
            </Menu.Item>
            <Menu.Item onClick={() => handlerModal("album")}>
              <Icon name="plus square outline" />
              Nuevo Album
            </Menu.Item>
            <Menu.Item onClick={() => handlerModal("song")}>
              <Icon name="plus square outline" />
              Nueva Cancion
            </Menu.Item>
          </div>
        )}
      </Menu>
      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {contentModal}
      </BasicModal>
    </>
  );
}

export default withRouter(MenuLeft);
