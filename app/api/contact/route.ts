import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  try {
    const res = await fetch("https://letankim.id.vn/3do/email/receiveContactNotification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const text = await res.text()
    return new NextResponse(text, { status: res.status })
  } catch (err) {
    return NextResponse.json({ error: "Proxy request failed" }, { status: 500 })
  }
}
