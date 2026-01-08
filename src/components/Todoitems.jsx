import React from 'react'
import check from "../assets/checkmark.png"
import notcheck from "../assets/download.gif"
import delete_icon from "../assets/bin.gif"
const Todoitems = ({text,id,isCompelte,deleteTodo,toggle}) => {
  return (
    <div  className='flex items-center my-3 gap-2'>
        <div onClick={()=>{toggle(id)}} className='flex flex-1 items-center cursor pointer'>
            <img className='w-8' src={isCompelte ? check : notcheck} alt="" />
            <p className='text-slate-700 ml-4 text-[17px]' > {text}</p>
            
        </div>
        <img onClick={()=>{deleteTodo(id)}} className='w-8' src={delete_icon} toggle={toggle}  alt="" />
    </div>
  )
}

export default Todoitems