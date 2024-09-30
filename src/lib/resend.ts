import VerificationEmail from '../../emails/VerificationEmail';
import { Resend } from 'resend';
import { ApiResponse } from '@/types/ApiResponse';
import axios from 'axios';

// const resend = new Resend(process.env.RESEND_API_KEY);
console.log("Resend API Key:", process.env.RESEND_API_KEY);
const BREVO_API_KEY = process.env.BREVO_API_KEY

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string,
): Promise<ApiResponse> {

    console.log("sending email to ->>", email)

    // try {
    //     const oned= await resend.emails.send({
    //         from: 'onboarding@resend.dev',
    //         to: [email],
    //         subject:' Verification code | PlanMaster',
    //         react: VerificationEmail({username,otp:verifyCode})
    //       }); 
    //       console.log(oned)
    //       return {
    //         success:true,
    //         message:" Verification email send successfully"
    //       }
    // } catch (EmailError) {
    //      console.error("error sending Verification email",EmailError);

    //     return {
    //         success:false,
    //         message:"error in sending Verification email"
    //     }


    // }
    try {

        const response = await axios.post(`https://api.brevo.com/v1/send`,
            {
                sender: { email: '7d0616001@smtp-brevo.com' }, // Sender email
                to: [{ email }], // Recipient email
                subject: ' Verification code | PlanMaster', // Subject
                htmlContent: VerificationEmail({username,otp:verifyCode}), // HTML content
            },
            {
                headers: {
                    'api-key': BREVO_API_KEY,
                    'Content-Type': 'application/json',
                },
            })
        console.log(response)
        return {
            success: true,
            message: " Verification email send successfully"
        }

    } catch (error) {
        console.error("error sending Verification email", error);

        return {
            success: false,
            message: " Email sending failed"
        }
    }

}
