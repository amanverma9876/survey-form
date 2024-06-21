import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const SurveyForm = () => {
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
      feedback: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full Name is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      surveyTopic: Yup.string().required('Survey Topic is required'),
      favoriteProgrammingLanguage: Yup.string()
        .when('surveyTopic', {
          is: 'Technology',
          then: Yup.string().required('Favorite Programming Language is required')
        }),
      yearsOfExperience: Yup.number()
        .when('surveyTopic', {
          is: 'Technology',
          then: Yup.number().min(0, 'Must be at least 0').required('Years of Experience is required')
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

  useEffect(() => {
    const fetchAdditionalQuestions = async () => {
      if (formik.values.surveyTopic) {
        try {
          const response = await axios.get(`http://localhost:4000/questions/${formik.values.surveyTopic}`);
          setAdditionalQuestions(response.data);
        } catch (error) {
          console.error("Error fetching additional questions:", error);
        }
      }
    };
  
    fetchAdditionalQuestions();
  }, [formik.values.surveyTopic]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fullName}
        />
        {formik.touched.fullName && formik.errors.fullName ? (
          <div>{formik.errors.fullName}</div>
        ) : null}
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
      </div>

      <div>
        <label>Survey Topic</label>
        <select
          name="surveyTopic"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.surveyTopic}
        >
          <option value="" label="Select topic" />
          <option value="Technology" label="Technology" />
          <option value="Health" label="Health" />
          <option value="Education" label="Education" />
        </select>
        {formik.touched.surveyTopic && formik.errors.surveyTopic ? (
          <div>{formik.errors.surveyTopic}</div>
        ) : null}
      </div>

      {formik.values.surveyTopic === 'Technology' && (
        <div>
          <label>Favorite Programming Language</label>
          <select
            name="favoriteProgrammingLanguage"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.favoriteProgrammingLanguage}
          >
            <option value="" label="Select language" />
            <option value="JavaScript" label="JavaScript" />
            <option value="Python" label="Python" />
            <option value="Java" label="Java" />
            <option value="C#" label="C#" />
          </select>
          {formik.touched.favoriteProgrammingLanguage && formik.errors.favoriteProgrammingLanguage ? (
            <div>{formik.errors.favoriteProgrammingLanguage}</div>
          ) : null}

          <label>Years of Experience</label>
          <input
            type="number"
            name="yearsOfExperience"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.yearsOfExperience}
          />
          {formik.touched.yearsOfExperience && formik.errors.yearsOfExperience ? (
            <div>{formik.errors.yearsOfExperience}</div>
          ) : null}
        </div>
      )}

      {formik.values.surveyTopic === 'Health' && (
        <div>
          <label>Exercise Frequency</label>
          <select
            name="exerciseFrequency"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.exerciseFrequency}
          >
            <option value="" label="Select frequency" />
            <option value="Daily" label="Daily" />
            <option value="Weekly" label="Weekly" />
            <option value="Monthly" label="Monthly" />
            <option value="Rarely" label="Rarely" />
          </select>
          {formik.touched.exerciseFrequency && formik.errors.exerciseFrequency ? (
            <div>{formik.errors.exerciseFrequency}</div>
          ) : null}

          <label>Diet Preference</label>
          <select
            name="dietPreference"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dietPreference}
          >
            <option value="" label="Select diet" />
            <option value="Vegetarian" label="Vegetarian" />
            <option value="Vegan" label="Vegan" />
            <option value="Non-Vegetarian" label="Non-Vegetarian" />
          </select>
          {formik.touched.dietPreference && formik.errors.dietPreference ? (
            <div>{formik.errors.dietPreference}</div>
          ) : null}
        </div>
      )}

      {formik.values.surveyTopic === 'Education' && (
        <div>
          <label>Highest Qualification</label>
          <select
            name="highestQualification"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.highestQualification}
          >
            <option value="" label="Select qualification" />
            <option value="High School" label="High School" />
            <option value="Bachelor's" label="Bachelor's" />
            <option value="Master's" label="Master's" />
            <option value="PhD" label="PhD" />
          </select>
          {formik.touched.highestQualification && formik.errors.highestQualification ? (
            <div>{formik.errors.highestQualification}</div>
          ) : null}

          <label>Field of Study</label>
          <input
            type="text"
            name="fieldOfStudy"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fieldOfStudy}
          />
          {formik.touched.fieldOfStudy && formik.errors.fieldOfStudy ? (
            <div>{formik.errors.fieldOfStudy}</div>
          ) : null}
        </div>
      )}

      {additionalQuestions.length > 0 && (
        <div>
          <h3>Additional Questions</h3>
          {additionalQuestions.map((question, index) => (
            <div key={index}>
              <label>{question.label}</label>
              <input
                type={question.type}
                name={`additionalQuestion${index}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[`additionalQuestion${index}`] || ''}
              />
              {formik.touched[`additionalQuestion${index}`] && formik.errors[`additionalQuestion${index}`] ? (
                <div>{formik.errors[`additionalQuestion${index}`]}</div>
              ) : null}
            </div>
          ))}
        </div>
      )}

      <div>
        <label>Feedback</label>
        <textarea
          name="feedback"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.feedback}
        />
        {formik.touched.feedback && formik.errors.feedback ? (
          <div>{formik.errors.feedback}</div>
        ) : null}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default SurveyForm;
