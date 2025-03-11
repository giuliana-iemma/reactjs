import PropTypes from "prop-types";
import { forwardRef } from "react";

const Textarea = forwardRef(
  ({ label, maxLength = 100, name, placeholder, showError, errorMessage,   ...moreProps}, 
    ref
  ) => {
    return (
      <div>
        {label && <label className="form-label" htmlFor={name}>{label}</label>}

        <textarea
          ref={ref}
          id={name}
          name={name}
          maxLength={maxLength}
          placeholder={placeholder}
          {...moreProps}
        ></textarea>

    {showError && <p className="text-danger">{errorMessage}</p>}

      </div>
    );
  }
);

Textarea.displayName = "Textarea";


Textarea.propTypes = {
  label: PropTypes.string,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  showError: PropTypes.any,
  errorMessage: PropTypes.string
};

export { Textarea };
