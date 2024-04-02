import { useState } from 'react';
import Modal from './Modal';
import LoadingButton from './LoadingButton';
import LoginWithGoogleButton from './LoginWithGoogleButton';
import useSignupWithEmail from '@/hooks/useSignupWithEmail';
import PhoneVerification from './PhoneVerification';
import useSignupWithPhone from '@/hooks/useSignupWithPhone';
import SignupWithEmail from './SignupWithEmail';

interface SignUpModalProps {
    open: boolean;
    setOpen: (show: boolean) => void;
}
const SignUpModal = (props: SignUpModalProps) => {
    const [isPhone, setIsPhone] = useState(false);

    // Signup With Email Logic
    const { signUpWithEmail, email, setEmail, isLoading, password, setPassword, disableSubmit } =
        useSignupWithEmail();

     // Signup With Phone Logic
    const {
        signupWithPhoneNumber,
        loading,
        recaptchaResolved,
        setRecaptchaResolved,
        setShow,
        show,
        verificationId,
    } = useSignupWithPhone();

    // Toggle between signup with phone and email
    const switchSignupMethod = () => {
        setIsPhone(!isPhone);
        setEmail('');
    };

    return (
        <Modal show={props.open} setShow={props.setOpen}>
            <div className="max-w-md w-full bg-white py-6 rounded-lg">
                <h2 className="text-lg font-semibold text-center mb-10">Sign Up</h2>
                <div className="px-4 flex p-4 pb-10 gap-4 flex-col">
                    {isPhone ? (
                        <PhoneVerification
                            handleSubmit={signupWithPhoneNumber}
                            loading={loading}
                            loadingText="Signing up..."
                            buttonText="Signup"
                            setRecaptchaResolved={setRecaptchaResolved}
                            recaptchaResolved={recaptchaResolved}
                            show={show}
                            setShow={setShow}
                            verificationId={verificationId}
                            isSignup={true}
                        />
                    ) : (
                        <SignupWithEmail
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            disableSubmit={disableSubmit}
                            isLoading={isLoading}
                            handleSubmit={signUpWithEmail}
                        />
                    )}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">Or sign up with</span>
                        </div>
                    </div>
                    <div className="mt-2 grid grid-cols-1 gap-3">
                        <LoadingButton onClick={switchSignupMethod}>
                            Sign Up With {isPhone ? 'Email' : 'Phone number'}
                        </LoadingButton>
                    </div>
                    <div className="mt-2 grid grid-cols-1 gap-3">
                        <LoginWithGoogleButton />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default SignUpModal;
