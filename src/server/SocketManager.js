const io = require('./index.js').io
const { VERIFY_USER, USER_CONNECTED, COMMUNITY_CHAT, LOGOUT} = require("../Events")
const {createUser, createMessage, createChat} = require('../Factories')

let connectedUsers = {}
let communityChat = createChat()

module.exports = function(socket){
    console.log("Socket ID: " + socket.id)

    //Verify usernames
    socket.on(VERIFY_USER, (nickname, callback) =>{
        if(isUser(connectedUsers, nickname)){
            callback({isUser: true, user:null})
        } else {
           callback({isUser: false, user: createUser({name:nickname})}) 
        }
    })


    //Users connects with username
    socket.on(USER_CONNECTED, (user)=>{
        connectedUsers = addUser(connectedUsers, user)
        socket.user = user
        io.emit(USER_CONNECTED, connectedUsers)
        console.log(connectedUsers);
    })

    //Get Community Chat
	socket.on(COMMUNITY_CHAT, (callback)=>{
		callback(communityChat)
	})

}


function isUser(userList, user) {
    return user in userList
}

function addUser(userList, user) {
    let newList = Object.assign({}, userList)
    newList[user.name]  = user
    return newList 
}

function deleteUser(userList, username) {
    let newList = Object.assign({}, userList)
    delete newList[username]
    return newList
}

