
const datapost = require('../controllers/data.js');


module.exports = function(app) {
  
    app.post('/datapost', datapost.data);
 
    
};
