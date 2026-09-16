import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

  const user = await User.findOne({email});
  if(!user){
    return NextResponse.json({
        error : "User not found"
    } , {status : 404})
  }

  //compare password
  const validPassword = await bcrypt.compare(password , user.password);
  if(!validPassword){
    return NextResponse.json({
        error : "Invalid password"
    } , {status : 401})
  }

  
  //create token 
  const tokenData = {
    id : user._id,
    email : user.email,
    username : user.username,
    }
    const token =  await jwt.sign(tokenData , process.env.TOKEN_SECRET! , {
        expiresIn : "1h"
    })

  const response = NextResponse.json({
      message: "Logged in successfully",
      success: true,
    });
    response.cookies.set("token" , token , {
        httpOnly : true,
    })

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
