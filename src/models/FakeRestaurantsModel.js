const Model=require("../models");
const nb=require("../libs/nb");

class FRestaurantsModel extends Model{
	
	create() {
		let val=nb.Delivery.generateFullRestaurants(6);
		nb.Cache.createSync(val,`${this.constructor.name}.json`);
	}
	read() {
		let val=nb.Cache.readSync(`${this.constructor.name}.json`);
		return val?val:nb.Delivery.generateFullRestaurants(6);
	}
	update() {
		
	}
	delete() {
		
	}
	
}

module.exports = FRestaurantsModel;