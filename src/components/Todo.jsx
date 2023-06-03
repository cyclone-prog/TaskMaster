import React from 'react'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function InputTodo() {
  const [inputData,setInputData] = useState("");
  const [newData, setNewData] = useState([]);
  const [toggleSubmit,setToggleSubmit] = useState(true);
  const [editId,setEditId] = useState();

  const currentDate = new Date();
const formattedDate = `${currentDate.getFullYear()} ${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getDate()} ${currentDate.toLocaleString('default', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })}`;



  const getData = () =>{
    const finalInputData = {id: new Date().getTime().toString(), name:inputData};
    if(!inputData){
      toast.warning('empty todo');

    }else if(inputData && !toggleSubmit){
     setNewData(
                newData.map((val)=>{
                      if(val.id===editId){
                        return {...val,name:inputData}
                      }
                      return val;
                })
     )
     // above code in simpler manner to understand
    //  setNewData(
    //   newData.map((val) =>
    //     val.id === editId ? { ...val, name: inputData } : val
    //   )
    // )
     setToggleSubmit(true);
     toast.info('successfully edited');

      
    }else{
    setNewData([...newData,finalInputData])
    toast.success('successfully added ');
    }
    setInputData("");
    

  }
  const delData = (id) =>{
    const updatedData = newData.filter((val)=>{
      return id!=val.id;
    })
    setNewData(updatedData);
    toast.error('successfully deleted');

  }

  const editData = (id) => {
    setToggleSubmit(false);
    const editedValue = newData.find((val)=>{
      return id===val.id
    })
    setInputData(editedValue.name);
    // we make editId state inoreder to passs the id for finding out the value from the items by comparing with the id
    setEditId(id);
  }
  
  const clearAll = () => {
    
    setNewData([]);
    toast.success('successfully all cleared');


  }

  return (
    <>
    <div> 
       <div className=' md:w-6/12 mx-auto'>
       <div className='flex w-full bg-slate-200'>
      
        <input className='p-2 w-full' type="text" placeholder='add todo here' value={inputData} onChange={(e)=>setInputData(e.target.value)}/>
        {toggleSubmit?<button className="bg-slate-500 hover:bg-slate-500 text-slate-800 font-semibold hover:text-white py-2 px-4 border border-slate-500 hover:border-transparent rounded" 
        onClick={getData}>ADD</button>:<button className="bg-transparent hover:bg-slate-500 text-slate-700 font-semibold hover:text-white py-2 px-4 border border-slate-500 hover:border-transparent rounded" onClick={getData}>EDIT</button>}
        </div>
        <div className=' w-full my-9'>
          {newData.map((val)=>{
            return(
          
             <div className="my-5" key={val.id}> 
<div className='flex justify-between'>
<div className='border border-gray-600 w-8/12 md:w-7/12'><label className='p-2'>{val.name}</label></div>
<div className='space-x-5'>
<button className="px-2 bg-transparent hover:bg-slate-500 text-slate-700 font-semibold hover:text-white py-1 border border-slate-500 hover:border-transparent rounded" onClick={()=>{editData(val.id)}}>EDIT</button><button className="px-2 bg-transparent hover:bg-slate-500 text-slate-700 font-semibold hover:text-white py-1 border border-slate-500 hover:border-transparent rounded" onClick={()=>{delData(val.id)}}>DELETE</button><br />
</div>

</div>
            </div>
            
            )
          })
          }
          
        </div>
        {newData.length===0?"":<button className="w-full px-2 bg-transparent hover:bg-slate-500 text-slate-700 font-semibold hover:text-white py-1 border border-slate-500 hover:border-transparent rounded" onClick={clearAll}>clear all</button>}
       </div>
       
        
    </div>
    <ToastContainer
position="bottom-right"
autoClose={306}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>

    </>
  )
}

export default InputTodo