export async function submitForm(formData, formFields) {
    const errors = {};
    for (const field of formFields) {
        if (field.required && !formData[field.name]) {
            errors[field.name] = `${field.label} is required.`;
        }
    }

    if (Object.keys(errors).length > 0) {
        return { success: false, errors };
    } else {
        try {
            const response = await fetch("https://devtest.juancg.ca/form/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit form data.");
            }

            const result = await response.json();

            if (result.success) {
                return { success: true, message: "Form submitted successfully." };
            } else {
                return { success: false, message: `Form submission failed. ${result.message}` };
            }
        } catch (error) {
            return { success: false, message: `Form submission failed. ${error.message}` };
        }
    }
}
