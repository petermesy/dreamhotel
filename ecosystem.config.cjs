module.exports = {
  apps: [
    {
      name: "dream-hotel-backend",
      script: "./dist/server.cjs",
      env: {
        PORT: 3000,
        NODE_ENV: "production",
      },
    },
    {
      name: "dream-hotel-frontend",
      script: "serve",
      args: "-s dist -l 5173",
    },
  ],
};