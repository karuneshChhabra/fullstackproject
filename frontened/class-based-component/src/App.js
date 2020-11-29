import React from 'react';
import './App.css';
import logo from './LCO-logo-white.png';

class App extends React.Component{

  constructor(props){
    super(props);
    console.log(props);

    this.state={
      newItem:"",
      list:[]
    };
  }

  deleteItem(id){
    if(id){
     let updatedList = [...this.state.list];
     updatedList = updatedList.filter(item => item.id!== id)

     this.setState({
       list:updatedList
     });

    }
  }

  addItem(value){
    if(value){
        console.log(value);
        const list=[...this.state.list];
        const newItem={
          id:Date.now(),
          value:value,
          isDone:false
        }
        list.push(newItem);

        this.setState({
          list,
          newItem:""
        });
  }

  }

  valueUpdate(value){
    this.setState({
      newItem:value
    });
  }



   render(){
     return(
       <div className="App">
         <header className="App-header">
             <img src={logo} className="App-logo" width="100" height="100"/>
             Add an Item...
             <br/>

             <div className="container">
                <div>
                      <input type="text" className="input-text" placeholder="write to do"
                        value={this.state.newItem} onChange={e=>this.valueUpdate(e.target.value)} />
                      <button  className="add-btn" onClick={()=>this.addItem(this.state.newItem)}
                         disabled={!this.state.newItem.length>0}
                      >Submit</button>
                </div>
             
             <div className="list">
                 <ul>
                   {this.state.list.map(item=>{
                     return(
                        <li key={item.id}>
                          <input type="checkbox" className="input-text" value={item.isDone}               
                        />

                        <div>{item.value}</div>
                         <button  className="btn" onClick={()=>this.deleteItem(item.id)}>Delete</button>
                        </li>
                     )
                   })
                   }
                   <li>
                    <input type="checkbox" className="input-text"/>
                        Remove the values
                     <button  className="delete-btn">Delete</button>
                   </li>
                 </ul>

             </div>
            </div>
         </header>
        
       </div>
     );
   }


}

export default App;