import React, { Dispatch, SetStateAction } from 'react';
import Input from './Input';
import LoadingButton from './LoadingButton';

export type SignupWithEmailProps = {
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
    isLoading: boolean;
    disableSubmit: boolean;
    handleSubmit: () => void;
};

const SignupWithEmail = (props: SignupWithEmailProps) => {
    const { email, setEmail, setPassword, password, isLoading, disableSubmit, handleSubmit } =
        props;
    return (
        <>
            <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                name="email"
                type="text"
            />
            <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                name="password"
                type="password"
            />
            <LoadingButton onClick={handleSubmit} disabled={disableSubmit} loading={isLoading}>
                Sign Up
            </LoadingButton>
        </>
    );
};

export default SignupWithEmail;
