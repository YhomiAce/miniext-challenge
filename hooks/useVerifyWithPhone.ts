import { getAuth } from 'firebase/auth';
import { useAppDispatch } from '@/components/redux/store';
import { useState } from 'react';
import { sendVerificationCode, useSendVerificationCodeLoading } from '@/components/redux/auth/verifyPhoneNumber';
import { SignupWithPhoneForm } from '@/types/SignupWithPhoneForm';
import { LoadingStateTypes } from '@/components/redux/types';
import { useAuth } from '@/components/useAuth';

const auth = getAuth();


export default function useVerifyWithPhone() {
    const auth = useAuth();
    const dispatch = useAppDispatch();
    const loading = useSendVerificationCodeLoading();
    const [show, setShow] = useState(false);
    const [recaptchaResolved, setRecaptchaResolved] = useState(false);
    const [verificationId, setVerificationId] = useState('');

    // Sending OTP and storing id to verify it later
    const handleSendVerification = async (formData: SignupWithPhoneForm) => {
        if (auth.type !== LoadingStateTypes.LOADED) return;

        dispatch(
            sendVerificationCode({
                auth,
                ...formData,
                callback: (result) => {
                    if (result.type === 'error') {
                        setRecaptchaResolved(false);
                        return;
                    }
                    setVerificationId(result.verificationId);
                    setShow(true);
                },
            })
        );
    };


    return {
        handleSendVerification,
        loading,
        setRecaptchaResolved,
        recaptchaResolved,
        show,
        setShow,
        verificationId
    };
}
