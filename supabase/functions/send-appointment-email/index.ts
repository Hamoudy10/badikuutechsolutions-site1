import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AppointmentRequest {
  name: string;
  email: string;
  phone?: string;
  service: string;
  preferred_date: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, service, preferred_date, message }: AppointmentRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "BadikuuTech <onboarding@resend.dev>",
      to: ["your-email@example.com"], // Replace with your actual email
      subject: `New Appointment Request: ${service}`,
      html: `
        <h2>New Appointment Request from BadikuuTech Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Preferred Date:</strong> ${new Date(preferred_date).toLocaleString()}</p>
        ${message ? `<p><strong>Additional Information:</strong></p><p>${message.replace(/\n/g, "<br>")}</p>` : ""}
        <br>
        <p>Please confirm this appointment by responding to the client.</p>
      `,
    });

    console.log("Appointment email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-appointment-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);