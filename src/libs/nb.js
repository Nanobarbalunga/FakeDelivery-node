const { faker } = require('@faker-js/faker');
const fs = require('fs');


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
     generateRandomPermanentPosts(percorsoFile = 'data.json',users_n=5,posts_n=10){
        
        let posts=Blog.generateRandomPosts(users_n,posts_n);
        Cache.create(posts,percorsoFile)

        return posts;
    }

}

const Cache={
    createSync(json={},percorso= 'data.json'){
        console.log('Il file sta per essere scritto nel percoso:', percorso,'...');
        // Converti l'oggetto in JSON
        json = JSON.stringify(json, null, 2); // Il parametro null e 2 servono per la formattazione leggibile
        
        // Scrivi il JSON su disco
        fs.writeFile(percorsoFile, json, 'utf8', (err) => {
        if (err) {
            console.error('Si è verificato un errore durante la scrittura del file:', err);
            return;
        }
        console.log('Il file è stato scritto correttamente:', percorsoFile);
        });
    },
    readSync(percorso= 'data.json',){
        console.log('Il file sta per essere letto dal percoso:', percorso,'...');
        return fs.readFileSync(percorso,'utf8')
    }
}

module.exports.Blog=Blog;
module.exports.Cache=Cache;