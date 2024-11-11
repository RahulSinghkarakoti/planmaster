import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import mongoose from "mongoose";
import { generatePlan } from "@/lib/generatePlan";

export async function POST(request: Request) { //user will send task in request body and return the newPlanId after saving it in DB
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

    const userId = new mongoose.Types.ObjectId(user._id)
    const { task,selectedLevel } = await request.json()
    //console.log(task)
    const newPlan = await generatePlan(task,selectedLevel)
    try {
        // console.log(newPlan)
        //console.log(typeof newPlan)
        // console.log(newPlan.title === 'Invalid')
        if (newPlan.title === 'Invalid')
            return Response.json({
                success: false,
                message: "Invalid prompt",
                newPlanId: newPlan._id
                // newPlanId: "new plan "
            },
                {
                    status: 400
                })

        const updatedUser = await UserModel.findByIdAndUpdate(userId, {
            $push: { plans: newPlan }
        }, { new: true });
        //console.log(updatedUser)
        if (!updatedUser)
            return Response.json({
                success: false,
                message: "Failed to update user plans",
            },
                {
                    status: 500
                })

        return Response.json({
            success: true,
            message: "Plan  generated and added to user plans",
            newPlanId: newPlan._id
            // newPlanId: "new plan "
        },
            {
                status: 201
            })

    } catch (error) {
        console.error("error updating plan", error)

        return Response.json({
            success: false,
            message: "Error updating plans",
        },
            {
                status: 500
            })

    }
}