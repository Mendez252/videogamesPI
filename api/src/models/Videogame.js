const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true
    },
    idApi:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    background_image: {
      type: DataTypes.STRING,
      allowNull:true
    }, 
    description:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    released:{
      type: DataTypes.STRING,
      allowNull: true
    },
    rating:{
      type: DataTypes.STRING,
      allowNull: true
    },
    platforms:{
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull:false
    },
    createdInDB:{
      type: DataTypes.BOOLEAN,
    }
  });
};
