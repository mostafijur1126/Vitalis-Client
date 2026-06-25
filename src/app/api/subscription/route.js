import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getUserSession } from "@/lib/core/session";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const user = await getUserSession();

    const formData = await request.formData();
    const classId = formData.get("classId");
    const className = formData.get("className");
    const trainer = formData.get("trainer");
    const price = formData.get("price");
    const duration = formData.get("duration");
    const image = formData.get("image");

    const amount = Math.round(parseFloat(price || "0") * 100);

    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: className || "Class Booking",
              images: image ? [image] : [],
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        userId: user.id,
        userEmail: user.email,
        userName: user.name,
        classId,
        className,
        trainer,
        price,
        duration,
        image,
      },
      success_url: `${origin}/success/${classId}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/all-classes`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
