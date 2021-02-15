import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const avatarRef = React.useRef(0);

  function resetForm() {
    avatarRef.current.value = '';
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
    resetForm();
  }

  return (
    <PopupWithForm isOpen={props.isOpen} onSubmit={handleSubmit} onClose={props.onClose} name="load-avatar" title="Обновить аватар" buttonTitle="Сохранить" children={
      <>
        <div className="popup__wrap">
          <input required id="avatar-link-input" type="url" ref={avatarRef} className="popup__input popup__avatar-link" name="avatar" placeholder="Ссылка на картинку" />
          <span id="avatar-link-input-error" className="popup__error-text popup__error-text_avatar-link"></span>
        </div>
      </>
    }/>
  );
}

export default EditAvatarPopup;