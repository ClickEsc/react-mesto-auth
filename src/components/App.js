import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import { api } from '../utils/api';
import * as auth from '../utils/auth';

import '../index.css';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardContext } from '../contexts/CardContext';

import ProtectedRoute from './ProtectedRoute';

import Card from './Card';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";

import Register from "./Register";
import Login from "./Login";
import InfoToolTip from './InfoTooltip';

import tickMark from '../images/tick-mark.svg';
import crossMark from '../images/cross-mark.svg';


function App() {

  const history = useHistory();

  // Хук состояния авторизован пользователь или нет
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');

  function handleLogIn() {
    const token = localStorage.getItem('token');
    if (token) {
      auth.getToken(token)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setUserEmail(res.data.email);
            history.push('/');
          }
        })
        .catch(err => console.log(`Ошибка при запросе токена: ${err.message}`));
    }
  }

  // Хук для попапа информирования об успешности регистрации
  const [infoTooltip, setInfoTooltip] = React.useState(undefined);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);

  function handleInfoTooltip() {
    setInfoTooltipOpen(true);
  }
  
  function handleInfoTooltipContent(res) {
    if (res) {
      setInfoTooltip({
        src: tickMark,
        text: 'Вы успешно зарегистрировались!',
      });
    } else {
      setInfoTooltip({
        src: crossMark,
        text: 'Что-то пошло не так! Попробуйте ещё раз.',
      });
    }
  }

  // Регистрация пользователя
  function registerUser(email, password) {
    auth.register(email, password)
      .then((res) => {
        if (res) {
          handleInfoTooltipContent(res);
          handleInfoTooltip();
          history.push('/sign-in');
        } else {
          handleInfoTooltipContent(res);
          handleInfoTooltip();
        }
    })
      .catch(err => console.log(`Ошибка при попытке регистрации пользователя: ${err.message}`));
  }

  // Авторизация пользователя
  function authorizeUser(email, password) {
    auth.authorize(email, password)
      .then((res) => {
        if (res.token) {
          handleLogIn();
          history.push('/');
        }
    })
    .catch(err => console.log(`Ошибка при попытке входа пользователя: ${err.message}`));
  }

  // Cохранение токена для повторного входа пользователя без дополнительной авторизации
  React.useEffect(() => {
    handleLogIn();
  }, [isLoggedIn]);

  // Удаление токена при выходе пользователя
  function signOut() {
    localStorage.removeItem('token');
    setUserEmail('');
    history.push('/sign-in');
  }

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
      .catch(err => console.log(`Ошибка при обращении за информацией о пользователе: ${err.message}`))
  }, []);

  function handleUpdateUser(currentUser) {
    api.editUserInfo(currentUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка при редактировании информации о пользователе: ${err.message}`))
  }

  function handleUpdateAvatar(currentUser) {
    api.changeUserAvatar(currentUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка при замене аватара пользователя: ${err.message}`))
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
    setInfoTooltipOpen(false);
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
            <Header email={userEmail} signOut={signOut} />
            <Switch>
              <ProtectedRoute exact path="/" loggedIn={isLoggedIn} component={Main}
                cards={renderedCards} 
                onEditAvatar={handleEditAvatarClick} 
                onEditProfile={handleEditProfileClick} 
                onAddPlace={handleAddPlaceClick} 
                onCardClick={handleCardClick} />
              <Route path="/sign-up">
                <Register onRegister={registerUser} />
              </Route>
              <Route path="/sign-in">
                <Login onLogin={authorizeUser} />
              </Route>
              <Route path="/">
                {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
              </Route>
            </Switch>
            <Footer />
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar} onClose={closeAllPopups} />
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser} onClose={closeAllPopups} /> 
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onAddPlace={handleAddPlaceSubmit} onClose={closeAllPopups} />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} name="show-image" />
            <InfoToolTip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} content={infoTooltip} />
          </div>  
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;