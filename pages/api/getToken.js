// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const { garment, type } = req.body;
  fetch("https://siz3r-dev.vercel.app/api/tryon/authenticate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      apiKey: process.env.SIZ3R_API_KEY,
      garment,
      type,
    }),
  })
    .then((result) => result.json())
    .then((result) => {
      res.status(200).json({ token: result.token });
    })
    .catch((err) => {
      console.debug(err);
      res.status(500).json({ error: err.message });
    });
}
