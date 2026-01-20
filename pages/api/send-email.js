import axios from "axios";

const ipRequests = new Map();

const HONEYPOT_FIELD = "website_url";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

    const now = Date.now();
    const timeLimit = 1440 * 60 * 1000; // 1 day
    const emailLimit = 2;

    if (!ipRequests.has(ip)) {
        ipRequests.set(ip, []);
    }

    let timestamps = ipRequests.get(ip);
    timestamps = timestamps.filter((timestamp) => now - timestamp < timeLimit);

    if (timestamps.length >= emailLimit) {
        ipRequests.set(ip, timestamps);
        return res.status(429).json({ message: "Sorry, you can only email me 2 times per day" });
    }

    timestamps.push(now);
    ipRequests.set(ip, timestamps);

    const { name, email, subject, message, [HONEYPOT_FIELD]: honeypot } = req.body;

    if (honeypot) {
        console.warn(`Honeypot triggered by IP: ${ip}`);
        return res.status(200).json({ message: "Successfully sent email" });
    }
    
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    if (!isValidEmail) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    try {
        const response = await axios.post("https://api.emailjs.com/api/v1.0/email/send", {
            service_id: process.env.EMAILJS_SERVICE_ID,
            template_id: process.env.EMAILJS_TEMPLATE_ID,
            user_id: process.env.EMAILJS_PUBLIC_KEY,
            template_params: { name, email, subject, message }
        });

        return res.status(200).json({ message: "Successfully sent email", data: response.data });
    
    } catch (error) {
        console.error("Error in sending email:", error.response?.data || error);
        return res.status(500).json({ message: "Failed to send email", error: error.response?.data || error.message });
    }
}