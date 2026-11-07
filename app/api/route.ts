// Health check for the host / uptime monitor.
export function GET() {
  return Response.json({ ok: true });
}
