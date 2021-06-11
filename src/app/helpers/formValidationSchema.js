import * as Yup from "yup";

export const validationSchema = Yup.object({
  title: Yup.string().required("Enter a catchy title for the event."),
  category: Yup.string().required("What category?"),
  description: Yup.string().required("Please enter a short description."),
  city: Yup.object().shape({
    address: Yup.string().required("What city is the event in?"),
  }),
  venue: Yup.object().shape({
    address: Yup.string().required("What is the venu name event?"),
  }),
  date: Yup.date().required("Please provide a vailid date."),
});
