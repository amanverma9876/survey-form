// src/useFormValidation.js
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const useFormValidation = () => {
  const [additionalQuestions, setAdditionalQuestions] = useState([]);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      surveyTopic: '',
      favoriteProgrammingLanguage: '',
      yearsOfExperience: '',
      exerciseFrequency: '',
      dietPreference: '',
      highestQualification: '',
      fieldOfStudy: '',
      feedback: ''
    },
    validationSchema: Yup.object().shape({
      fullName: Yup.string().required('Full Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      surveyTopic: Yup.string().required('Survey Topic is required'),
      favoriteProgrammingLanguage: Yup.string()
        .when('surveyTopic', {
          is: 'Technology',
          then: Yup.string().required('Favorite Programming Language is required')
        }),
      yearsOfExperience: Yup.number()
        .when('surveyTopic', {
          is: 'Technology',
          then: Yup.number().typeError('Must be a number').min(0, 'Must be at least 0').required('Years of Experience is required')
        }),
      exerciseFrequency: Yup.string()
        .when('surveyTopic', {
          is: 'Health',
          then: Yup.string().required('Exercise Frequency is required')
        }),
      dietPreference: Yup.string()
        .when('surveyTopic', {
          is: 'Health',
          then: Yup.string().required('Diet Preference is required')
        }),
      highestQualification: Yup.string()
        .when('surveyTopic', {
          is: 'Education',
          then: Yup.string().required('Highest Qualification is required')
        }),
      fieldOfStudy: Yup.string()
        .when('surveyTopic', {
          is: 'Education',
          then: Yup.string().required('Field of Study is required')
        }),
      feedback: Yup.string().required('Feedback is required').min(50, 'Feedback must be at least 50 characters')
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return { formik, additionalQuestions, setAdditionalQuestions };
};

export default useFormValidation;
