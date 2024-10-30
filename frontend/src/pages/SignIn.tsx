import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import SignUp from './SignUp';
import { auth, signInWithPopup, provider } from '../firebase/firebase';
import { Toaster, toast } from 'react-hot-toast';
import { signInUser } from '../api/UserSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/Store';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignIn: React.FC = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const handleSwitch = () => {
    setShowSignUp(!showSignUp);
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const values = {
        email: user.email || "",
        password: user.uid,
      };

      await toast.promise(
        dispatch(signInUser(values)).unwrap(),
        {
          loading: 'Signing up...',
          success: 'Sign-up successful!',
          error: (err) => {
            if (err.message  === 'Password is incorrect') {
              return 'Password is incorrect';
            }
            if (err.message  === 'User not found') {
              return 'User not found';
            }
            return 'Sign-up failed. Try again.';
          },
        }
      );

      navigate("/home");
    } catch (error: any) {
      console.error('Error during Google Sign-In:', error);
      toast.error('Google Sign-In failed. Please try again.');
    }
  };

  const handleSubmit = async (
    values: { email: string; password: string },
    { resetForm }: any
  ) => {
    try {
      await toast.promise(
        dispatch(signInUser(values)).unwrap(),
        {
          loading: 'Signing in...',
          success: 'Sign-in successful!',
          error: (err) => {
            if (err.message  === 'Password is incorrect') {
              return 'The password you entered is incorrect.';
            }
            if (err.message  === 'User not found') {
              return 'No user found with this email. ';
            }
            return 'Sign-in failed. Please try again.';
          },
        }
      );

      resetForm();
      navigate("/home");
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };




  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {showSignUp ? (
        <SignUp />
      ) : (
        <div className="flex items-center justify-center min-h-screen w-full px-3 sm:px-5 lg:px-0 bg-black"   >
        <div className="flex rounded-lg overflow-hidden max-w-sm w-full sm:w-3/4 lg:w-1/2">
          <div className="w-full p-5 sm:p-8">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                Sign In 
              </h1>
              <p className="text-[12px] text-gray-500">
                Hey, sign In to Enter PDF Plate
              </p>
            </div>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={SignInSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Email Address
                    </label>
                    <Field
                      name="email"
                      type="email"
                      className="w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
      
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Password
                    </label>
                    <Field
                      name="password"
                      type="password"
                      className="w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
      
                  <div className="mt-8">
                    <button
                      type="submit"
                      className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Signing In...' : 'Sign In'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
      
            <div className="mt-4">
              <button
                onClick={handleGoogleSignIn}
                className="bg-red-600 text-white font-bold py-2 px-4 w-full rounded hover:bg-red-500 flex items-center justify-center"
              >
                <FaGoogle />

                <span className="ml-3">Sign In with Google</span>
              </button>
            </div>
      
            <div className="mt-4 flex items-center w-full text-center">
              <span className="text-xs text-gray-500 capitalize w-full">
                Don't have an account?{' '}
                <span
                  className="text-blue-700 cursor-pointer"
                  onClick={handleSwitch}
                >
                  Sign Up
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      
      )}
    </>
  );
};

export default SignIn;
