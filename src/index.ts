import app from "./app";
import dotenv from "dotenv";
import cron from "node-cron";
import prisma from "./utils/prisma";

dotenv.config();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});

// Cron job runs every minute
cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();
    const inOneMinute = new Date(now.getTime() + 60_000);

    const reminders = await prisma.reminder.findMany({
      where: { remindAt: { gte: now, lt: inOneMinute } },
      include: { user: true, task: true },
    });

    for (const r of reminders) {
      console.log(`[REMINDER] ${r.title} — user: ${r.user.email}`);
    }
  } catch (err) {
    console.error("Error in reminder cron:", err);
  }
});
