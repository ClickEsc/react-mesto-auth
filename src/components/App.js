import React from 'react';

import { api } from '../utils/api.js';

import '../index.css';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { CardContext } from '../contexts/CardContext.js';

import Card from './Card.js';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';

import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";


function App() {

  // Хук для установки данных пользователя в профиле
  const [currentUser, setCurrentUser] = React.useState({});

  function handleCurrentUserInfo(res) {
    setCurrentUser(res);
  }

  React.useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        handleCurrentUserInfo(res);
      })
      .catch(err => console.log(`Ошибка при обращении за информацией о пользователе: ${err}`))
  }, []);

  function handleUpdateUser(currentUser) {
    api.editUserInfo(currentUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка при редактировании информации о пользователе: ${err}`))
  }

  function handleUpdateAvatar(currentUser) {
    api.changeUserAvatar(currentUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка при замене аватара пользователя: ${err}`))
  }

  // Хук для попапа редактирования аватара
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  
  // Хук для попапа редактирования информации о пользователе
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  
  // Хук для попапа добавления карточки
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  // Хук для попапа показа полноразмерного изображения
  const [selectedCard, setSelectedCard] = React.useState(undefined);

  function handleCardClick() {
    setSelectedCard({
      src: this.link,
      name: this.name,
      alt: `Изображение под названием ${this.name}`
    });
  }

  // Функция закрытия всех попапов
  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(undefined);
  }

  // Карточки

  const [cards, setCards] = React.useState([]);

  function handleInitialCards(res) {
    setCards(res);
  }
  
  React.useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        const initialCards = res.map((item) => {
          return item
        });
        handleInitialCards(initialCards);
      })
      .catch(err => console.log(`Ошибка при запросе начальных карточек: ${err}`))
  }, []);

  // Добавление новой карточки
  function handleAddPlaceSubmit(card) {
    api.postCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка при создании новой карточки: ${err}`))
  }

  // Обработка лайка
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
        
    api.changeLikeCardStatus(card, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch(err => console.log(`Ошибка при изменении статуса лайка: ${err}`))
  }
  
  // Обработка удаления карточки
  function handleCardDelete(card) {
    api.deleteCard(card)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch(err => console.log(`Ошибка при удалении карточки: ${err}`))
  }

  const renderedCards = cards.map((card) => {
    return <CardContext.Provider value={card} key={card._id}>
      <Card onCardLike={handleCardLike} onCardDelete={handleCardDelete} onCardClick={handleCardClick} name={card.name} link={card.link} likes={card.likes.length} alt={`Изображение под названием ${card.name}`}/>
    </CardContext.Provider>
  })

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <div className="page__container">
            <Header />
            <Main cards={renderedCards} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} />
            <Footer />

            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar} onClose={closeAllPopups} />
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser} onClose={closeAllPopups} /> 
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onAddPlace={handleAddPlaceSubmit} onClose={closeAllPopups} />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} name="show-image" />

          </div>  
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;