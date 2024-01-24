import * as crypto from 'node:crypto';

export function generateTicketReference(event: string): string {
  const cleanedString = event.replace(/[^a-zA-Z]/g, '');
  const eventInitials = cleanedString.slice(0, 3).toLowerCase();

  const randomUuid = crypto.randomUUID();
  return eventInitials + randomUuid;
}
