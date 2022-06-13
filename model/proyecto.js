module.exports={
    obtener:function(conexion,funcion) {
        conexion.query("SELECT * FROM usuarios",funcion);
        
    },
    insertar:function (conexion,datos,archivos,funcion) {
        conexion.query("INSERT INTO usuarios(nombre, apellido, imagen) VALUES (?,?,?)",[datos.nombre,datos.apellido,archivos.filename],funcion);
        
    },
    retornarDatosID:function (conexion,id,funcion) {
        conexion.query("SELECT * FROM usuarios WHERE id=?",[id],funcion);
        
    },
    borrar:function (conexion,id,funcion) {
        conexion.query("DELETE FROM usuarios WHERE id=?",[id],funcion);
    },
    actualizar:function (conexion,datos,funcion) {
        conexion.query("UPDATE usuarios SET nombre=?,apellido=? WHERE id =?",[datos.nombre,datos.apellido,datos.id],funcion);
    },
    actualizarArchivo:function (conexion,datos,archivo,funcion) {
        conexion.query("UPDATE usuarios SET imagen=? WHERE id =?",[archivo.filename,datos.id],funcion);
    }

}       
