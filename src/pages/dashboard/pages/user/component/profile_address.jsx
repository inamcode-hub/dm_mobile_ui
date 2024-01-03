import styled from '@emotion/styled';
import { Button, CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileStateValues } from '../../../../../features/user/userProfileSlice';

const Address = () => {
  const dispatch = useDispatch();
  const {
    formattedAddress,
    apartment,
    building,
    street,
    city,
    state,
    country,
    zipCode,
    isLoading,
  } = useSelector((state) => state.userProfile);
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(getUserProfileStateValues({ name, value }));
  };
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Initialize Google Places Autocomplete
    if (!window.google) {
      console.error('Google Maps JavaScript API not loaded');
      return;
    }

    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current
    );
    autocompleteRef.current.addListener('place_changed', onPlaceChanged);
  }, []);

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      const components = place.address_components;
      const latitude = place.geometry?.location?.lat();
      const longitude = place.geometry?.location?.lng();

      const doorNumber =
        components.find((c) => c.types.includes('street_number'))?.long_name ||
        '';
      dispatch(
        getUserProfileStateValues({
          name: 'formattedAddress',
          value: place.formatted_address,
        })
      );
      dispatch(
        getUserProfileStateValues({ name: 'building', value: doorNumber })
      );
      dispatch(
        getUserProfileStateValues({
          name: 'street',
          value:
            components.find((c) => c.types.includes('route'))?.long_name || '',
        })
      );
      dispatch(
        getUserProfileStateValues({
          name: 'city',
          value:
            components.find((c) => c.types.includes('locality'))?.long_name ||
            '',
        })
      );
      dispatch(
        getUserProfileStateValues({
          name: 'state',
          value:
            components.find((c) =>
              c.types.includes('administrative_area_level_1')
            )?.long_name || '',
        })
      );
      dispatch(
        getUserProfileStateValues({
          name: 'country',
          value:
            components.find((c) => c.types.includes('country'))?.long_name ||
            '',
        })
      );
      dispatch(
        getUserProfileStateValues({
          name: 'zipCode',
          value:
            components.find((c) => c.types.includes('postal_code'))
              ?.long_name || '',
        })
      );
      dispatch(
        getUserProfileStateValues({ name: 'latitude', value: latitude })
      );
      dispatch(
        getUserProfileStateValues({ name: 'longitude', value: longitude })
      );
    }
  };

  return (
    <Wrapper>
      <AddressInput
        className=''
        ref={inputRef}
        type='text'
        name='formattedAddress'
        value={formattedAddress}
        onChange={(e) => handleChange(e)}
        placeholder='Enter your address'
      />

      <TextFields>
        <TextField
          label='Apartment'
          type='text'
          variant='outlined'
          name='apartment'
          value={apartment}
          onChange={(e) => handleChange(e)}
        />
        <TextField
          label='Building'
          type='text'
          variant='outlined'
          name='building'
          value={building}
          onChange={(e) => handleChange(e)}
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label='Street'
          type='text'
          variant='outlined'
          name='street'
          value={street}
          onChange={(e) => handleChange(e)}
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label='City'
          type='text'
          variant='outlined'
          name='city'
          value={city}
          onChange={(e) => handleChange(e)}
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label='State'
          type='text'
          variant='outlined'
          name='state'
          value={state}
          onChange={(e) => handleChange(e)}
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label='Country'
          type='text'
          variant='outlined'
          name='country'
          value={country}
          onChange={(e) => handleChange(e)}
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label='Zip Code'
          type='text'
          variant='outlined'
          name='zipCode'
          value={zipCode}
          onChange={(e) => handleChange(e)}
          required
          InputLabelProps={{ shrink: true }}
        />
      </TextFields>
    </Wrapper>
  );
};
const Wrapper = styled.div``;
const AddressInput = styled.input`
  width: 100%;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 1rem;
  margin-bottom: 1rem;
`;
const TextFields = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
export default Address;
