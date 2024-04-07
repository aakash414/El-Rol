
const data = async (req, res) => {
    try {
      const { fullname, email} = req.body;
  
      
  
      const userData = {
        fullname,
        email,
        
        
      };
  
      
  
      res.send({
        success: true,
        message: 'User details added.',
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'failed' });
    }
  };
  
  module.exports = { data };