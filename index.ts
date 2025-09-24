import app from "./app";
import dotenv from "dotenv";
import cron from "node-cron";
import prisma from "./src/utils/prisma";
import { sendEmail } from "./src/utils/email";

dotenv.config();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});

// ✅ Test endpoint to send a test email via Postman
app.get("/send-test-email", async (req, res) => {
  try {
    await sendEmail(
      "slewisidc230004@gmail.com", // 👈 replace with your real email to test
      "📩 Test Email from EdPlanner",
      "This is a plain text test email",
      "<p><b>This is a test email</b> from EdPlanner 🚀</p>"
    );
    res.json({ message: "✅ Test email sent! Check your inbox." });
  } catch (err) {
    console.error("Error sending test email:", err);
    res.status(500).json({ error: "❌ Failed to send email" });
  }
});

// ✅ Cron job runs every minute for reminders
cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();
    const inOneMinute = new Date(now.getTime() + 60_000);

    const reminders = await prisma.reminder.findMany({
      where: { remindAt: { gte: now, lt: inOneMinute } },
      include: { user: true, task: true },
    });

    for (const r of reminders) {
      const subject = `⏰ Reminder: ${r.title}`;

      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #4CAF50;">📌 Reminder from EdPlanner</h2>
          <p>Hi <strong>${r.user.name || "there"}</strong>,</p>
          <p>This is a friendly reminder for your task:</p>
          <div style="padding: 10px; background: #f9f9f9; border-left: 4px solid #4CAF50;">
            <p><strong>${r.task?.title || "General Reminder"}</strong></p>
            <p><em>${r.title}</em></p>
            <p><b>Due at:</b> ${r.remindAt.toLocaleString()}</p>
          </div>
          <p style="margin-top: 20px;">Stay productive 💪</p>
          <footer style="font-size: 12px; color: #666; margin-top: 30px; text-align: center;">
            © ${new Date().getFullYear()} EdPlanner
          </footer>
        </div>
      `;

      console.log(`[REMINDER] ${r.title} — user: ${r.user.email}`);

      // ✅ Send reminder email
      await sendEmail(r.user.email, subject, "", html);
    }
  } catch (err) {
    console.error("Error in reminder cron:", err);
  }
});
