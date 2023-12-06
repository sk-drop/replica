export async function POST(req) {
  if (!process.env.REPLICATE_API_TOKEN) {
    return new Response("REPLICATE_API_TOKEN is not configured", { status: 500 });
  }

  try {
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "2b017d9b67edd2ee1401238df49d75da53c523f36e363881e057f5dc3ed3c5b2",
        input: { prompt: req.body.prompt },
      }),
    });

    console.log(req.body.prompt)
    
    if (response.status !== 201) {
      const error = await response.json();
      console.error("Error from Replicate API:", error);
      return new Response(JSON.stringify({ detail: error.detail }), { status: 500 });
    }

    const prediction = await response.json();
    return new Response(JSON.stringify(prediction), { status: 201 });
  } catch (error) {
    console.error("Server error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
