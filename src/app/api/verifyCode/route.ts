import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";

export async function POST(request: Request) {
    await dbConnect()
    try {
        const { username, code } = await request.json()
        //console.log("code:",code)
        const user = await UserModel.findOne({ username })
        if (!user)
            return Response.json({
                success: false,
                message: 'user not found  '
            },
                {
                    status: 404
                }
            )

            const isCodeValid=user.verification_code === code
            //console.log("usercode:",user.verification_code)
            const isCodeNotExpired=new Date(user.verification_CodeExpiry) > new Date()
        if (isCodeValid && isCodeNotExpired ) {
            user.isVerified = true
            await user.save()

            return Response.json({
                success: true,
                message: 'user verified '
            },
                {
                    status: 200
                }
            )
        }
        else if(!isCodeNotExpired)
        {
            return Response.json({
                success: false,
                message: ' verification code is expired , please signup again to get new code'
            },
                {
                    status: 400
                }
            )
        }
        else{
            return Response.json({
                success: false,
                message: ' incorrect verification code '
            },
                {
                    status: 400
                }
            )
        }
    } catch (error) {
         console.error(error);
        return Response.json({
            success: false,
            message: 'error in verifying user  '
        },
            {
                status: 500
            }
        )


    }
}