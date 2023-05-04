import React from "react";
import C from './Content.module.css'

class Main extends React.Component {
   constructor(props){
      super(props)
      this.state={
         selected:"main"
         
      }
   }
   mainclick=()=>{
      this.setState({selected:'main'})
      console.log('клик по главной', this)
      }
      juliaclick=()=>{
         this.setState({selected:'julia'})
         console.log('клик по юле', this)
         }
         irinaclick=()=>{
            this.setState({selected:'irina'})
            console.log('клик по ирине', this)
            }
            anasteishaclick=()=>{
               this.setState({selected:'anasteisha'})
               console.log('клик по анастейше', this)
               }
               forAllclick=()=>{
                  this.setState({selected:'forall'})
                  console.log('клик на общий', this)
                  }
    render() {


        return<div>

        <div  className={C.header}>
            <div onClick={()=>this.mainclick()} className={`${C.Main} ${this.state.selected === 'main' && C.active}`}>
                главная 
            </div>

         <div  onClick={()=>this.juliaclick()} className={`${C.julia} ${this.state.selected === 'julia' && C.active}`}>
            юлии
         </div>
         <div  onClick={()=>this.irinaclick()} className={`${C.irina} ${this.state.selected==='irina'&& C.active}`}>
            ирины
         </div>
         <div  onClick={()=>this.anasteishaclick()} className={`${C.anasteisha} ${this.state.selected==='anasteisha'&&C.active}`}>
            анастейши
         </div>
         <div  onClick={()=>this.forAllclick()} className={`${C.forall} ${this.state.selected==='forall'&&C.active}`}>
            общий
         </div>

         
         </div>
         {this.state.selected ==='main'&& <div>
         <div className="gamebutton">
            играть
         </div>
         <div className="time">
            часы
         </div>
            </div>}

            {this.state.selected==='julia'&&<div>
               юлин календарь
               </div>}
               {this.state.selected==='irina'&&<div>
                  иринин календарь
                  </div>}
                  {this.state.selected==='anasteisha'&&<div>
                     анастейши календарь
                     </div>}
                     {this.state.selected==='forall'&&<div>
                        общий календарь
                        </div>}
        
         </div>
    }
}




















export default Main