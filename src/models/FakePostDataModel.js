const Model=require("../models");
const nb=require("../libs/nb");

class FPDModel extends Model{
	
	create() {
		let val=nb.Blog.generateRandomPosts(6);
		nb.Cache.createSync(val,`${this.constructor.name}.json`);
	}
	read() {
		let val=nb.Cache.readSync(`${this.constructor.name}.json`);
		return val?val:nb.Blog.generateRandomPosts(6);
	}
	update() {
		
	}
	delete() {
		
	}
	
}

module.exports = FPDModel;