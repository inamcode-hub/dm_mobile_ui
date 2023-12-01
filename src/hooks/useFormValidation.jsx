import { useState } from 'react';

const useFormValidation = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailErrorList, setEmailErrorList] = useState([]);
  const [passwordErrorList, setPasswordErrorList] = useState([]);

  const validateEmail = (email) => {
    let errorMessages = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      errorMessages.push('Email is required');
    }
    if (!emailRegex.test(email)) {
      errorMessages.push('Invalid email format');
    }

    setEmailErrorList(errorMessages);
    setEmailError(errorMessages.length > 0);
    return errorMessages.length === 0;
  };

  const validatePassword = (password) => {
    let errorMessages = [];
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);

    if (password.length < minLength) {
      errorMessages.push('Password must be at least 8 characters');
    }
    if (!hasUpperCase) {
      errorMessages.push('Password must include an uppercase letter');
    }
    if (!hasNumber) {
      errorMessages.push('Password must include a number');
    }
    if (!hasLetter) {
      errorMessages.push('Password must include a letter');
    }

    setPasswordErrorList(errorMessages);
    setPasswordError(errorMessages.length > 0);
    return errorMessages.length === 0;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) {
      validateEmail(e.target.value);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) {
      validatePassword(e.target.value);
    }
  };

  return {
    email,
    password,
    emailError,
    passwordError,
    emailErrorList,
    passwordErrorList,
    handleEmailChange,
    handlePasswordChange,
    validateEmail,
    validatePassword,
  };
};

export default useFormValidation;
