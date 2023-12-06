export async function GET(req) {

  if (!process.env.REPLICATE_API_TOKEN) {
    return new Response("REPLICATE_API_TOKEN is not configured", { status: 500 });
  }

  try {
    const response = await fetch(
      "https://api.replicate.com/v1/predictions/" + req.query.id,
      {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status !== 200) {
      let error = await response.json();
      res.statusCode = 500;
      res.end(JSON.stringify({ detail: error.detail }));
      return;
    }
    const prediction = await response.json();
    res.end(JSON.stringify(prediction));
  } catch (error) {
    console.error("Server error:", error);
    return new Response("Internal Server Error", { status: 500 });
}}