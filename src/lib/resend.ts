import VerificationEmail from '../../emails/VerificationEmail';
import { Resend } from 'resend';
import { ApiResponse } from '@/types/ApiResponse';

const resend = new Resend(process.env.RESEND_API_KEY);
console.log("Resend API Key:", process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string,
): Promise<ApiResponse> {

    console.log("sending email to ->>",email)
    try {
        const oned= await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: [email],
            subject:' Verification code | PlanMaster',
            react: VerificationEmail({username,otp:verifyCode})
          }); 
          console.log(oned)
          return {
            success:true,
            message:" Verification email send successfully"
          }
        
    } catch (EmailError) {
         console.error("error sending Verification email",EmailError);

        return {
            success:false,
            message:"error in sending Verification email"
        }
        
        
    }
}
