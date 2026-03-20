const axios = require('axios');

const chatWithAssistant = async (req, res) => {
try {
const { apiKey, userMessage } = req.body;

const response = await axios.post(
  'https://api.anthropic.com/v1/messages',
  {
    model: 'claude-sonnet-4-20250514',
    max_tokens: 300,
    system:
      "You are Sarvathan's portfolio assistant. Answer questions about his skills, services, availability, and projects. Keep answers short and friendly. His email is Sarvathan9363@gmail.com. He is available for freelance work. Services include: Landing Pages, Business Websites, Full Stack Web Apps, REST APIs, Admin Dashboards, and E-Commerce Stores.",
    messages: [
      {
        role: 'user',
        content: userMessage,
      },
    ],
  },
  {
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
  }
);

res.json({
  success: true,
  reply: response.data.content[0].text,
});

} catch (error) {
res.status(500).json({
success: false,
message: 'Claude API request failed',
});
}
};

module.exports = { chatWithAssistant };
