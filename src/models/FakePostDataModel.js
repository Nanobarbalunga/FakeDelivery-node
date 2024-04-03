const path = require('path');

const Model=require(path.join(__dirname,"../models"));
const nb=require(path.join(__dirname,"../libs/nb"));

class FPDModel extends Model{
	
	create() {
		try {
			nb.Cache.createSync({},`${this.constructor.name}.json`);
			let val=nb.Blog.generateRandomPosts(6);
			nb.Cache.createSync(val,`${this.constructor.name}.json`);
		} catch (error) {
			console.log(`* Errore in scrittura `,'...');
		}
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