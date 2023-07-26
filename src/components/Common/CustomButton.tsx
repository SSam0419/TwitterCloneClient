import React, { FC } from 'react'

type CustomButtonProps = {
    text:String 
    action:Function 

}

const CustomButton: FC<CustomButtonProps> = ({ text,action }) => {
  return (
    <button className="rounded-lg border-2 border-blue-500 text-white bg-blue-500 px-3 py-1 font-semibold" onClick={()=>action}>
        {text}
    </button>
  )
}

export default CustomButton