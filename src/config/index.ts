const config = {
  port: process.env.PORT || 3000,
  routes: {
    satellites: "/api/get/satellites",
    randomSatellite: "/api/get/satellites/random",
    search: "/api/get/satellites/search/:id",
    
    post: "/api/post/cool-satellites",
  },
};

export default config;
