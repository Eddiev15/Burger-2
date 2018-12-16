/*==================================TEMPERATURES MODEL====================================*/

module.exports = function(sequelize, DataTypes){
var Temperatures = sequelize.define('Temperatures', {
	burger_id: {
		type: DataTypes.INTEGER
	},
	temp: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, 
	{
		classMethods: {
			associate: function(models) {
				Temperatures.belongsTo(models.Burgers, {
					foreignKey: 'burger_id'
				}); 
			}
		}
	});
	return Temperatures;
};

