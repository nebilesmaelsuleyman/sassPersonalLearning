'use client'

import { cn, getSubjectColor ,configureAssistant } from '@/lib/utils'
import {vapi} from "@/lib/vapi-sdk";
import React from 'react'

import { useEffect,useRef ,useState } from 'react'
import soundWaves from '@/constants/soundwaves.json'
import Image from 'next/image';
import Lottie, {LottieRefCurrentProps} from "lottie-react";
enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED'
}

const CompanionComponets = ({companionId, subject ,topic, name ,userName, userImage, style , voice}:CompanionComponentProps) => {

    const [callStatus, setCallstatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking]= useState(false);
    const lottiRef= useRef<LottieRefCurrentProps>(null);
    const [isMuted, setIsMuted]= useState(false);

     useEffect(()=>{
        if(lottiRef){
            if(isSpeaking){
                lottiRef.current?.play();
            }else{
                lottiRef.current?.stop();
            }
        }

     },[isSpeaking, lottiRef.current?.play()])

    useEffect(()=>{
        const onCallStart =()=> setCallstatus(CallStatus.ACTIVE);
        const onCallEnd =()=> setCallstatus(CallStatus.FINISHED);

        const onMessage= (Message)=>{
            
        }
        const onSpeechStart= ()=>setIsSpeaking(true)
        const onSpeechEnd= ()=> setIsSpeaking(false)

        const onError=(error)=>console.log('error',error)

        vapi.on('call-start',onCallStart)
        vapi.on('call-end',onCallEnd)
        vapi.on('message', onMessage)
        vapi.on('speech-start', onSpeechStart)
        vapi.on('speech-end', onSpeechEnd)
        vapi.on('error', onError)

        return()=>{
              vapi.on('call-start',onCallStart)
        vapi.off('call-end',onCallEnd)
        vapi.off('message', onMessage)
        vapi.off('speech-start', onSpeechStart)
        vapi.off('speech-end', onSpeechEnd)
        vapi.off('error', onError)

        }

    },[])

        const toggleMicrophone =()=>{
            const isMuted= vapi.isMuted();
            vapi.setMuted(!isMuted);
            setIsMuted(!isMuted);
        }

const handleDisconnect= async ()=>{
    setCallstatus(CallStatus.FINISHED);
    vapi.stop()
}

const handleCall = async ()=>{
    setCallstatus(CallStatus.CONNECTING);

    const assistantOverrides ={
        variableValues:{subject, topic, style},
        clientMessages:['transcript'],
        serverMessages:[]

    } 
    // @ts-expect-error
    vapi.start(configureAssistant(voice, style), assistantOverrides);


}

    return (
        <section className='flex flex-col h-[70vh]'>
        <section className='flex gap-8 mx-sm:flex-col'>
            <div className='companion-section'>
                <div className='companion-avatar' style={{backgroundColor:getSubjectColor(subject)}}>
                    <div className={cn('absolute transition-opacity duration-1000',callStatus === CallStatus.FINISHED || callStatus=== CallStatus.INACTIVE ? 'opacity-100':'opacity-0' , callStatus=== CallStatus.CONNECTING && 'opacity-100 animate-pulse')} >
                            <Image src={`/icons/${subject}.svg`} alt='photo' width={50} height={50}/>
                    </div>
                    <div className={cn('absolute transition-opacity duration-1000',callStatus === CallStatus.ACTIVE ? 'opacity-100':'opacity-0')}>
                        <Lottie lottieRef={lottiRef} animationData={soundWaves} autoplay={false} className='companion-lottie'/>
                    </div>

                </div>
                <p className='font-bold text-2xl'>{name}</p>
            </div>
            <div className='user-section'>
                <div className ='user-avatar'>
                    <Image src={userImage} alt={userName} width={135} height={135} className='rounded-lg'/>
                    <p className='font-bold text-2xl' >{userName}</p>
                </div>
                <button className='btn-mic' onClick={toggleMicrophone}>
                    <Image src={isMuted ? '/icons/mic-off.svg':'/icons/mic-on.svg'} alt='mic' width={36} height={36}/>
                    <p className='max-sm:hidden'>{isMuted ? 'Turn on microphone':'Turn off microphone'}</p>
                </button>
                <button className={cn('rounded-lg py-2 cursor-pointer transition-colors w-full text-white', callStatus ===CallStatus.ACTIVE ? 'bg-red-700' : 'bg-primary', callStatus === CallStatus.CONNECTING && 'animate-pulse')} onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}>
                        {callStatus === CallStatus.ACTIVE
                        ? "End Session"
                        : callStatus === CallStatus.CONNECTING
                            ? 'Connecting'
                        : 'Start Session'
                        }
                    </button>

            </div>
        </section>
        <section className='transcript'>
            <div className='transcript-message no-scrollbar'>
                Messages
            </div>
            <div className='transcript-fade'></div>

        </section>
    </section>
    )
    
  
}

export default CompanionComponets