import React, { Fragment } from 'react';
/** @jsxImportSource @emotion/react */
import { container, label_text, transparent_select } from './SelectStyles';
import countries from './countryData';

const SelectCountry = ({ value, label, name, onChange }) => {
  return (
    <div css={container}>
      <p css={label_text}>{label}</p>
      <select css={transparent_select} value={value} name={name} onChange={onChange}>
        <option />
        {countries.map((country, index) => {
          return (
            <option key={index} value={country}>
              {country}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectCountry;
