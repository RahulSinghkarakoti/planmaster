import dbConnect from "@/lib/dbConnect";
import { sendVerificationEmail } from "@/lib/resend";
import UserModel from "@/models/User.model";
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { email, password, username } = await request.json()
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username, isVerified: true
        })
        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: 'username already exist'
            },
                {
                    status: 400
                }
            )
        }

        const existingUsernameByEmail = await UserModel.findOne({ email })
        const verifyCode = Math.floor(Math.random() * 1000000).toString();

        if (existingUsernameByEmail) {
            if(existingUsernameByEmail.isVerified)
            {
                return Response.json({
                    success: false,
                    message: 'user already exist with this email'
                },{status:400})
            }
            else{
                const hashedPassword = await bcrypt.hash(password, 10)
                existingUsernameByEmail.password=hashedPassword
                existingUsernameByEmail.verification_code = verifyCode
                existingUsernameByEmail.verification_CodeExpiry = new Date(Date.now()+36000)
                await existingUsernameByEmail.save()

            }

        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                isVerified: false,
                verification_code: verifyCode,
                verification_CodeExpiry: expiryDate,
                plans: []
            })

            await newUser.save()
            //console.log(newUser)
        }

        //send verification email
        // console.log(verifyCode)
        const emailResponse = await sendVerificationEmail(email, username, verifyCode);
        // console.log(emailResponse)
        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message,
            }, {
                status: 500
            }
            )
        }

        return Response.json({
            success: true,
            message: "User registered successfully. Please verify your account."
        },
            {
                status: 201
            }
        )

    } catch (error) {
         console.error("error occur during sign-Up",error);
        return Response.json({
            success: false,
            message: "Failed to register user",
        }, {
            status: 500
        }
        );

    }
}

