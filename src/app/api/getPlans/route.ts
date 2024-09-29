import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import { User } from 'next-auth'
import mongoose from "mongoose";

export async function GET() {
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

    try {
        const userPlans = await UserModel.aggregate([
            {
                $match: {
                    _id: userId,
                }
            },
            {
                $unwind: "$plans"
            },
            {
                $addFields: {
                    totalModules: { $size: "$plans.modules" }, // Count total modules
                    completedModules: {
                        $size: {
                            $filter: {
                                input: "$plans.modules",
                                as: "module",
                                cond: { $eq: ["$$module.isCompleted", true] } // Count completed modules
                            }
                        }
                    }
                }
            },
            {
                $addFields: {
                    percentageCompleted: {
                        $cond: {
                            if: { $gt: ["$totalModules", 0] }, // Avoid division by zero
                            then: { $multiply: [{ $divide: ["$completedModules", "$totalModules"] }, 100] },
                            else: 0
                        },
                    }
                }
            },
            {
                $addFields: {
                    "plans.isCompleted": {
                        $cond: {
                            if: { $eq: ["$totalModules", "$completedModules"] },
                            then: true,
                            else: false
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalModules: 1,
                    completedModules: 1,
                    percentageCompleted: 1,
                    plan: "$plans"
                }
            }
        ])
        if (!userPlans) {
            return Response.json({
                success: false,
                message: "User not found",
            },
                {
                    status: 404
                })
        }
 
        for (const plan of userPlans) {
            if (plan.percentageCompleted === 100) {
                await UserModel.findOneAndUpdate(
                    { _id: userId, "plans._id": plan.plan._id },
                    { $set: { "plans.$.isCompleted": true } },
                    { new: true }
                );
            }
            else {
                await UserModel.findOneAndUpdate(
                    { _id: userId, "plans._id": plan.plan._id },
                    { $set: { "plans.$.isCompleted": false } },
                    { new: true }
                );
            }
        }


        return Response.json({
            success: true,
            message: "User found",
            Plans: userPlans

        }, {
            status: 200
        })

    } catch (error) {
         console.error('error in get plans', error)
        return Response.json({
            success: false,
            message: "ERROR occur while getting palns",
        },
            {
                status: 500
            })
    }


}