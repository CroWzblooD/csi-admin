
import Image from "next/image";
import { useState } from "react";
import { CloudinaryUpload } from "@/components/ImageUpload/Uploader";
import { CreateEvent } from "@/components/events/CreateEvent";
import Events from "@/components/dashboard/Events";

export default function Home() {
  // const [url,setUrl]=useState<string[]>()
  // const handleUploadSuccess = (url: string[]) => {
  //   console.log('Uploaded image URL:', url);
  //   setUrl(url)
  // };
  return (
    <main className="flex min-h-screen flex-row items-center justify-center gap-10">
      
      {/* <div>
      <h1>Image Upload</h1>
      <CloudinaryUpload onUploadSuccess={handleUploadSuccess} />
    </div>
    {
      url?.map((e,index)=>
        <Image key={index} src={e} height={300} width={300} alt="no image"/>
      )
    } */}
 <Events/>
   
    </main>
  );
}
