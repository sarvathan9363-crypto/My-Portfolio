import nodemailer from "nodemailer";

// ── Lazy transporter factory (created per-send so env vars are always fresh)
const createTransporter = () => {
  const user = process.env.GMAIL_EMAIL;
  const pass = process.env.GMAIL_PASSWORD;

  if (!user || !pass) {
    throw new Error(
      `Missing email credentials. GMAIL_EMAIL=${user ? "SET" : "NOT SET"}, GMAIL_PASSWORD=${pass ? "SET" : "NOT SET"}`
    );
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
  });
};

// ── Helper: send mail as a proper Promise ─────────────────────
const sendMail = (transporter, mailOptions) =>
  new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) reject(error);
      else resolve(info);
    });
  });


// ════════════════════════════════════════════════════════════════
//  CONTACT SECTION EMAILS
// ════════════════════════════════════════════════════════════════

export const sendContactNotificationToOwner = async ({ name, email, projectType, message }) => {
  const transporter = createTransporter();

  await sendMail(transporter, {
    from: `"Portfolio Notifications" <${process.env.GMAIL_EMAIL}>`,
    to: process.env.OWNER_EMAIL || process.env.GMAIL_EMAIL,
    subject: `📬 New Contact Message from ${name}`,
    html: `
      <div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:auto;background:#0f0303;color:#e0e0e0;border-radius:12px;overflow:hidden;border:1px solid rgba(185,28,28,0.4);">
        <div style="background:linear-gradient(135deg,#7f1d1d,#991b1b);padding:28px 32px;">
          <h2 style="margin:0;color:#fff;font-size:20px;letter-spacing:0.05em;">New Contact Message</h2>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.6);font-size:13px;">Received via your portfolio website</p>
        </div>
        <div style="padding:28px 32px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:10px 0;color:rgba(212,175,55,0.8);font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;width:130px;">Name</td>
              <td style="padding:10px 0;color:#fff;font-size:14px;">${name}</td>
            </tr>
            <tr style="border-top:1px solid rgba(185,28,28,0.15);">
              <td style="padding:10px 0;color:rgba(212,175,55,0.8);font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">Email</td>
              <td style="padding:10px 0;font-size:14px;"><a href="mailto:${email}" style="color:#ef4444;text-decoration:none;">${email}</a></td>
            </tr>
            <tr style="border-top:1px solid rgba(185,28,28,0.15);">
              <td style="padding:10px 0;color:rgba(212,175,55,0.8);font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">Project Type</td>
              <td style="padding:10px 0;color:#fff;font-size:14px;">${projectType || "Not specified"}</td>
            </tr>
            <tr style="border-top:1px solid rgba(185,28,28,0.15);">
              <td style="padding:10px 0;color:rgba(212,175,55,0.8);font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;vertical-align:top;">Message</td>
              <td style="padding:10px 0;color:rgba(220,220,220,0.85);font-size:14px;line-height:1.7;">${message}</td>
            </tr>
          </table>
          <div style="margin-top:24px;">
            <a href="mailto:${email}" style="display:inline-block;padding:12px 24px;background:linear-gradient(135deg,#991b1b,#b91c1c);color:#fff;text-decoration:none;border-radius:10px;font-size:13px;font-weight:600;">
              Reply to ${name} →
            </a>
          </div>
        </div>
        <div style="padding:16px 32px;border-top:1px solid rgba(185,28,28,0.2);font-size:11px;color:rgba(180,180,180,0.4);">
          Sarvathan.C Portfolio · ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
        </div>
      </div>
    `,
  });
  console.log("✅ Mail sent: sendContactNotificationToOwner");
};

export const sendContactConfirmationToClient = async ({ name, email, projectType }) => {
  const transporter = createTransporter();

  await sendMail(transporter, {
    from: `"Sarvathan C" <${process.env.GMAIL_EMAIL}>`,
    to: email,
    subject: `Thanks for reaching out, ${name}! 👋`,
    html: `
      <div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:auto;background:#0f0303;color:#e0e0e0;border-radius:12px;overflow:hidden;border:1px solid rgba(185,28,28,0.3);">
        <div style="background:linear-gradient(135deg,#7f1d1d,#991b1b);padding:28px 32px;">
          <h2 style="margin:0;color:#fff;font-size:20px;">Hi ${name}, I've received your message!</h2>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.65);font-size:13px;">sarvathan.c — Full Stack Developer</p>
        </div>
        <div style="padding:28px 32px;line-height:1.8;">
          <p style="color:rgba(220,220,220,0.85);font-size:14px;margin:0 0 16px;">
            Thank you for getting in touch through my portfolio. I've received your inquiry${projectType ? ` regarding <strong style="color:#d4af37;">${projectType}</strong>` : ""} and I'll get back to you as soon as possible — typically within <strong style="color:#fff;">24–48 hours</strong>.
          </p>
          <p style="color:rgba(220,220,220,0.85);font-size:14px;margin:0 0 24px;">
            In the meantime, feel free to check out my work or connect with me on LinkedIn.
          </p>
          <div style="background:rgba(185,28,28,0.08);border-left:3px solid rgba(212,175,55,0.5);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:24px;">
            <p style="margin:0;font-size:13px;color:rgba(212,175,55,0.8);font-weight:600;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:6px;">What happens next?</p>
            <ul style="margin:0;padding-left:18px;color:rgba(200,200,200,0.8);font-size:13px;line-height:2;">
              <li>I'll review your project details</li>
              <li>I'll reach out to discuss scope and timeline</li>
              <li>We'll align on the best approach for your project</li>
            </ul>
          </div>
          <a href="https://www.linkedin.com/in/sarvathan-c-923789315" style="display:inline-block;padding:11px 22px;background:rgba(212,175,55,0.1);border:1px solid rgba(212,175,55,0.4);color:#d4af37;text-decoration:none;border-radius:10px;font-size:13px;font-weight:600;">
            Connect on LinkedIn →
          </a>
        </div>
        <div style="padding:16px 32px;border-top:1px solid rgba(185,28,28,0.2);font-size:11px;color:rgba(180,180,180,0.4);">
          Sarvathan C · Full Stack Developer · Tiruppur, Tamil Nadu, India<br/>
          <a href="mailto:sarvathan9363@gmail.com" style="color:rgba(239,68,68,0.5);text-decoration:none;">sarvathan9363@gmail.com</a>
        </div>
      </div>
    `,
  });
  console.log("✅ Mail sent: sendContactConfirmationToClient");
};


