export const initialState={
    user:JSON.parse(localStorage.getItem("user")) || null,
    notifications:'',
    chat:true,
    orders:[]

}

const reducer=(state,action)=>{
    switch(action.type){
        case "SET_USER":{
            return{
                ...state,
                user:action.user
            }
        }
        case "SET_NOTIFICATION":{
            return{
                ...state,
                notifications:action.notifications
            }
        }
        case "SET_CHAT":{
            return{
                ...state,
                chat:action.chat
            }
        }
        case "ADD_TO_ORDER":
            return {
              ...state,
              orders: [...state.orders, action.orders],
            };
        case "UPDATE_CART_ITEM":
      let basket=[...state.orders];
      const indexi=basket.findIndex(
        (item) => item.id === action.id
        );
  
        if(indexi!==-1){
          var newItem=basket[indexi]
          if(action.name==="quantity"){
            newItem={...newItem,quantity:action.quantity}
            basket[indexi]=newItem

          }else if(action.name==="price"){
            newItem={...newItem,price:action.price}
            basket[indexi]=newItem
          }
         
          
          
       
          
        }
        

        return {...state,orders:basket}

        default:
      return state;
    }
}

export default reducer