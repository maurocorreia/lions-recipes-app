import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { userEmail } from '../../redux/actions';
import style from './login.module.css';
import logo from './image.png';

const PASSWORD_MIN_LENGTH = 6;
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setDisabled] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const emailValidation = email.includes('@') && email.includes('.com');
  const passwordValidation = password.length > PASSWORD_MIN_LENGTH;

  useEffect(() => {
    if (emailValidation && passwordValidation) setDisabled(false);
    else setDisabled(true);
  }, [emailValidation, passwordValidation]);

  function handleLogin() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    dispatch(userEmail(email));
    history.push('/foods');
  }

  return (
    <section className={ style.body }>
      <section className={ style.container__page }>
        <div className={ style.container__image }>
          <img src={ logo } alt="logo" />
        </div>
        <div className={ style.container__name }>
          <h1>Lions Recipes</h1>
        </div>
      </section>
      <section className={ style.container__login }>
        <label htmlFor="email-input">
          <input
            placeholder="Email"
            className={ style['login__input-email'] }
            value={ email }
            id="email-input"
            data-testid="email-input"
            type="email"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label htmlFor="password-input">
          <input
            placeholder="Senha"
            className={ style['login__input-password'] }
            value={ password }
            data-testid="password-input"
            id="password-input"
            type={ isVisible ? 'text' : 'password' }
            onChange={ ({ target }) => setPassword(target.value) }
          />
          <button
            className={ style.button__visible }
            onClick={ () => setIsVisible((prevState) => !prevState) }
            type="button"
          >
            {isVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </label>
        <button
          className={ style.button__enter }
          disabled={ isDisabled }
          data-testid="login-submit-btn"
          type="button"
          onClick={ handleLogin }
        >
          Entrar
        </button>
      </section>
    </section>
  );
}
