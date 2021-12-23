const jwt = require("jsonwebtoken");

const secret = "mysecretsshhhhh";
const expiration = "2h";

module.exports = {
  signToken: function ({ username, email, _id }) {
    //were making a function named signToken that takes in an object with the properties of username, email, and _id
    const payload = { username, email, _id }; //this is the payload that will be encrypted and sent to the client

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    //then we are signing the payload with the secret and the expiration so that the token expires after 2 hours
    //and we are returning the token to the client so that it can be sent to the client in the header of the request
  },
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // separate "Bearer" from "<tokenvalue>"
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    // if no token, return request object as is
    if (!token) {
      return req;
    }

    try {
      // decode and attach user data to request object
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }

    // return updated request object
    return req;
  },
};
