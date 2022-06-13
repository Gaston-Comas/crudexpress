var express = require('express');
var router = express.Router();
const proyectosController=require("../controllers/proyectosController");

var multer = require('multer');
var fecha = Date.now();

var rutaAlmacen = multer.diskStorage(
    {
    destination:function (request,file,callback) {
        callback(null,'./public/images/');

    },
    filename:function (request,file,callback) {
        console.log(file);
        callback(null,fecha+'_'+file.originalname);
        
    }

}
);

var cargar= multer({ storage:rutaAlmacen});


/* GET home page. */
router.get('/', proyectosController.index);
router.get('/crear', proyectosController.crear);
router.post('/',cargar.single("archivo"), proyectosController.guardar);

router.post('/eliminar/:id', proyectosController.eliminar);
router.get('/editar/:id', proyectosController.editar);

router.post('/actualizar',cargar.single("archivo"), proyectosController.actualizar);

module.exports = router;