//const { faker } = require('@faker-js/faker');
const { fakerIT: faker } = require('@faker-js/faker');
const fs = require('fs');
const { dirname } = require('path');
const path = require('path');
//const appDir = dirname(require.main.filename);
const appDir = dirname('./');



let id=0;

const Blog={

     createPostRaw(username,avatar,idUser,following,text,imageContent,like,date,ids){
        ids=id++;
        let obj={
            author:{
                username:username,
                avatar:avatar,
                id:idUser,
                following:following
            },
            post:{
                id:ids,
                content:text,
                media:imageContent,
                likes:like,
                create_at:date
            }

        }

        return obj;
    },
     createPostFromUser(user,text,imageContent,like,date,ids){
        ids=id++;
        let obj={
            author:{
                username:user.username,
                avatar:user.avatar,
                id:user.idUser,
                following:user.following
            },
            post:{
                id:ids,
                content:text,
                media:imageContent,
                likes:like,
                create_at:date
            }

        }

        return obj;
    },
     createUser(username,avatar,following,idUser){
        idUser=id++;
        let obj={
                username:username,
                avatar:avatar,
                id:idUser,
                following:following
        }
        return obj;
    },
     generateUsers(num=10){
        let users=[];
        for (let index = 0; index <num; index++) {
            users.push(
                Blog.createUser(
                    faker.internet.userName(),
                    //faker.image.avatar(), //1084
                    `https://picsum.photos/id/${faker.number.int(1083)+1}/128/128/?blur`,
                    faker.number.int(2000),
                    index)
            )
            
        }
        return users;
    },
     generatePostsFormUsers(users=[],num=10){
        let posts=[];
        users.forEach((user,i) => {

            for (let index = 0; index < faker.number.int(num); index++) {
                posts.push(Blog.createPostFromUser(
                    user,
                    faker.lorem.paragraph(2),
                    faker.datatype.boolean()?faker.image.url():'',
                    faker.number.int(100),
                    faker.date.recent({ days: faker.number.int(3)+1 }),
                    i))
            }
            
        });
        
        return posts;
    },
    generateRandomPosts(users_n=5,posts_n=10){
        
        let users=Blog.generateUsers(users_n);
        let posts=Blog.generatePostsFormUsers(users,posts_n);
        
        return posts
    },
     generateRandomPermanentPosts(percorso = 'data.json',users_n=5,posts_n=10){
        
        let posts=Blog.generateRandomPosts(users_n,posts_n);
        Cache.create(posts,percorso)

        return posts;
    }

}

