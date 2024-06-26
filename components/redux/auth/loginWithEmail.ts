import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    EmailAuthProvider,
    User,
    createUserWithEmailAndPassword,
    linkWithCredential,
    signInWithEmailAndPassword,
    updatePassword,
    verifyBeforeUpdateEmail,
} from 'firebase/auth';
import { firebaseAuth } from '@/components/firebase/firebaseAuth';
import { getFriendlyMessageFromFirebaseErrorCode } from './helpers';
import { showToast } from '../toast/toastSlice';
import isEmail from 'validator/lib/isEmail';
import { useAppSelector } from '../store';

export const loginWithEmail = createAsyncThunk(
    'login',
    async (args: { type: 'login' | 'sign-up'; email: string; password: string }, { dispatch }) => {
        try {
            if (!isEmail(args.email)) {
                dispatch(
                    showToast({
                        message: 'Enter a valid email',
                        type: 'info',
                    })
                );
                return;
            }
            if (args.password.length < 6) {
                dispatch(
                    showToast({
                        message: 'Password should be atleast 6 characters',
                        type: 'info',
                    })
                );
                return;
            }

            if (args.type === 'sign-up') {
                await createUserWithEmailAndPassword(firebaseAuth, args.email, args.password);
            }

            await signInWithEmailAndPassword(firebaseAuth, args.email, args.password);
        } catch (e: any) {
            dispatch(
                showToast({
                    message: getFriendlyMessageFromFirebaseErrorCode(e.code),
                    type: 'error',
                })
            );
        }
    }
);

export const useIsLoginWithEmailLoading = () => {
    const loading = useAppSelector((state) => state.loading.loginWithEmail);
    return loading;
};

export const verifyWithEmail = createAsyncThunk(
    'verify',
    async (
        args: {
            type: 'verify';
            email: string;
            password: string;
            user: User;
            callback: (
                args:
                    | { type: 'success' }
                    | {
                          type: 'error';
                          message: string;
                      }
            ) => void;
        },
        { dispatch }
    ) => {
        try {
            if (!isEmail(args.email)) {
                dispatch(
                    showToast({
                        message: 'Enter a valid email',
                        type: 'info',
                    })
                );
                return;
            }
            if (args.password.length < 6) {
                dispatch(
                    showToast({
                        message: 'Password should be atleast 6 characters',
                        type: 'info',
                    })
                );
                return;
            }
            // Requires Email Verification
            // await updatePassword(args.user, args.password);
            // await verifyBeforeUpdateEmail(args.user, args.email);

            /*
                NOTE: Can be used if
                Email enumeration protection is unchecked in firebase
                Authentication/settings/User actions

            **/
            const credential = EmailAuthProvider.credential(args.email, args.password);
            await linkWithCredential(args.user, credential);
            firebaseAuth.currentUser?.reload();
            dispatch(
                showToast({
                    message: 'Logged in Successfully',
                    type: 'success',
                })
            );
            args.callback({ type: 'success' });
        } catch (e: any) {
            dispatch(
                showToast({
                    message: getFriendlyMessageFromFirebaseErrorCode(e.code),
                    type: 'error',
                })
            );
        }
    }
);

export const useIsVerifyWithEmailLoading = () => {
    const loading = useAppSelector((state) => state.loading.loginWithEmail);
    return loading;
};
