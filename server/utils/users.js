[{
    id: '8924y2rewhuifsd',
    name: 'Stuart',
    room: 'The office fans'
}]

//addUser(id, name, room)
//remove(id)
//getuser(id)
//getuserlist(room)

class Users {
    constructor(){
        this.users = []
    }
    addUser(id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        let user = this.users.filter((user) => user.id === id)[0];

        if(user){
            this.users = this.users.filter((user) => user.id !== id)
        }

        return user;
    }
    getUser(id) {
        let users = this.users.filter((user) => {
            return user.id === id
        });
        return users[0];
    }
    getUserList(room){
        let users = this.users.filter((user) => {
            return user.room === room;
        });
        let namesArray = users.map((user) => {
            return user.name
        });
        return namesArray
    }
};

module.exports = {Users};