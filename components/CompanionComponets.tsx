'use client'

import { cn, getSubjectColor } from '@/lib/utils'
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

        const onMessage= ()=>{}
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

    return (
        <section className='flex flex-col h-[70vh]'>
        <section className='flex gap-8 mx-sm:flex-col'>
            <div className='companion-section'>
                <div className='companion-avatar' style={{backgroundColor:getSubjectColor(subject)}}>
                    <div className={cn('absolute transition-opacity duration-1000',callStatus === CallStatus.FINISHED || callStatus=== CallStatus.INACTIVE ? 'opacity-100':'opacity-0' , callStatus=== CallStatus.CONNECTING && 'opacity-100 animate-pulse')} >
                            <Image src={`/icons/${subject}.svg`} alt='photo' width={50} height={50}/>
                    </div>
                    <div className={cn('absolute transition-opacity duration-1000',callStatus === CallStatus.ACTIVE ? 'opacity-100':'opacity-0')}>
                        <Lottie lottieRef={lottiRef} animationData={soundWaves}/>
                    </div>

                </div>
            </div>
        </section>
    </section>
    )
    
  
}

export default CompanionComponets