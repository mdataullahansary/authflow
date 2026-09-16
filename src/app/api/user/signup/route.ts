import {connect} from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";



export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {name, username , email, password} = reqBody;

    const userExist = await User.findOne({email})
    if(userExist){
        return NextResponse.json({
            error : "User already exists"
        } , {status: 400})
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password , salt);

    const newUser = new User({
        name,
        username,
        email,
        password : hashedPassword
    })

    const savedUser = await newUser.save();
    console.log(savedUser);
    return NextResponse.json({
        message : "User created successfully",
        success : true,
        savedUser
    } , {status: 200})

        
    } catch (error : any) {
        console.log(error.message)
        return NextResponse.json({
            error : error.message
        } , {status: 500})
    }
}

connect();


