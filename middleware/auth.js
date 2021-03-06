import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const decodedToken = jwt.verify(token, "secret");

    req.user = decodedToken;

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
