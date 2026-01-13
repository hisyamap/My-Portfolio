import axios from "axios";
import emailLog from "../../backend/src/models/emailLog.js";
import { httpResponse } from "../../backend/src/lib/httpResponse.js";

const SEND_LIMIT_MINUTES = 60;

export default async function handler(req, res) {
    try {
        const { name, email, subject, message } = req.body;
        
        if (!name || !email || !subject || !message) {
            return httpResponse(400, "All fields are required", {}, res);
        }

        const ip = req.ip;

        const recent = await emailLog.findOne({
            $or: [{ email }, { ip }],
            createdAt: { $gte: new Date(Date.now() - SEND_LIMIT_MINUTES * 60 * 1000) }
        });

        if (recent) {
            const lastSentTime = new Date(recent.createdAt).getTime();
            const now = Date.now();
            const diffMinutes = Math.floor((now - lastSentTime) / (1000 * 60));
            const minutesLeft = SEND_LIMIT_MINUTES - diffMinutes;

            return httpResponse(420, `You must wait ${minutesLeft} more minute${minutesLeft === 1 ? '' : 's'} before sending another email`, {}, res);
        }

        const response = await axios.post("https://api.emailjs.com/api/v1.0/email/send", {
            service_id: process.env.EMAILJS_SERVICE_ID,
            template_id: process.env.EMAILJS_TEMPLATE_ID,
            user_id: process.env.EMAILJS_PUBLIC_KEY,
            template_params: { name, email, subject, message }
        });

        await emailLog.create({ email, ip });

        return httpResponse(200, `Successfully send an email`, { success: true, data: response.data }, res);
    
    } catch (error) {
        console.error("Error in sending email:", error.response?.data || error);
        return httpResponse(500, "Internal server error", {}, res)
    }
}