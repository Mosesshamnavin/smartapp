require("dotenv-safe").config({
  allowEmptyValues: true,
});

const { NODE_ENV } = process.env;

module.exports = {
  env: NODE_ENV,
  server: {
    host: process.env.host || "0.0.0.0",
    port: process.env.port || process.env.PORT || 5002,
  },
  httpMethods: {
    get: "GET",
    post: "POST",
    put: "PUT",
    delete: "DELETE",
    patch: "PATCH",
    purge: "PURGE",
  },
};
