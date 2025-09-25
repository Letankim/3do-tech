import { NextResponse } from "next/server"

export async function GET() {
  try {
    const res = await fetch("https://letankim.id.vn/3do/tracker/readFeedback", {
      method: "GET",
    })

    if (!res.ok) {
      return NextResponse.json({ error: "Fail to get feedback from api" }, { status: res.status })
    }

    const data = await res.json() 
    return NextResponse.json(data, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: "Proxy request failed" }, { status: 500 })
  }
}