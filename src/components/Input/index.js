import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

const InputBase = styled.input`
  width: 100%;
  display: block;
  padding: 10px;
  background-color: transparent;
  border: 1px solid #DADADA;
  color: ${({ theme }) => theme.colors.contrastText};
  border-radius:  ${({ theme }) => theme.borderRadius};
  margin-bottom: 10px;
  &::placeholder{
    color: ${({ theme }) => theme.colors.contrastText};
  }
`;

export default function Input({ onChange, placeholder, ...props }) {
  return (
    <div>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <InputBase onChange={onChange} placeholder={placeholder} {...props} />
    </div>
  );
}

Input.defaultProps = {
  value: '',
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};
