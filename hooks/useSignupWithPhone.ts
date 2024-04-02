import { getAuth } from 'firebase/auth';
import { useAppDispatch } from '@/components/redux/store';
import { useState } from 'react';
import {
    signUpWithPhoneNumber,
    useSignUpWithPhoneNumberCodeLoading,
} from '@/components/redux/auth/verifyPhoneNumber';
import { SignupWithPhoneForm } from '@/types/SignupWithPhoneForm';

const auth = getAuth();

export default function useSignupWithPhone() {
    const dispatch = useAppDispatch();
    const loading = useSignUpWithPhoneNumberCodeLoading();
    const [show, setShow] = useState(false);
    const [recaptchaResolved, setRecaptchaResolved] = useState(false);
    const [verificationId, setVerificationId] = useState('');

    const signupWithPhoneNumber = async (formData: SignupWithPhoneForm) => {
        dispatch(
            signUpWithPhoneNumber({
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
        signupWithPhoneNumber,
        loading,
        setRecaptchaResolved,
        recaptchaResolved,
        show,
        setShow,
        verificationId,
    };
}
