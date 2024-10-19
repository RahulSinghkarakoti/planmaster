import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { getServerSession, User } from 'next-auth'
import { authOptions } from "../auth/[...nextauth]/option";
import mongoose from "mongoose";


export async function GET(request: Request) {
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
    const PlanId = searchParams.get('PlanId')
    // console.log(PlanId)

    const userId = new mongoose.Types.ObjectId(user._id)

    try {

        const plan = await UserModel.aggregate([
            {
                $match: {
                    _id: userId,
                    isVerified: true,
                }
            },
            {
                $unwind: "$plans"
            },
            {
                $match: {
                    "plans._id": PlanId
                }
            }, {
                $addFields: {
                    "planId": '$plans._id',
                    "planTitle": '$plans.title',
                    "planIsCompleted": '$plans.isCompleted',
                    "modules":"$plans.modules"
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    planId: 1,
                    planTitle: 1,
                    planIsCompleted: 1,
                    modules:1
                }
            }
        ])
        if (!plan) {
            return Response.json({
                success: false,
                message: "Plan not found",
            },
                {
                    status: 404
                })

        }
//  console.log(plan)

        return Response.json({
            success: true,
            message: "Plan found",
            plan: plan,
        },
            {
                status: 200
            })

    } catch (error) {
        console.error("error in get plan by  id", error)
        return Response.json({
            success: false,
            message: "error occur during Plan Fetching",
        },
            {
                status: 500
            })

    }

}