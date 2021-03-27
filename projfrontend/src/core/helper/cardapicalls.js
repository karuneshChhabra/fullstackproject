export const addItemToCart = (item,next)=>{
    console.log(item);
    if(typeof window != undefined){
          let items =[];
          if(localStorage.getItem("card")){
            items = JSON.parse(localStorage.getItem("card"));
          }
          items.push({...item,count:1});
          localStorage.setItem("card",JSON.stringify(items));
          next();
    }
   
     
};

export const getValuesFromlocalStorage =()=>{

    if( typeof window != undefined){
        let items =[];
        if(localStorage.getItem("card")){
          items = JSON.parse(localStorage.getItem("card"));
        }
        return items;
    }

}


export const removeFromCardList = (itemId) =>{
    console.log(itemId)
   
    if( typeof window != undefined){
        let items =[];
        if(localStorage.getItem("card")){
          items = JSON.parse(localStorage.getItem("card"));
        }
        items.map((item,index)=>{
             if(item._id===itemId){
                 console.log(items);
                 items.splice(index,1);
                 console.log(items);
             }
        })

        localStorage.setItem("card",JSON.stringify(items));
        return items;
    }
}



