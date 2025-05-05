import { MailClient } from "./mailtrap.config.js";
import { VERIFICATION_EMAIL } from "./emailTemplates.js";
import { sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];

    try {
        const response = await MailClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL({ verificationCode: verificationToken, appName: 'Dev Bytes' }),
            category: "Email Verification"
        });

        console.log("Email sent successfully", response);
        return response;
    } catch (error) {
        console.error("Mail send failed", error);
        throw error;
    }
}