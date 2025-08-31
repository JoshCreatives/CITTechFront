export async function GET(request: Request) {
  // For example, fetch data from your DB here
  console.log(request)
  return new Response('Hello world', {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}