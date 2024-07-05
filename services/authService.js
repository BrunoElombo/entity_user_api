const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const { sendOtpEmail } = require("../services/emailNotification")

const { PrismaClient } = require('@prisma/client');
const config = require('../config/config');

const prisma = new PrismaClient();


/**
 * Login user
 */
exports.login = async (data) => {
  const { username, password } = data;
  try {
    let user = await prisma.user.findUnique({
      where:{
        name: username
      }
    });
    if(!user || !bcrypt.compare(password, user.password)) return ({error: "Invalid credentials"});
    const token = jwt.sign({id: user.id}, config.jwtSecret, {expiresIn: '1h'});
    return token;
  } catch (error) {
    return error
  }
}

/**
 * Change password
 */
exports.changePassword = async (id, data) =>{
  let { password, newPassword } = data;
  let user = await prisma.user.findUnique({
    where:{id: id, is_active: true}
  });

  if(password !== newPassword) throw new Error("New password does not match previous password");
  if(!user || !bcrypt.compare(password, user.password)) throw new Error("Invalid credentials");

  const updatePassword = await prisma.user.update({
    where:{id: id},
    data:{
      password: newPassword
    }
  })

  return updatePassword
}

/**
 * send OTP to User through mail
 */
exports.sendOTP = async (data) => {
  const { email } = data;
  const otp = generateOtp();
  const hashedOtp = await hashOtp(otp);
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiration

  await prisma.user.update({
    where: { email },
    data: { otp: hashedOtp, otpExpires }
  });

  const sentMail = await sendOtpEmail(email, otp);
  return sentMail;
}


/**
 * Reset the password
 */
exports.resetPassword = async (id, data) =>{
  const { otp, newPassword, confirmPassword } = data;
  if (newPassword != confirmPassword) throw new Error('Password and confirm password should be the same');
  
  if (!user) throw new Error('User not found');

  if (user.otpExpires < new Date()) throw new Error('OTP has expired');

  const isOtpValid = await verifyOtp(otp, user.otp);
  if (!isOtpValid) throw new Error('Invalid OTP');

  const userPassword = await prisma.user.update({
    where:{id :id},
    data:{
      password: newPassword
    }
  });

  return userPassword;
}


/**
 * Generate the one time password
 */
const generateOtp = () => {
  return otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false
  });
};

/**
 * Check has One time password
 */
const hashOtp = async (otp) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(otp, salt);
};

/**
 * Compare one time password
 */
const verifyOtp = async (otp, hashedOtp) => {
  return await bcrypt.compare(otp, hashedOtp);
};