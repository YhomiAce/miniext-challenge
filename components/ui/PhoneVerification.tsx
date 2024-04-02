/* eslint-disable @next/next/no-img-element */
import { RecaptchaVerifier } from 'firebase/auth';
import { firebaseAuth } from '@/components/firebase/firebaseAuth';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Modal from '@/components/ui/Modal';
import { useRouter } from 'next/navigation';
import ToastBox from '@/components/ui/ToastBox';
import { useAppDispatch } from '@/components/redux/store';
import { showToast } from '@/components/redux/toast/toastSlice';
import Input from '@/components/ui/Input';
import LoadingButton from '@/components/ui/LoadingButton';
import Logout from './Logout';
import { useAuth } from '../useAuth';
import { LoadingStateTypes } from '../redux/types';
import {
    useVerifyPhoneNumberLoading,
    verifyPhoneNumber,
} from '../redux/auth/verifyPhoneNumber';
import { SignupWithPhoneForm } from '@/types/SignupWithPhoneForm';

export type PhoneVerificationProps = {
    handleSubmit: (formData: SignupWithPhoneForm) => Promise<void>;
    loading: boolean;
    loadingText: string;
    buttonText: string;
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    recaptchaResolved: boolean;
    setRecaptchaResolved: Dispatch<SetStateAction<boolean>>;
    verificationId: string;
    isSignup: boolean;
};

const PhoneVerification = (props: PhoneVerificationProps) => {
    const {
        buttonText,
        handleSubmit,
        loading,
        loadingText,
        recaptchaResolved,
        setRecaptchaResolved,
        setShow,
        show,
        verificationId,
        isSignup
    } = props;

    const dispatch = useAppDispatch();
    const auth = useAuth();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [OTPCode, setOTPCode] = useState('');

    const verifyPhoneNumberLoading = useVerifyPhoneNumberLoading();

    const [recaptcha, setRecaptcha] = useState<RecaptchaVerifier | null>(null);
    const router = useRouter();

    // Validating the filled OTP by user
    const ValidateOtp = async () => {
        
        if (!isSignup && auth.type !== LoadingStateTypes.LOADED) {
            return;
        }
        dispatch(
            verifyPhoneNumber({
                auth,
                OTPCode,
                verificationId,
                isSignup,
                callback: (result) => {
                    if (result.type === 'error') {
                        return;
                    }
                    // needed to reload auth user
                    router.refresh();
                },
            })
        );
    };

    // generating the recaptcha on page render
    useEffect(() => {
        const captcha = new RecaptchaVerifier(firebaseAuth, 'recaptcha-container', {
            size: 'normal',
            callback: () => {                
                setRecaptchaResolved(true);
            },

            'expired-callback': () => {
                setRecaptchaResolved(false);
                dispatch(
                    showToast({
                        message: 'Recaptcha Expired, please verify it again',
                        type: 'info',
                    })
                );
            },
        });

        captcha.render();

        setRecaptcha(captcha);
    }, []);

    const onSubmit = async () => {
        await handleSubmit({
            phoneNumber,
            recaptcha,
            recaptchaResolved,
        });
    };

    return (
        <div className="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <img
                        className="w-auto h-12 mx-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="max-w-xl w-full rounded overflow-hidden shadow-lg py-2 px-4">
                    <div className="px-4 flex p-4 pb-10 gap-4 flex-col">
                        <Input
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="phone number"
                            type="text"
                        />
                        <LoadingButton
                            onClick={onSubmit}
                            loading={loading}
                            loadingText={loadingText}
                        >
                            {buttonText}
                        </LoadingButton>
                    </div>
                    <div id="recaptcha-container" />
                    {auth.type === LoadingStateTypes.LOADED && auth.user != null && (
                        <div className="flex w-full flex-col">
                            <Logout />
                        </div>
                    )}

                    <Modal show={show} setShow={setShow}>
                        <div className="max-w-xl w-full bg-white py-6 rounded-lg">
                            <h2 className="text-lg font-semibold text-center mb-10">
                                Enter Code to Verify
                            </h2>
                            <div className="px-4 flex items-center gap-4 pb-10">
                                <Input
                                    value={OTPCode}
                                    type="text"
                                    placeholder="Enter your OTP"
                                    onChange={(e) => setOTPCode(e.target.value)}
                                />

                                <LoadingButton
                                    onClick={ValidateOtp}
                                    loading={verifyPhoneNumberLoading}
                                    loadingText="Verifying..."
                                >
                                    Verify
                                </LoadingButton>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
            <ToastBox />
        </div>
    );
};

export default PhoneVerification;
