import mongoose, { Document, Schema } from "mongoose";

export interface Module extends Document {
  _id: string; 
  name: string;
  desc: string;
  add_info: string;
  isCompleted: boolean;
}

const ModuleSchema: Schema<Module> = new mongoose.Schema({
  _id: {
    type: String,  
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  add_info: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

export interface Plan extends Document {
  _id: string; 
  title: string;
  isCompleted: boolean;
  modules: Module[];
}

const PlanSchema: Schema<Plan> = new mongoose.Schema({
  _id: {
    type: String,  
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },

  modules: [ModuleSchema],
}, { timestamps: true });

export interface User extends Document {
  username: string;
  password: string;
  email: string;
  verification_code: string;
  verification_CodeExpiry: Date;
  isVerified: boolean;
  plans: Plan[];
}

const UserSchema: Schema<User> = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  password: {
    type: String,
    // required: [false, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email address"],
  },
  verification_code: {
    type: String,
    // required: [true, "verification code is required"],
  },
  verification_CodeExpiry: {
    type: Date,
    // required: [true, "verification code expiry is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  plans: [PlanSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
