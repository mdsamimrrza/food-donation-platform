import User from '../models/User.model.js'; 


export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);  

    // if (!user || user.role !== 'admin' ) {
    //   return res.status(403).json({ message: 'Access denied. Admins only.' });
    // }

    next(); 
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
};

export default isAdmin;