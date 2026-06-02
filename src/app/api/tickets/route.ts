import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// TODO: Implement a login authentication system to identify the current company
const CURRENT_COMPANY_ID = 'TechCorp'

export async function GET() {
  try {
    const tickets = await prisma.ticket.findMany({
      where: { companyId: CURRENT_COMPANY_ID },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(tickets)
  } catch (error) {
    console.error('Error fetching tickets:', error)
    return NextResponse.json({ error: 'Error fetching tickets' }, { status: 500 })
  }
}
