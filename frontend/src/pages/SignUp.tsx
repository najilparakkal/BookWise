import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { auth, signInWithPopup, provider } from '../firebase/firebase';
import { useDispatch } from 'react-redux';
import { signupUser } from '../api/UserSlice';
import { AppDispatch } from '../app/Store';
import { useNavigate } from 'react-router-dom';
import SignIn from './SignIn';
import { FaGoogle } from "react-icons/fa";


const SignUp: React.FC = () => {
  const [showSignIn, setShowSignIn] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const handleSwitch = () => {
    setShowSignIn(!showSignIn);

  };

  const validationSchema = Yup.object({
    userName: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const values = {
        userName: user.displayName||"" ,
        email: user.email ||"",
        password: user.uid,
      }
      await toast.promise(
        dispatch(signupUser(values)).unwrap(),
        {
          loading: 'Signing up...',
          success: 'Sign-up successful!',
          error: (err) => {
            if (err == 'User already exists') {
              return 'User already exists';
            }
            return 'Sign-up failed. Try again.';
          },
        }
      );

      navigate("/home");
    } catch (error: any) {
      console.error('Error during Google Sign Up:', error);
      toast.error('Google Sign-Up failed. Please try again.');
    }
  };
  const handleSubmit = async (
    values: { email: string; password: string; userName: string },
    { resetForm }: any
  ) => {
    try {
      await toast.promise(
        dispatch(signupUser(values)).unwrap(),
        {
          loading: 'Signing up...',
          success: 'Sign-up successful!',
          error: (err) => {
            if (err == 'User already exists') {
              return 'User already exists';
            }
            return 'Sign-up failed. Try again.';
          },
        }
      );

      resetForm();
      navigate("/home");
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };



  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {showSignIn ? (
        <SignIn />
      ) : (
        <div className="w-auto p-6 sm:p-12 h-screen bg-black"  >
          <div className="flex flex-col items-center mt-11">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900"> Sign up</h1>
              <p className="text-[12px] text-gray-500">                Hey, signi UP to Enter PDF Plate
              </p>
            </div>

            <div className="w-full flex-1 mt-4">
              <Formik
                initialValues={{ userName: '', email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {() => (
                  <Form className="mx-auto max-w-xs flex flex-col gap-4 ">
                    {/* Input Fields */}
                    <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Name
                      </label>
                      <Field
                        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="text"
                        name="userName"
                      />
                      <ErrorMessage name="userName" component="div" className="text-red-600 text-xs" />
                    </div>

                    <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email Address

                      </label>
                      <Field
                        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="email"
                        name="email"
                      />
                      <ErrorMessage name="email" component="div" className="text-red-600 text-xs" />
                    </div>

                    <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                      </label>
                      <Field
                        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="password"
                        name="password"
                        
                      />
                      <ErrorMessage name="password" component="div" className="text-red-600 text-xs" />
                    </div>

                    {/* Sign Up Button */}
                    <button
                      type="submit"
                      className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
                    >
                      <span className="ml-3">Sign Up</span>
                    </button>

                    {/* Google Sign Up Button */}
                    <button
                      type="button"
                      onClick={handleGoogleSignUp}
                      className="bg-red-600 text-white font-bold py-2 px-4 w-full rounded hover:bg-red-500 flex items-center justify-center"
                    >
                     <FaGoogle />

                      <span className="ml-3">Sign Up with Google</span>
                    </button>

                    <p className="mt-6 text-xs text-gray-600 text-center">
                      Already have an account?{' '}
                      <span className="text-blue-900 font-semibold" onClick={handleSwitch}>
                        Sign in
                      </span>
                    </p>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
