const handleRoutes = (app) => {
  app.get("/*", (req, res) => {
    res.sendFile(process.cwd() + "/public/index.html");
  });
};

export default handleRoutes;
