import validator from "validator";

export const validateUserInput = (email: string, password: string) => {
  if (!email || !password) {
    return { valid: false, message: "Email and password are required." };
  }

  if (!validator.isEmail(email)) {
    return { valid: false, message: "Invalid email format." };
  }

  if (!validator.isStrongPassword(password)) {
    return {
      valid: false,
      message:
        "password is not storage!, please try again with valid password.",
    };
  }

  return { valid: true };
};
