const createTokenUser=(user)=>{
    return {userId:user.id,email:user.email}
}

module.exports=createTokenUser