import React from 'react';

import PopupWithForm from "./PopupWithForm";

import { CardContext } from '../contexts/CardContext.js';

function AddPlacePopup(props) {

  const card = React.useContext(CardContext);

  const [placeName, setPlaceName] = React.useState('');
  const [placeLink, setPlaceLink] = React.useState('');

  function handlePlaceNameChange(e) {
    setPlaceName(e.target.value);
  }

  function handlePlaceLinkChange(e) {
    setPlaceLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: placeName,
      link: placeLink
    });
  }
  
  React.useEffect(() => {
    setPlaceName(placeName);
    setPlaceLink(placeLink);
  }, [card]);

  return (
    <PopupWithForm isOpen={props.isOpen} onSubmit={handleSubmit} onClose={props.onClose} name="add-card" title="Новое место" buttonTitle="Создать" children={
      <>
        <div className="popup__wrap">
          <input required id="place-name-input" value={placeName} onChange={handlePlaceNameChange} className="popup__input popup__place-name" name="name" placeholder="Название" minLength="1" maxLength="30" />
          <span id="place-name-input-error" className="popup__error-text popup__error-text_place-name"></span>
        </div>
        <div className="popup__wrap">
          <input required id="place-link-input" value={placeLink} onChange={handlePlaceLinkChange} type="url" className="popup__input popup__place-link" name="link" placeholder="Ссылка на картинку" />
          <span id="place-link-input-error" className="popup__error-text popup__error-text_place-link"></span>
        </div>
      </>
    }/>
  );
}

export default AddPlacePopup;