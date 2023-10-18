import React from "react";

const Field = ({ field, formData, formErrors, handleInputChange }) => {
  return (
    <div key={field.name} className={`col-${field.columns}`}>
      <label>
        {field.label} {field.required && <span>(*)</span>}
        <input
          type="text"
          name={field.name}
          onChange={handleInputChange}
          value={formData[field.name] || ""}
        />
        {formErrors[field.name] && (
          <div className="error-message">{formErrors[field.name]}</div>
        )}
      </label>
    </div>
  );
};

export default Field;