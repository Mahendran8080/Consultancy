// Simple hardcoded admin login function
export const loginAdmin = (req, res) => {
  const { username, password } = req.body;
  
  // Very simple authentication (for demo purposes only)
  // In a real application, you would use proper authentication with hashed passwords
  if (username === 'admin' && password === 'admin123') {
    res.json({
      success: true,
      message: 'Login successful',
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    });
  }
};