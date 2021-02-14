export const BASE_URL = 'https://auth.nomoreparties.co';

// Обработка запроса регистрации пользователя
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => {
      try {
        if (res.status === 201) {
          return res.json();
        }
      } catch (err) {
        return (err)
      }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};

// Обработка запроса авторизации пользователя