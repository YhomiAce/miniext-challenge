import {
    loginWithEmail,
    useIsLoginWithEmailLoading,
    verifyWithEmail,
} from '@/components/redux/auth/loginWithEmail';
import { useAppDispatch } from '@/components/redux/store';
import { LoadingStateTypes } from '@/components/redux/types';
import { useAuth } from '@/components/useAuth';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { isEmail } from 'validator';


export default function useVefiryWithEmail() {
    const dispatch = useAppDispatch();
    const auth = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disableSubmit, setDisableSubmit] = useState(true);
    const isLoading = useIsLoginWithEmailLoading();

    useEffect(() => {
        if (isEmail(email) && password.length >= 6) {
            setDisableSubmit(false);
        } else {
            setDisableSubmit(true);
        }
    }, [email, password]);

    // Signup with email and password and redirecting to home page
    const signUpWithEmail = useCallback(async () => {
        if (auth.type === LoadingStateTypes.LOADED) {
            // verify the user email before signup
            dispatch(
                verifyWithEmail({
                    type: 'verify',
                    email,
                    password,
                    user: auth.user,
                    callback: (result) => {
                        if (result.type === 'error') {
                            return;
                        }
                        // needed to reload auth user
                        router.refresh();
                    },
                })
            );
        }
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [email, password, dispatch]);

    return {
        email,
        setEmail,
        password,
        setPassword,
        signUpWithEmail,
        disableSubmit,
        isLoading,
    };
}
