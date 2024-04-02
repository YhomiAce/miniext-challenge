import { RecaptchaVerifier } from "firebase/auth";

export type SignupWithPhoneForm = {
    phoneNumber: string;
    recaptcha: RecaptchaVerifier | null;
    recaptchaResolved: boolean;
};