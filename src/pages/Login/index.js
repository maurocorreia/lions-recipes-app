import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { userEmail } from '../../redux/actions';

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
    <section>
      <label htmlFor="email-input">
        <input
          value={ email }
          id="email-input"
          data-testid="email-input"
          type="text"
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label htmlFor="password-input">
        <input
          value={ password }
          data-testid="password-input"
          id="password-input"
          type={ isVisible ? 'text' : 'password' }
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <button
          onClick={ () => setIsVisible((prevState) => !prevState) }
          type="button"
        >
          {isVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
        </button>
      </label>
      <button
        disabled={ isDisabled }
        data-testid="login-submit-btn"
        type="button"
        onClick={ handleLogin }
      >
        Enter
      </button>
    </section>
  );
}