// ════════════════════════════════════════════════════════════════
//  FEEDBACK SECTION EMAILS
// ════════════════════════════════════════════════════════════════

export const sendFeedbackNotificationToOwner = async ({ name, role, message, rating }) => {
  const transporter = createTransporter();
  const stars = "⭐".repeat(rating) + "☆".repeat(5 - rating);

  await sendMail(transporter, {
    from: `"Portfolio Notifications" <${process.env.GMAIL_EMAIL}>`,
    to: process.env.OWNER_EMAIL || process.env.GMAIL_EMAIL,
    subject: `⭐ New Feedback from ${name} (${rating}/5)`,
    html: `
      <div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:auto;background:#0f0303;color:#e0e0e0;border-radius:12px;overflow:hidden;border:1px solid rgba(185,28,28,0.4);">
        <div style="background:linear-gradient(135deg,#7f1d1d,#991b1b);padding:28px 32px;">
          <h2 style="margin:0;color:#fff;font-size:20px;">New Feedback Received</h2>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.6);font-size:13px;">Submitted via your portfolio feedback section</p>
        </div>
        <div style="padding:28px 32px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:10px 0;color:rgba(212,175,55,0.8);font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;width:100px;">From</td>
              <td style="padding:10px 0;color:#fff;font-size:14px;">${name}</td>
            </tr>
            <tr style="border-top:1px solid rgba(185,28,28,0.15);">
              <td style="padding:10px 0;color:rgba(212,175,55,0.8);font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">Role</td>
              <td style="padding:10px 0;color:#fff;font-size:14px;">${role}</td>
            </tr>
            <tr style="border-top:1px solid rgba(185,28,28,0.15);">
              <td style="padding:10px 0;color:rgba(212,175,55,0.8);font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">Rating</td>
              <td style="padding:10px 0;font-size:16px;">${stars} <span style="color:#d4af37;font-weight:700;font-size:14px;">${rating}/5</span></td>
            </tr>
            <tr style="border-top:1px solid rgba(185,28,28,0.15);">
              <td style="padding:10px 0;color:rgba(212,175,55,0.8);font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;vertical-align:top;">Review</td>
              <td style="padding:10px 0;color:rgba(220,220,220,0.85);font-size:14px;line-height:1.7;font-style:italic;">"${message}"</td>
            </tr>
          </table>
        </div>
        <div style="padding:16px 32px;border-top:1px solid rgba(185,28,28,0.2);font-size:11px;color:rgba(180,180,180,0.4);">
          Sarvathan.C Portfolio · ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
        </div>
      </div>
    `,
  });
  console.log("✅ Mail sent: sendFeedbackNotificationToOwner");
};

export const sendFeedbackThankYouToClient = async ({ name, email, rating }) => {
  if (!email) return;
  const transporter = createTransporter();
  const stars = "⭐".repeat(rating) + "☆".repeat(5 - rating);

  await sendMail(transporter, {
    from: `"Sarvathan C" <${process.env.GMAIL_EMAIL}>`,
    to: email,
    subject: `Thank you for your feedback, ${name}! 🙏`,
    html: `
      <div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:auto;background:#0f0303;color:#e0e0e0;border-radius:12px;overflow:hidden;border:1px solid rgba(185,28,28,0.3);">
        <div style="background:linear-gradient(135deg,#7f1d1d,#991b1b);padding:28px 32px;">
          <h2 style="margin:0;color:#fff;font-size:20px;">Thank you, ${name}! 🙏</h2>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.65);font-size:13px;">Your feedback means a lot</p>
        </div>
        <div style="padding:28px 32px;line-height:1.8;">
          <div style="font-size:22px;margin-bottom:16px;">${stars}</div>
          <p style="color:rgba(220,220,220,0.85);font-size:14px;margin:0 0 16px;">
            Your <strong style="color:#d4af37;">${rating}/5 rating</strong> has been recorded on my portfolio. I genuinely appreciate you taking the time to share your experience — feedback like yours helps me grow and deliver better work.
          </p>
          <p style="color:rgba(220,220,220,0.85);font-size:14px;margin:0 0 24px;">
            If you ever need help with another project, don't hesitate to reach out!
          </p>
          <a href="https://www.linkedin.com/in/sarvathan-c-923789315" style="display:inline-block;padding:11px 22px;background:rgba(212,175,55,0.1);border:1px solid rgba(212,175,55,0.4);color:#d4af37;text-decoration:none;border-radius:10px;font-size:13px;font-weight:600;">
            Connect on LinkedIn →
          </a>
        </div>
        <div style="padding:16px 32px;border-top:1px solid rgba(185,28,28,0.2);font-size:11px;color:rgba(180,180,180,0.4);">
          Sarvathan C · Full Stack Developer · Tiruppur, Tamil Nadu, India
        </div>
      </div>
    `,
  });
  console.log("✅ Mail sent: sendFeedbackThankYouToClient");
};