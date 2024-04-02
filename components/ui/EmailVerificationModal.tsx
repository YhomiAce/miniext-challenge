import React from 'react';
import Modal from './Modal';
import SignupWithEmail from './SignupWithEmail';
import useVefiryWithEmail from '@/hooks/useVerifyWithEmail';
import Logout from './Logout';

interface EmailVerificationModalProps {
    open: boolean;
    setOpen: (show: boolean) => void;
}

const EmailVerificationModal = ({ open, setOpen }: EmailVerificationModalProps) => {
    const { signUpWithEmail, email, setEmail, isLoading, password, setPassword, disableSubmit } =
        useVefiryWithEmail();
    return (
        <Modal show={open} setShow={setOpen}>
            <div className="max-w-md w-full bg-white py-6 rounded-lg">
                <h2 className="text-lg font-semibold text-center mb-10">Sign Up</h2>
                <div className="px-4 flex p-4 pb-10 gap-4 flex-col">
                    <SignupWithEmail
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        disableSubmit={disableSubmit}
                        isLoading={isLoading}
                        handleSubmit={signUpWithEmail}
                    />
                <div className="flex w-full flex-col">
                    <Logout />
                </div>
                </div>
            </div>
        </Modal>
    );
};

export default EmailVerificationModal;
