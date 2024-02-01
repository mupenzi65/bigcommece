export const truncateString=(value,num)=>{
     if(value.length>num){
        return value.slice(0,num) +"..."
     }
     return value

}

export const unreadNotifications=(notification)=>{
   return notification?.filter((n)=>n.isRead ===false)
}