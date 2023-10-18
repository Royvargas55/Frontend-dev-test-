import { useState, useEffect } from "react";

const useFormFields = () => {
    const [formFields, setFormFields] = useState([]);

    useEffect(() => {
        const fetchFormFields = async () => {
            try {
                const response = await fetch("https://devtest.juancg.ca/form/");
                if (!response.ok) {
                    throw new Error("Failed to fetch form fields.");
                }
                const data = await response.json();
                setFormFields(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFormFields();
    }, []);

    return formFields;
};

export default useFormFields;
