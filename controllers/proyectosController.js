var conexion=require('../config/conexion')
var proyecto=require("../model/proyecto");
var borrar=require("fs");

module.exports={
    index:function (req,res) {

      proyecto.obtener(conexion,function(err,datos) {
          console.log(datos);
          res.render('proyectos/index', { title: 'Aplicación',proyectos:datos });
      });

        
    },
    crear:function (req,res) {
        res.render('proyectos/crear');
    },
    guardar:function (req,res) {
        console.log(req.body);
        console.log(req.file.filename);
        
      proyecto.insertar(conexion,req.body,req.file,function(err) {
           res.redirect('/proyectos');

      });   
        
        
    },
    eliminar:function (req,res) {
        console.log("Recepción de datos");
        console.log(req.params.id);

        proyecto.retornarDatosID(conexion,req.params.id,function (err,registros) {
        var nombreImagen="public/images/"+(registros[0].imagen);

            

            if(borrar.existsSync(nombreImagen)){
                borrar.unlinkSync(nombreImagen);

            }
            
            proyecto.borrar(conexion,req.params.id,function (err) {

                 res.redirect('/proyectos');
                
            });

        });

    },
    editar:function (req,res) {

        proyecto.retornarDatosID(conexion,req.params.id,function (err,registros) {
            console.log(registros[0]);
            res.render('proyectos/editar',{proyecto:registros[0]});
        
        });
        
    },
    actualizar:function (req,res) {
        console.log(req.body.nombre);
        console.log(req.body.apellido);

       

        if(req.file){
            if(req.file.filename){

                proyecto.retornarDatosID(conexion,req.body.id,function (err,registros) {
                    var nombreImagen="public/images/"+(registros[0].imagen);
                        if(borrar.existsSync(nombreImagen)){
                            borrar.unlinkSync(nombreImagen);
            
                        }
                        
                       proyecto.actualizarArchivo(conexion,req.body,req.file,function (err) {});
            
                    });

            }

        }

        if(req.body.nombre && req.body.apellido){
            proyecto.actualizar(conexion,req.body,function (err) { });
    
            }

         res.redirect('/proyectos');
        
        
    }

}