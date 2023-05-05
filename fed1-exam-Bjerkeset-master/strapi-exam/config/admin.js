module.exports = ({ env }) => ({
  auth: {
    secret: process.env.STRAPI_AUTH_SECRET || "GyF3hwAyWidYDZQwv9VhrA==",
  },
  apiToken: {
    salt: env("API_TOKEN_SALT"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT"),
    },
  },
});
