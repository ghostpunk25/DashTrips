import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { object, string, mixed } from 'yup';
import { Link } from 'react-router-dom';
import {
   getAuth,
   signInWithEmailAndPassword,
   GoogleAuthProvider,
   signInWithPopup,
   FacebookAuthProvider,
   RecaptchaVerifier,
   signInWithPhoneNumber
} from "firebase/auth";
import { AlertDismissibleExample } from '../../components/AlertError/AlertError';
import { useState } from 'react';
import { BsFacebook, BsGoogle, BsPhoneFill } from "react-icons/bs";
import { ModalAuthPhone } from '../../components/ModalAuthPhone/ModalAuthPhone';

const schema = object().shape({
   email: string().email().required(),
   password: mixed().required(),
});

export const AuthLogin = ({ handleUser }) => {
   const [show, setShow] = useState(false);
   const [error, setError] = useState(null)
   const [phoneNumber, setPhoneNumber] = useState('');
   const [visibleForm, setVisibleForm] = useState(false)
   const [OTP, setOTP] = useState('');

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   const auth = getAuth();
   const providerGoogle = new GoogleAuthProvider();
   const providerFacebook = new FacebookAuthProvider();

   //PhoneNumber
   const handlePhoneNumber = nmber => {
      setPhoneNumber(nmber)
   }

   const requestOTP = e => {
      e.preventDefault();
      if (phoneNumber.length >= 12) {
         setVisibleForm(true)
         window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => { }
         }, auth);

         const appVerifier = window.recaptchaVerifier;

         signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
               window.confirmationResult = confirmationResult;
            }).catch((error) => {
               setError(error.message);
            });
      }
   }

   const verifyOTP = e => {
      let otp = e.target.value
      setOTP(otp)
      if (otp.length === 6) {
         window.confirmationResult.confirm(otp).then(result => {
            handleUser(result.user);
         }).catch((error) => {
            setError(error.message);
         });
      }
   }
   //////////////////////////////////////////////////

   const handleCloseAlert = () => {
      setError(null)
   }

   //EmailPassword
   const handleLogin = (value, action) => {
      signInWithEmailAndPassword(auth, value.email, value.password)
         .then((userCredential) => {
            if (userCredential.user) {
               handleUser(userCredential.user);
            }
         })
         .catch((error) => {
            setError(error.message)
         });
      action.resetForm()
   }

   //Google
   const handleLoginGoogle = () => {
      signInWithPopup(auth, providerGoogle)
         .then((result) => {
            handleUser(result.user);
         }).catch((error) => {
            setError(error.message)
         });
   }

   //Facebook
   const handleLoginFacebook = () => {
      signInWithPopup(auth, providerFacebook)
         .then((result) => {
            handleUser(result.user);
         })
         .catch((error) => {
            if (error.message === "Firebase: Error (auth/account-exists-with-different-credential).") {
               return setError('The user with this email is already registered. Try logging in using a different login method')
            }
            setError(error.message)
         });
   }

   return (
      <section className='login-form'>
         {error && <AlertDismissibleExample error={error} handleCloseAlert={handleCloseAlert} />}
         <ModalAuthPhone
            requestOTP={requestOTP}
            visibleForm={visibleForm}
            handlePhoneNumber={handlePhoneNumber}
            phoneNumber={phoneNumber}
            verifyOTP={verifyOTP}
            OTP={OTP}
            handleClose={handleClose}
            show={show}
         />
         <div className='login-block'>
            <h1 className="text-white mb-5 text-center">LOGIN</h1>
            <Formik
               validationSchema={schema}
               onSubmit={handleLogin}
               initialValues={{
                  email: '',
                  password: '',
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
                     <Button type="submit">Login</Button>
                     <div className='d-flex gap-4 fs-3 justify-content-center align-items-center pe-auto'>
                        <BsGoogle className='btn-login' onClick={handleLoginGoogle} />
                        <BsFacebook className='btn-login' onClick={handleLoginFacebook} />
                        <BsPhoneFill className='btn-login' onClick={handleShow} />
                     </div>
                     <Button as={Link} to='registration' variant="success">Registration</Button>
                  </Form>
               )}
            </Formik>
         </div>
      </section >
   )
}