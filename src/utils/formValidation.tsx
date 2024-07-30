import * as yup from 'yup';

export const schema = yup.object().shape({
    title: yup.string().min(4, 'Title is required and should be more than 4 characters').required(),
    ingredients: yup.string().min(4, 'Ingredients are required and should be more than 4 characters').required(),
    instructions: yup.string().min(10, 'Instructions are required and should be more than 10 characters').required(),
    image: yup
      .mixed()
      .required('Image is required')
  });

