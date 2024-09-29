import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import mongoose from "mongoose";

export async function DELETE(request: Request) {
    await dbConnect()
    const session = await getServerSession(authOptions)
    const user: User = session?.user as User
    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "You are not logged in",
        },
            {
                status: 401
            })
    }
    const { searchParams } = new URL(request.url)
    const planId = searchParams.get("planId")
    //console.log(planId)
    const userId = new mongoose.Types.ObjectId(user._id)
    try {

        const updatedUser = await UserModel.findOneAndUpdate(userId, { $pull: { plans: { _id: planId } } }, { new: true });
       
        if (!updatedUser) {
            return Response.json({
                success: false,
                message: "User not found",
            },
                {
                    status: 404
                })
        }
        //console.log(updatedUser)

        return Response.json({
            success: true,
            message: "Plan deleted successfully",
        },
            {
                status: 200
            })

    } catch (error) {
        console.error("error deleting plan",error)
        return Response.json({
            success: false,
            message: "Error deleting plan",
        },
            {
                status: 500
            })
    }

}