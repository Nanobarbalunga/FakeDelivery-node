const Model=require("../models");
const nb=require("../libs/nb");

class FPDModel extends Model{
	
	create() {
		
	}
	read() {
		return nb.Blog.generateRandomPosts();
	}
	update() {
		
	}
	delete() {
		
	}
	
}

module.exports = FPDModel;