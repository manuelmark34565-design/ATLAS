import { getAppBaseUrl } from '@/lib/app-url';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const appBaseUrl = getAppBaseUrl(req as Request);

    const response = await fetch(
      'https://api.paystack.co/transaction/initialize',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: body.email,
          amount: body.amount * 100,
          callback_url: `${appBaseUrl}/dashboard`,
          metadata: {
            plan: body.plan,
          },
        }),
      }
    );

    const data = await response.json();

    return Response.json(data);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: 'Unable to initialize payment',
      },
      {
        status: 500,
      }
    );
  }
}
