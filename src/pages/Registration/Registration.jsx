import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { object, string, mixed } from 'yup';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { AlertDismissibleExample } from '../../components/AlertError/AlertError';
import { useNavigate } from "react-router-dom";

const schema = object().shape({
   email: string().email().required(),
   password: mixed().required(),
   passwordTwo: mixed().required(),
});


export const Registration = ({ handleUser }) => {
   const [error, setError] = useState(null)
   const auth = getAuth();
   const navigate = useNavigate();

   const handleCloseAlert = () => {
      setError(null)
   }

   const handleRegistration = (value, action) => {
      if (value.password !== value.passwordTwo) {
         return setError('The passwords are not identical!')
      }
      createUserWithEmailAndPassword(auth, value.email, value.password,)
         .then((userCredential) => {
            handleUser(userCredential.user);
            navigate('/trips')
         })
         .catch((error) => {
            setError(error.message);
         });
      action.resetForm()
   }

   return (
      <section className='login-form'>
         {error && <AlertDismissibleExample error={error} handleCloseAlert={handleCloseAlert} />}
         <div className='login-block'>
            <h1 className="text-white mb-5 text-center">Registration</h1>
            <Formik
               validationSchema={schema}
               onSubmit={handleRegistration}
               initialValues={{
                  email: '',
                  password: '',
                  passwordTwo: '',
               }}
            >
               {({
                  handleSubmit,
                  handleChange,
                  values,
                  touched,
                  isValid,
                  errors,
               }) => (
                  <Form className="bg-secondary text-white p-5 d-flex flex-column gap-4" noValidate onSubmit={handleSubmit}>
                     <Form.Group md="4" controlId="validationFormik01">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                           type="email"
                           name="email"
                           value={values.email}
                           onChange={handleChange}
                           isValid={touched.email && !errors.email}
                           isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                     </Form.Group>

                     <Form.Group controlId="validationFormik02">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                           type="password"
                           name="password"
                           value={values.password}
                           onChange={handleChange}
                           isValid={touched.password && !errors.password}
                           isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                     </Form.Group>

                     <Form.Group controlId="validationFormik03">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                           type="password"
                           name="passwordTwo"
                           value={values.passwordTwo}
                           onChange={handleChange}
                           isValid={touched.passwordTwo && !errors.passwordTwo}
                           isInvalid={!!errors.passwordTwo}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                     </Form.Group>
                     <Button type="submit">Send</Button>
                  </Form>
               )}
            </Formik>
         </div>
      </section>
   )
}