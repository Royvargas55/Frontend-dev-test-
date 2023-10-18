import React, { useState } from "react";
import Field from "./Field";
import useFormFields from "./useFormFields";
import { submitForm } from "./formSubmit";

function Form() {
    const formFields = useFormFields();
    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [formSuccess, setFormSuccess] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = await submitForm(formData, formFields);

        if (result.success) {
            setFormSuccess(result.message);
        } else {
            setFormErrors(result.errors || {});
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {formFields && formFields.map((field) => (
                    <Field
                        key={field.name}
                        field={field}
                        formData={formData}
                        formErrors={formErrors}
                        handleInputChange={handleInputChange}
                    />
                ))}
                <div className="clearfix"></div>
                <button type="submit">Submit</button>
            </form>
            {formSuccess && <div className="form-success">{formSuccess}</div>}
        </div>
    );
}

export default Form;