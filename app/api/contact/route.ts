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

export async function GET() {
  try {
    const res = await fetch("https://letankim.id.vn/3do/tracker/user", {
      method: "GET",
    })

    if (!res.ok) {
      return NextResponse.json({ error: "Upstream request failed" }, { status: res.status })
    }

    const data = await res.json() 
    return NextResponse.json(data, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: "Proxy request failed" }, { status: 500 })
  }
}
