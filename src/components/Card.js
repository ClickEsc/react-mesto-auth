import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { CardContext } from '../contexts/CardContext.js';

function Card(props) {
  
  const card = React.useContext(CardContext);
  const currentUserInfo = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки, 
  // чтобы скрыть или показать иконку удаления карточки
  const isOwn = card.owner._id === currentUserInfo._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUserInfo._id);

  const cardLikeButtonClassName = `${isLiked ? 'photo-gallery__like-button photo-gallery__like-button_clicked' : 'photo-gallery__like-button'}`; 

  function handleCardClick() {
    props.onCardClick(props.card);
  }
  
  function handleLikeClick() {
    props.onCardLike(card);
  }

  function handleDeleteClick() {
    props.onCardDelete(card);
  }

  return (
    <li className="photo-gallery__item">
      <img className="photo-gallery__image" onClick={handleCardClick} alt={card.alt} src={card.link}/>
      <h2 className="photo-gallery__heading">{card.name}</h2>
      <div className="photo-gallery__like-container">
        <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
        <p className="photo-gallery__like-counter">{`${card.likes.length}`}</p>
      </div>
      {isOwn ? 
        <button className="photo-gallery__remove-button" onClick={handleDeleteClick} type="button"></button>
      : ''}
    </li>
  );
}

export default Card;