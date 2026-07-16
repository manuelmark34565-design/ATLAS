async function verifyPayment(reference: string | null) {
  if (!reference) {
    return Response.json(
      {
        error: 'Missing payment reference',
      },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await response.json();

  return Response.json(data);
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    return verifyPayment(searchParams.get('reference'));
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: 'Unable to verify payment',
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const reference = body?.reference;

    return verifyPayment(reference);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: 'Unable to verify payment',
      },
      {
        status: 500,
      }
    );
  }
}