const DeliveryFake={

    createRestaurant(name,avatar,description,imageGallery=[],indirizzo={},following=0,like=0,rating=0,recensioni=[],info={}){
       ids=id++;
       let obj={
           name:name,
           logo:avatar,
           address:indirizzo,
           description:description,
           imageGallery:imageGallery,
           info:info,
           followings:following,
           likes:like,
           rating:rating,
           reviews:recensioni,
           id:ids
       }

       return obj;
    },
    createRestaurantBase(name,avatar,description,imageGallery=[]){
        let obj=DeliveryFake.createRestaurant(name,avatar,description,imageGallery)
        return obj;
    },
    createAddress(indirizzo,cap,cit){
    let obj={
        address:indirizzo,
        CAP:cap,
        city:cit
    }
    return obj;
    },
    createReviews(rate,user,text,date=new Date()){
        ids=id++;
        let obj={
            rate:rate,
            user:user,
            text:text,
            date:date,
            id:ids
        }
        return obj;
    },
    createInfoRestaurant(open_at=new Date(),text,close_at=new Date(),ordine_min=15){
        let obj={
            open_at:open_at,
            text:text,
            close_at:close_at,
            ordine_min:ordine_min
        }
        return obj;
    },
    createProductRestaurant(name, description, cost,image){
        ids=id++;
        let obj={
            id:ids,
            name:name,
            description:description,
            cost:cost,
            image:image
        }
        return obj;
    },
    createMenuRestaurant(name, description,category, products=[]){
        ids=id++;
        let obj={
            id:ids,
            name:name,
            category:category,
            description:description,
            products:products
        }
        return obj;
    },

    generateRandomRestaurantsBase(num=10){
        let res=[];
        for (let index = 0; index <num; index++) {
            let restaurant=DeliveryFake.createRestaurantBase(
                ///faker.internet.userName(),
                `${faker.word.adjective()} ${faker.animal.bear()}`,
                `https://picsum.photos/id/${faker.number.int(1083)+1}/128/128/?blur`,
                faker.lorem.text(),
                faker.helpers.arrayElements([
                    `https://picsum.photos/id/${faker.number.int(1083)+1}/128/128/?blur`, 
                    `https://picsum.photos/id/${faker.number.int(1083)+1}/128/128/?blur`, 
                    `https://picsum.photos/id/${faker.number.int(1083)+1}/128/128/?blur`,
                ]));

                restaurant.address=DeliveryFake.createAddress(
                    faker.location.streetAddress(),
                    faker.location.zipCode('#####'),
                    faker.location.city(),
                )

                restaurant.followings=faker.number.int(5000)
                restaurant.likes=faker.number.int(5000)
                restaurant.reviews=0
                restaurant.rating=faker.number.int(5)

            res.push(
                restaurant
            )
            
        }
        return res;
    },

    generateRandomProducts(num=5){
        let res=[];
        for (let index = 0; index <num; index++) {
            let product=DeliveryFake.createProductRestaurant(
                faker.animal.cow(), 
                faker.lorem.text(), 
                faker.number.float(36),
                `https://picsum.photos/id/${faker.number.int(1083)+1}/128/128/?blur`
            )

            res.push(
                product
            )
        }
        return res;
    },

    generateRandomMenu(num=3,products=[]){
        let res=[];
        for (let index = 0; index <num; index++) {
            let type=faker.helpers.arrayElement([
                `fish`, 
                `meat`, 
                `vegan`,
                `pasta`,
                `hamburger`,
                `vegetables`,
                `fried`,
                `greasy stuff`
            ]);
            let menu=DeliveryFake.createMenuRestaurant(
                `Menu ${type}`, 
                faker.lorem.text(), 
                type,
                products
            )

            res.push(
                menu
            )
        }
        return res;
    },

    generateFullRestaurants(num=4){
        let restaurant=DeliveryFake.generateRandomRestaurantsBase(num);
        let menu=DeliveryFake.generateRandomMenu(
            faker.number.int(5),
            DeliveryFake.generateRandomProducts(faker.number.int(8))
        )
        restaurant.forEach((el)=>{
            el.menu=menu;
        })

        return restaurant;
    }
}

const Cache={
    createSync(json={},percorso= 'data.json'){
        console.log('Il file sta per essere scritto nel percoso:', path.resolve(appDir,'cache',percorso),'...');
        // Converti l'oggetto in JSON
        json = JSON.stringify(json, null, 2); // Il parametro null e 2 servono per la formattazione leggibile
        
        // Scrivi il JSON su disco
        try {
            
            fs.writeFileSync(path.resolve(appDir,'cache',percorso), json)
            console.log('Il file è stato scritto correttamente:', path.resolve(appDir,'cache',percorso));
        } catch (err) {
            console.error('Si è verificato un errore durante la scrittura del file:', err);
        }

    },
    readSync(percorso= 'data.json',){
        console.log('Il file sta per essere letto dal percoso:', path.resolve(appDir,'cache',percorso),'...');
        if(!fs.existsSync(path.resolve(appDir,'cache',percorso)))
            return false;
        return JSON.parse(fs.readFileSync(path.resolve(appDir,'cache',percorso),'utf8'))
    }
}

module.exports.Delivery=DeliveryFake;
module.exports.Blog=Blog;
module.exports.Cache=Cache;