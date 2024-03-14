const { errorResponser } = require("../../libs/controller-helper");
const axios = require("axios");

module.exports = async ctx => {
  const {
    request: {
      body: { prompt }
    }
  } = ctx;

  try {
    const body = JSON.stringify({
      model: "dall-e-2",
      prompt: `${prompt}`,
      size: "512x512"
    });

    const url = "https://api.openai.com/v1/images/generations";
    const response = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer`,
        "Content-Type": "application/json"
      }
    });
    const image_url = response.data.data[0].url;

    ctx.body = {
      result: image_url
    };
  } catch (error) {
    console.log(error);
    return errorResponser(ctx, 400, "Create ai pic error");
  }
};
