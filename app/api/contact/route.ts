import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max: number) {
    return String(value ?? "").trim().slice(0, max);
}

export async function POST(request: Request) {
    let body: Record<string, unknown>;

    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const firstName = clean(body.firstName, 80);
    const lastName = clean(body.lastName, 80);
    const email = clean(body.email, 160);
    const message = clean(body.message, 4000);

    if (!firstName || !lastName || !email || !message) {
        return NextResponse.json({ error: "Please fill in every field." }, { status: 400 });
    }

    if (!EMAIL_PATTERN.test(email)) {
        return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const to = process.env.CONTACT_EMAIL?.trim();
    const user = process.env.SMTP_USER?.trim();
    const pass = process.env.SMTP_PASS?.trim();
    const host = process.env.SMTP_HOST?.trim() || "smtp.gmail.com";
    const port = Number(process.env.SMTP_PORT || 587);

    if (!to || !user || !pass) {
        return NextResponse.json(
            { error: "Contact email is not configured yet." },
            { status: 500 }
        );
    }

    try {
        const transporter = nodemailer.createTransport({
            host,
            port,
            secure: port === 465,
            auth: { user, pass },
        });

        await transporter.sendMail({
            from: `"NAFA Scents" <${user}>`,
            to,
            replyTo: email,
            subject: `Contact form — ${firstName} ${lastName}`,
            text: `Name: ${firstName} ${lastName}\nEmail: ${email}\n\n${message}`,
            html: `
                <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
                <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                <p><strong>Message:</strong></p>
                <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
            `,
        });

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("[POST /api/contact]", error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: "Could not send your message. Please try again." },
            { status: 500 }
        );
    }
}

function escapeHtml(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}
