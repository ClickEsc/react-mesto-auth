import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
  const currentUserInfo = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <img className="profile__avatar" src={`${currentUserInfo.avatar}`} alt="Фотография пользователя" />
        <button className="profile__edit-button profile__edit-button_avatar" type="button" onClick={props.onEditAvatar}></button>
        <div className="profile__info">
          <h1 className="profile__username">{`${currentUserInfo.name}`}</h1>
          <button id="editProfilePopupOpenButton" className="profile__edit-button profile__edit-button_user-info" type="button" onClick={props.onEditProfile}></button>
          <p className="profile__bio">{`${currentUserInfo.about}`}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>
   
      <ul className="photo-gallery">
        {props.cards}
      </ul>
    </main>
  );
}

export default Main;