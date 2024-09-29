import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import mongoose from "mongoose";

export async function POST(request: Request) {

    //console.log("in toggle module")
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
    const moduleId = searchParams.get("moduleId")
    const planId = searchParams.get("planId")
    //console.log("planId", planId)
    //console.log("module", moduleId)
    const userId = new mongoose.Types.ObjectId(user._id)
    try {
        const user = await UserModel.findById(userId)
        if (!user)
            return Response.json({
                success: false,
                message: "User not found",
            },
                {
                    status: 404
                })

        const plan = user?.plans.find(p => p._id === planId)
        if (!plan)
            return Response.json({
                success: false,
                message: "Plan not found",
            },
                {
                    status: 404
                })

        const module_single = plan.modules.find((m) => m._id === moduleId);
        if (!module_single)
            return Response.json({
                success: false,
                message: "Module not found",
            },
                {
                    status: 404
                })

                module_single.isCompleted = !module_single.isCompleted;
        const result = await user?.save() 
        return Response.json({

            success: true,
            message: "module toggled successsfull",
            data: result
        },
            {
                status: 200
            })
    } catch (error) {
         console.error("error occur during module toggle", error);
        return Response.json({
            success: false,
            message: "Failed to toggle module",
        }, {
            status: 500
        }
        );

    }

}