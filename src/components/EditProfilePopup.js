import React from 'react';

import PopupWithForm from "./PopupWithForm";

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
  
  const currentUserInfo = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    if (currentUserInfo) {
      setName(currentUserInfo.name);
      setDescription(currentUserInfo.about);
    }
  }, [currentUserInfo, props.isOpen]);

  return (
    <PopupWithForm isOpen={props.isOpen} onSubmit={handleSubmit} onClose={props.onClose} name="edit-profile" title="Редактировать профиль" buttonTitle="Сохранить" children={
      <>
        <div className="popup__wrap">
          <input required id="username-input" value={ name || ''} onChange={handleNameChange} className="popup__input popup__username" name="name" placeholder="Имя" minLength="2" maxLength="40" />
          <span id="username-input-error" className="popup__error-text popup__error-text_username"></span>
        </div>
        <div className="popup__wrap">
          <input required id="bio-input" value={description || ''} onChange={handleDescriptionChange} className="popup__input popup__bio" name="about" placeholder="О себе" minLength="2" maxLength="200" />
          <span id="bio-input-error" className="popup__error-text popup__error-text_bio"></span>
        </div>
      </>
    }/>
  );
}

export default EditProfilePopup;