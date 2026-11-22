import * as yup from "yup"; //import all exports from the yup
export const userSchemaValidation = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Not valid email format")
    .required("Email is required"),
  password: yup.string().min(4).max(20).required("Password is required"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords Don't Match")
    .required(),
  /*
  age: yup
    .number()
    .typeError("Value must be a number...")
    .integer("Value must be an integer...")
    .required("Age is required...")
    .min(10)
    .max(18),
    */

  /*
  age: yup
    .string()
    .matches(/^\d+$/, "Value must be a whole number...")
    .required("Age is required...")
    .test("is-integer", "Value must be an integer...", (value) => {
      if (!value) return false; // Ensure it's not empty
      return Number.isInteger(Number(value)); // Ensures it's a valid integer
    })
    .test("within-range", "Quantity must be between 10 and 18...", (value) => {
      const numValue = Number(value);
      return numValue >= 10 && numValue <= 18;
    }),

  allowance: yup
    .string()
    .matches(/^\d+\.\d+$/, "Value must be a decimal value...")
    .required("Allowance is required...")
    .test("is-decimal", "Value must be a decimal value...", (value) => {
      if (!value) return false; // Ensure it's not empty
      return /^\d+\.\d+$/.test(value); // Ensures it's a decimal value
    }),
    */
});
