import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const CURRENT_COMPANY_ID = 'TechCorp'

// Función auxiliar simulada para envío de correos
async function sendEmailNotification(ticketId: string) {
  return new Promise<void>((resolve) => {
    console.log(`Enviando notificación urgente para el ticket ${ticketId}...`)
    resolve()
  })
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await request.json()

    // Buscamos el ticket para ver su prioridad
    const ticket = await prisma.ticket.findFirst({
      where: { id, companyId: CURRENT_COMPANY_ID },
    })

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket no encontrado' }, { status: 404 })
    }

    sendEmailNotification(ticket.id).catch(console.error)
    const updatedTicket = await prisma.ticket.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json(updatedTicket)
  } catch (error) {
    console.error('Error updating ticket:', error)
    return NextResponse.json({ error: 'Error updating ticket' }, { status: 500 })
  }
}
