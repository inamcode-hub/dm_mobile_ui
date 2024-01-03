import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

const Address = () => {
  const [address, setAddress] = useState({
    formattedAddress: '',
    apartment: '',
    building: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    latitude: null,
    longitude: null,
  });
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

      setAddress({
        ...address,
        building: doorNumber,
        formattedAddress: place.formatted_address,
        street:
          components.find((c) => c.types.includes('route'))?.long_name || '',
        city:
          components.find((c) => c.types.includes('locality'))?.long_name || '',
        state:
          components.find((c) =>
            c.types.includes('administrative_area_level_1')
          )?.long_name || '',
        country:
          components.find((c) => c.types.includes('country'))?.long_name || '',
        zip:
          components.find((c) => c.types.includes('postal_code'))?.long_name ||
          '',
        latitude,
        longitude,
      });
    }
  };

  return (
    <Wrapper>
      <AddressInput
        className=''
        ref={inputRef}
        type='text'
        value={address.formattedAddress}
        onChange={(e) => setAddress(e.target.value)}
        placeholder='Enter your address'
      />

      <TextFields>
        <TextField
          label='Apartment'
          type='text'
          variant='outlined'
          name='apartment'
          value={address.apartment}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          label='Building'
          type='text'
          variant='outlined'
          name='building'
          value={address.building}
          onChange={(e) => setAddress(e.target.value)}
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label='Street'
          type='text'
          variant='outlined'
          name='street'
          value={address.street}
          onChange={(e) => setAddress(e.target.value)}
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label='City'
          type='text'
          variant='outlined'
          name='city'
          value={address.city}
          onChange={(e) => setAddress(e.target.value)}
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label='State'
          type='text'
          variant='outlined'
          name='state'
          value={address.state}
          onChange={(e) => setAddress(e.target.value)}
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label='Country'
          type='text'
          variant='outlined'
          name='country'
          value={address.country}
          onChange={(e) => setAddress(e.target.value)}
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label='Zip'
          type='text'
          variant='outlined'
          name='zip'
          value={address.zip}
          onChange={(e) => setAddress(e.target.value)}
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
