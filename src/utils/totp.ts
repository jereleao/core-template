import { isoBase64URL } from "@simplewebauthn/server/helpers";
import { generateSecret, generateURI, verify } from "otplib";
import QRCode from "qrcode";
import { env } from "~/env";

export const generateTwoFactorSecret = (userEmail: string) => {
  const secret = generateSecret();
  const serviceName = env.APPLICATION_NAME;

  const otpAuthUrl = generateURI({
    issuer: serviceName,
    label: userEmail,
    secret,
  });

  return { secret, otpAuthUrl };
};

export const generateQRCode = async (otpAuthUrl: string) => {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(otpAuthUrl);

    return qrCodeDataUrl;
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw error;
  }
};

export const verifyToken = (token: string, secret: string) => {
  try {
    return verify({ token, secret });
  } catch (error) {
    console.error("Error verifying token:", error);
    return false;
  }
};
