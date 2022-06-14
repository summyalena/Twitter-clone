import React from 'react'
import { useState, useRef } from 'react'
import Image from 'next/image'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/solid'
import {db,storage} from "../firebase"
import { addDoc, collection, doc, serverTimestamp, updateDoc,} from "@firebase/firestore";
import {getDownloadURL, ref, uploadString} from "@firebase/storage";
import {signOut, useSession} from 'next-auth/react'

function Input() {
  const {data:session} = useSession();
  const [input, setInput] = useState('')
  const [loading,setLoading] = useState(false)
  const filePickerRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(false)
  const [showEmoji, setShowEmoji] = useState(false)

const sendPost = async() =>{ 
    //  we want to initialize loading here
    if(loading) return;
    setLoading(true);

    // we are going to create a document that would let us create a database and collection and save it up
    const docRef = await addDoc(collection(db,"posts"), {
      id: session.user.uid,
      username: session.user.name,
      userImage: session.user.image,
      tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    });
    // we now create an imageRef that lets us store images to the database using it url: an image url will be generated
    const imageRef = ref(storage,`posts/${docRef.id}/image`)

    if(selectedFile){
      // it is referencing the image ref and selectedFile and converting it to an url
      await uploadString(imageRef,selectedFile, "data_url").then(async()=>{
        const downloadURL = await getDownloadURL(imageRef)
         await updateDoc(doc(db,"posts",docRef.id), {
           image: downloadURL
         })
      })
    }
    setLoading(false);
    setInput("");
    setSelectedFile(null)
    setShowEmoji(false);
}

  const addImageToPost = (e) => {
    // so i want to initialize a fileReader that reads my files and if its my first file picked,
    // it would read it as a data url(link)
    const reader = new FileReader()
     if(e.target.files[0]){
       reader.readAsDataURL(e.target.files[0]);
     }   
     reader.onload = (readerEvent) =>{
        //  it would set the new selected file to the one chosen
        setSelectedFile(readerEvent.target.result);
     }
  }

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  return (
    <div
      className={`flex space-x-3 overflow-y-scroll border-b border-gray-700 p-3 sm:ml-auto ${loading && "opacity-60"} `}
    >
      <img
        className="h-10 w-10 cursor-pointer rounded-full"
        src={session.user.image}
        width={20}
        height={20}
        onClick={signOut}
        alt="facebook"
      />
      <div className=" w-full divide-y-2 divide-gray-700">
        <div className={`${selectedFile && "pb-5"} ${input && "space-y-5"}`}>
          <textarea
            name=""
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="text-2sm outline-none min-h-[70px] w-full bg-transparent"
            placeholder="What's happening?"
          />
        {selectedFile && (
          <div className="relative">
            <div
              onClick={() => setSelectedFile(false)}
              className="hover:bg[#27232c] absolute top-1 left-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#15181c] bg-opacity-40"
            >
              <XIcon className='text-white h-5'/>
            </div>
            <img
              src={selectedFile}
              className="max-h-80 rounded-2xl object-contain"
            />
          </div>
        )}
        </div>
        {!loading && (
        <div className="pt-2.4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="icon" onClick={() => filePickerRef.current.click()}>
              <PhotographIcon className="h-5 text-[#1d9bf0]"/>
              <input
                type="file"
                hidden
                onChange={addImageToPost}
                // it points to the input and takes in the functionalities and links it to the onClick function
                ref={filePickerRef}
              />
            </div>
            <div className="icon rotate-90">
              <ChartBarIcon className="h-5 text-[#1d9bf0]" />
            </div>
            <div className="icon" onClick={() => setShowEmoji(!showEmoji)}>
              <EmojiHappyIcon className="h-5 text-[#1d9bf0]" />
            </div>
            <div className="icon">
              <CalendarIcon className="h-5 text-[#1d9bf0]" />
            </div>
            {showEmoji && (
              <Picker
              onSelect={addEmoji}
                style={{
                  maxWidth: '320px',
                  borderRadius: '20px',
                  marginLeft: -40,
                  position: 'absolute',
                  marginTop: '440px',
                }}
                theme="dark"
              />
            )}
          </div>
          <button className="hoverLbg-[#1a8cd8] 
          cursor-pointer
           rounded-full 
           mt-1
           bg-[#1d9bf0] px-4 py-1.5 
           font-bold text-white
            shadow-md disabled:hover-bg[#1d9bf0] disabled:bg-opacity-50
             disabled:cursor-default" disabled={!input && !selectedFile} onClick={sendPost}>
            Tweet
          </button>
        </div>
        )}
      </div>
      </div>
  );
}

export default Input

{
  /* <div
      className={`flex space-x-3 overflow-y-scroll border-b border-gray-700 p-3 `}
    >
      <img
        src="https://lh3.googleusercontent.com/a/AATXAJwCsuneWAkKlHwMPxOmLNjFACEvbtN8QPwbUsZ-=s96-c"
        alt=""
        className="h-11 w-11 cursor-pointer rounded-full"
      />
      <div className="w-full divide-y divide-gray-600">
        <div className={``}>
          <textarea
            name=""
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's happening?"
            value={input}
            rows="2"
            className="min-h-[50px] w-full bg-transparent text-lg
             tracking-wide 
             text-[#d9d9d9]
              placeholder-gray-700 
             outline-none"
          />
        </div>
        {selectedFile && (
        <div className="relative">
          <div
            className="absolute 
          top-1 left-1 flex 
          h-8 
          w-8 
          cursor-pointer 
          items-center justify-center rounded-full 
          bg-[#15181c] bg-opacity-75 hover:bg-[#272c26]"
          onClick={()=>setSelectedFile(false)}
          >
            <XIcon className="h-5 text-white" />
          </div>
          <img
            src={selectedFile}
            alt=""
            className="max-h-80 rounded-2xl object-contain"
          />
        </div>
        )}
      </div>
        <div className='flex justify-between items-center pt-2.5'>
            <div className="items-center flex justify-center">
                <div className="icon">
                    <PhotographIcon className='h-[22px] text-[#1d9bf0]'/>
                    
                </div>
            </div>
        </div>
    </div> */
}
