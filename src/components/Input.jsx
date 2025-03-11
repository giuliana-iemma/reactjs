import PropTypes from "prop-types";
import { forwardRef

 } from "react";

const Input = forwardRef(
  (
    { label, type = "text", placeholder, name, value, onChange, pattern, errorMessage, showError, ...moreProps },
    ref   
  ) => {
    return (
      <>
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
          {showError && <p className="text-danger">{errorMessage}</p>}

          {/* {className == "input-add" &&} */}

      </>
    );
  }
);

Input.displayName = "Input";

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // El valor es requerido
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func, // El manejador de cambio es requerido
  errorMessage: PropTypes.string,
  showError: PropTypes.bool,
  pattern: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(RegExp)]), // Regex o cadena
};

export { Input };
