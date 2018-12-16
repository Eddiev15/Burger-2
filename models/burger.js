/*==================================BURGERS MODEL====================================*/

module.exports = function(sequelize, DataTypes){
var Burgers = sequelize.define('Burgers', {
	burger_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	devoured: {
		type: DataTypes.BOOLEAN,
		defaultValue: 0,
	},
	date: {
		type: DataTypes.DATE,
		defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
	}
},
	{
	classMethods: {
		associate: function(models){
			Burgers.hasOne(models.Temperatures, {
				foreignKey: 'burger_id'
			});
		}
	}
});
 return Burgers;
};