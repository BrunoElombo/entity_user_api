const { loginUser } = require('../services/authService')


const generateToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// exports.login = async (req, res) => {
//   const { username, password, rememberMe } = req.body;

//   try {
//     const user = await prisma.user.findUnique({ where: { name:username } });
    
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = generateToken(user);

//     if (rememberMe) {
//       // Implement remember me logic
//     }

//     return res.status(200).json({ token });
//   } catch (error) {
//     console.error(error.message);
//     return res.status(500).json({ message: error.message });
//   }
// };

exports.login = async (req, res)=>{
  const { name, password, keepMeIn } = req.body;

  try{
    const response = await loginUser(name, password, keepMeIn);
    if(!response.message){
      let {refresh, ...rest} = response;
      res.cookie('jwt', refresh, { httpOnly: true, maxAge: 24*60*60*1000});
      return res.json({...rest});
    }
    return res.sendStatus(401)
  }catch(error){
    return res.sendStatus(500);
  }
}
