var express = require('express');
var router = express.Router();
const app = express()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/test', (req, res, next) => {
//   res.end({
//     status:200,
//     data:{
//       msg:'hello word'
//     }
//   })
// })


module.exports = router;
