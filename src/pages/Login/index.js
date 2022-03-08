import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userEmail } from '../../redux/actions';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setDisabled] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const emailValidation = email.includes('@') && email.includes('.com');
    const PASSWORD_MIN_LENGTH = 6;
    if (emailValidation && password.length > PASSWORD_MIN_LENGTH) setDisabled(false);
    else setDisabled(true);
  }, [email, password]);

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
          type="password"
          onChange={ ({ target }) => setPassword(target.value) }
        />
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
