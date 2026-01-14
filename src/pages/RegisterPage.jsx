import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { registerSchema } from '../utils/validators';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    // Remove confirmPassword before sending to API
    const { confirmPassword, ...userData } = data;
    
    try {
      const result = await registerUser(userData);
      
      if (result.success) {
        toast.success('Registration successful! Please login.');
        navigate('/login');
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextStep = async () => {
    let fieldsToValidate = [];
    
    if (step === 1) {
      fieldsToValidate = ['username', 'password', 'confirmPassword'];
    } else if (step === 2) {
      fieldsToValidate = ['fullName', 'email', 'phone'];
    }
    
    const isValid = await trigger(fieldsToValidate);
    
    if (isValid) {
      setStep(step + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-4 shadow-lg">
            <span className="text-white font-bold text-2xl">CB</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join CoreBank today</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8 space-x-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                s === step ? 'w-12 bg-primary-600' : s < step ? 'w-8 bg-primary-300' : 'w-8 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Credentials */}
            {step === 1 && (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Credentials</h2>
                
                <Input
                  label="Username"
                  type="text"
                  id="username"
                  placeholder="Choose a username"
                  {...register('username')}
                  error={errors.username?.message}
                  required
                />

                <Input
                  label="Password"
                  type="password"
                  id="password"
                  placeholder="Create a password"
                  {...register('password')}
                  error={errors.password?.message}
                  required
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  {...register('confirmPassword')}
                  error={errors.confirmPassword?.message}
                  required
                />

                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  onClick={handleNextStep}
                  className="w-full"
                >
                  Next
                </Button>
              </>
            )}

            {/* Step 2: Personal Info */}
            {step === 2 && (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
                
                <Input
                  label="Full Name"
                  type="text"
                  id="fullName"
                  placeholder="Enter your full name"
                  {...register('fullName')}
                  error={errors.fullName?.message}
                  required
                />

                <Input
                  label="Email"
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  {...register('email')}
                  error={errors.email?.message}
                  required
                />

                <Input
                  label="Phone"
                  type="tel"
                  id="phone"
                  placeholder="+1234567890 (optional)"
                  {...register('phone')}
                  error={errors.phone?.message}
                />

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    onClick={handleNextStep}
                    className="flex-1"
                  >
                    Next
                  </Button>
                </div>
              </>
            )}

            {/* Step 3: Optional KYC */}
            {step === 3 && (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Details (Optional)</h2>
                
                <Input
                  label="Address"
                  type="text"
                  id="address"
                  placeholder="Enter your address"
                  {...register('address')}
                  error={errors.address?.message}
                />

                <Input
                  label="ID Document Number"
                  type="text"
                  id="idDocumentNumber"
                  placeholder="Driver's license, passport, etc."
                  {...register('idDocumentNumber')}
                  error={errors.idDocumentNumber?.message}
                />

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    onClick={() => setStep(2)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="success"
                    size="lg"
                    disabled={isLoading}
                    className="flex-1"
                  >
                    {isLoading ? 'Creating Account...' : 'Complete Registration'}
                  </Button>
                </div>
              </>
            )}
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
