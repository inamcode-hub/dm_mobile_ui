import React, { useEffect, useState } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import styled from '@emotion/styled';

const MobilePicker = () => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e);
  };
  useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <Wrapper>
      <PhoneInput
        placeholder='+1 416 123 4567'
        value={value}
        onChange={handleChange}
        defaultCountry='US'
        international
        withCountryCallingCode
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  .PhoneInput {
    width: 100%;
    margin-bottom: 1rem;

    .PhoneInputInput {
      border: 1px solid #e2e2e1;
      border-radius: 4px;
      padding: 16.5px 14px;
      font-size: 16px;
      width: 100%;
      box-sizing: border-box;

      &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.palette.primary.main};
      }
    }

    .PhoneInputCountry {
      border: 1px solid #e2e2e1;
      border-radius: 4px 0 0 4px;
      /* position: absolute; */
      top: 0;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 12px;
      background-color: white;
      box-sizing: border-box;

      &:hover {
        cursor: pointer;
      }
    }

    .PhoneInputCountrySelectArrow {
      margin-left: 6px;
    }
  }
`;

export default MobilePicker;
