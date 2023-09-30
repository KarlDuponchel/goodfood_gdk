import { Resend } from "resend";
import verifyEmail from "@/app/emails/verifyEmail";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.resend_token);

export async function POST(request: Request) {
    const { firstname, email } = await request.json();

    try {
        await resend.sendEmail({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Confirmation de création de compte",
            react: verifyEmail({firstname})
        });

        return NextResponse.json({
            status: 'Ok'
          }, {
            status: 200
        })
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log(`Failed to send email: ${e.message}`);
          }
          
          return NextResponse.json({
            error: 'Internal server error.'
          }, {
            status: 500
          })
    }
}