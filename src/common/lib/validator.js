const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex =
  /^\+?(\d{1,3})?[-.\s]?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;

export function formDataValidator(formData) {
  const errorObj = {};
  Object.keys(formData).forEach((key) => {
    switch (key) {
      case "username":
        errorObj[key] = { isValid: emailRegex.test(formData?.username) };
        break;
      case "email":
        errorObj[key] = { isValid: emailRegex.test(formData?.email) };
        break;
      case "password":
        errorObj[key] = { isValid: formData?.password?.length >= 6 };
        break;
      case "firstName":
        errorObj[key] = { isValid: formData?.firstName?.length >= 3 };
        break;
      case "lastName":
        errorObj[key] = { isValid: formData?.lastName?.length >= 3 };
        break;
      case "contactNumber":
        errorObj[key] = { isValid: phoneRegex.test(formData.contactNumber) };
        break;
      case "confirmPassword":
        errorObj[key] = {
          isValid: formData?.confirmPassword === formData.password,
        };
        break;
      default:
        return {};
    }
  });
  return errorObj;
}

export function isInvalidData(errorObj) {
  return !!Object.keys(errorObj).find((key) => !errorObj[key].isValid);
}
