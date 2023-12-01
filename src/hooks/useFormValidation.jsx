import { useState } from 'react';

const useFormValidation = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    emailError: false,
    passwordError: false,
    emailErrorList: [],
    passwordErrorList: [],
  });

  const handleChange = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    if (field === 'email') {
      validateEmail(value);
    } else if (field === 'password') {
      validatePassword(value);
    }
  };

  const validateEmail = () => {
    let errorMessages = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = formState.email;

    if (!email) {
      errorMessages.push('Email is required');
    }
    if (!emailRegex.test(email)) {
      errorMessages.push('Invalid email format');
    }

    setFormState((prevState) => ({
      ...prevState,
      emailErrorList: errorMessages,
      emailError: errorMessages.length > 0,
    }));
    return errorMessages.length === 0;
  };

  const validatePassword = () => {
    let errorMessages = [];
    const password = formState.password;
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

    setFormState((prevState) => ({
      ...prevState,
      passwordErrorList: errorMessages,
      passwordError: errorMessages.length > 0,
    }));
    return errorMessages.length === 0;
  };

  return {
    formState,
    handleChange,
    validateEmail,
    validatePassword,
  };
};

export default useFormValidation;
