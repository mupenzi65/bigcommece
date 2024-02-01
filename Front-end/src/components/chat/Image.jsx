import React, { useEffect, useState } from 'react'

const Image = ({blob,blob2,orgin,type}) => {
    const [imageSrc,setImageSrc]=useState("");
    let imageBlob=''
    if(orgin){
        imageBlob=blob
    }else{
      imageBlob=blob2
    }
   

    const Newblob=new Blob([imageBlob])
    



    useEffect(()=>{
        const reader=new FileReader();
        reader.readAsDataURL(Newblob);
        reader.onloadend=function(){
            setImageSrc(reader.result)
        }
        
    })



  return (
    <div>
        <img src={imageSrc} alt={"fileName"} />
    </div>
  )
}

export default Image