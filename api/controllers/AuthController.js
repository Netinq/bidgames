const ErrorMessageValidator = require("../errors/ErrorMessageValidator");
const ErrorMessage = require("../errors/ErrorMessage");
const ValidatorLogin = require("../validators/auth/LoginValidator");
const ValidatorRegister = require("../validators/auth/RegisterValidator");
const BCRYPT = require("bcryptjs");
const JWT = require("jsonwebtoken");
const User = require("../../database/models/User");
const Role = require("../../database/models/Role");

const TokenExpiration = () => {
  return Math.floor(Date.now() / 1000) + 60 * process.env.TOKEN_EXPIRATION;
};

async function Register(req, res) {
  const { error } = ValidatorRegister.validate(req.body);
  if (error) return new ErrorMessageValidator(error).send(res);
  if (await User.findOne({ where: { email: req.body.email } }))
    return new ErrorMessage("Adresse email déjà utilisé !", "email").send(res);

  const SALT = await BCRYPT.genSalt();
  const HashPassword = await BCRYPT.hash(req.body.password, SALT);
  const role = await Role.findOne({ where: { access_level: 0 } });

  console.log("TEST");
  console.log(role);

  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: HashPassword,
    id_role: role.id_role,
  });

  await user.save();

  delete req.body.firstname;
  delete req.body.lastname;

  return await Login(req, res);
}

async function Login(req, res) {
  const { error } = ValidatorLogin.validate(req.body);
  if (error) return new ErrorMessageValidator(error).send(res);

  const user = await User.findOne({
    where: { email: req.body.email },
    attributes: { include: ["password"] },
  });
  if (!user)
    return new ErrorMessage(
      "Nous ne trouvons pas l'adresse email !",
      "email"
    ).send(res);

  const VerifyPassword = await BCRYPT.compare(req.body.password, user.password);
  if (!VerifyPassword)
    return new ErrorMessage("Le mot de passe est invalide !", "password").send(
      res
    );

  const role = await Role.findOne({ where: { id_role: user.id_role } });
  const token = JWT.sign(
    {
      exp: TokenExpiration(),
      data: {
        user_uuid: user.user_uuid,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        id_role: role.id_role,
        access_level: role.access_level,
      },
    },
    process.env.SECRET_TOKEN
  );

  return res.json({
    token: token,
  });
}

async function RefreshToken(req, res) {
  let token = req.header("user-token");
  JWT.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) return new ErrorMessage("Cannot access").send(res);
    token = JWT.sign(
      {
        exp: TokenExpiration(),
        data: {
          firstname: decoded.data.firstname,
          lastname: decoded.data.lastname,
          email: decoded.data.email,
          id_role: decoded.data.id_role,
          access_level: decoded.data.access_level,
        },
      },
      process.env.SECRET_TOKEN
    );
    res.set("user-token", token);
  });
}

module.exports = {
  Register,
  Login,
  RefreshToken,
};
