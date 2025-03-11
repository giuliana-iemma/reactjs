import PropTypes from "prop-types";
import { Button } from "./Button";

import { forwardRef

 } from "react";

const InputAdd = forwardRef(
  (
    { label, type = "text", placeholder, name, value, onChange, pattern, errorMessage, showError, onClickButton, ...moreProps },
    ref   
  ) => {
    return (
    <div className='mt-3 container-add'>
        {label && <label className="form-label">{label}</label>}
        <input
          ref={ref}
          id={name}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          pattern = {pattern}
          {...moreProps}
        />

          <Button 
            className='btn-add' 
            onClick={onClickButton} 
            label="+"
            />

            {showError && <p className="text-danger">{errorMessage}</p>}
      </div>
    );
  }
);

InputAdd.displayName = "InputAdd";

InputAdd.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // El valor es requerido
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func, // El manejador de cambio es requerido
  errorMessage: PropTypes.string,
  showError: PropTypes.bool,
  pattern: PropTypes.string,
  onClickButton: PropTypes.any
};

export { InputAdd };
