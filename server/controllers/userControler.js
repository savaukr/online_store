const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");

const generateJwt = (id, email, role) =>
  jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: "24h" });

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    //next line need normal validation
    if (!email || !password) {
      return next(ApiError.badRequest("Email or password is not correct"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badRequest("User with this email  have alredy existed")
      );
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    const basket = await Basket.create({ userId: user.id });
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    //next line need normal validation
    if (!email || !password) {
      return next(ApiError.badRequest("Email or password is not correct"));
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal("User with this email do not exist"));
    }
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("Password  is not correct"));
    }
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
}

module.exports = new UserController();
