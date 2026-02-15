'use client'

import { cn, getSubjectColor ,configureAssistant } from '@/lib/utils'
import {vapi} from "@/lib/vapi-sdk";
import React from 'react'

import { useEffect,useRef ,useState } from 'react'
import soundWaves from '@/constants/soundwaves.json'
import Image from 'next/image';
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import { addToSessionHistory, updateSessionTranscript } from '@/lib/actions/companion_action';
import { CompanionChat } from '@/components/CompanionChat';
import { Mic, MessageSquare } from 'lucide-react';

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
    const [messages, setMessages]= useState<{ role: string; content: string }[]>([]);
    const messagesRef = useRef<{ role: string; content: string }[]>([]);
    const [tab, setTab] = useState<'voice' | 'chat'>('voice');
    useEffect(() => { messagesRef.current = messages; }, [messages]);
     useEffect(()=>{
        if(lottiRef){
            if(isSpeaking){
                lottiRef.current?.play();
            }else{
                lottiRef.current?.stop();
            }
        }

     },[isSpeaking])

   useEffect(() => {
    const onCallStart = () => setCallstatus(CallStatus.ACTIVE);
    const onCallEnd = async () => {
        setCallstatus(CallStatus.FINISHED);
        const latestMessages = messagesRef.current;
        try {
            const session = await addToSessionHistory(companionId);
            if (session?.id && latestMessages.length > 0) {
                await updateSessionTranscript(session.id, latestMessages);
            }
        } catch (e) {
            console.error('Failed to save session/transcript', e);
        }
    };

    const onMessage = (message) => {
        if (message.type === "transcript" && message.final === true) {
            const newMessage = {
                role: message.role,
                content: message.transcript,
            };
            setMessages((prev) => [...prev, newMessage]);
        }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error) => console.log("error", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
        vapi.off("call-start", onCallStart);
        vapi.off("call-end", onCallEnd);
        vapi.off("message", onMessage);
        vapi.off("speech-start", onSpeechStart);
        vapi.off("speech-end", onSpeechEnd);
        vapi.off("error", onError);
    };
}, []);


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
    console.log('starting call');
    setCallstatus(CallStatus.CONNECTING);

    const assistantOverrides ={
        variableValues:{subject, topic, style},
        clientMessages:['transcript'],
        serverMessages:['transcript']

    } 
    // @ts-expect-error
    vapi.start(configureAssistant(voice, style), assistantOverrides);

 console.log('assistant overides', assistantOverrides);
}

    const companionShortName = name.split(' ')[0].replace(/[.,]/g, '');

    return (
        <section className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden">
            {/* Mode switcher: Voice | Chat */}
            <div className="flex p-1.5 gap-1 bg-muted/50 border-b border-border">
                <button
                    type="button"
                    onClick={() => setTab('voice')}
                    className={cn(
                        'flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-all',
                        tab === 'voice'
                            ? 'bg-card text-foreground shadow-sm border border-border'
                            : 'text-muted-foreground hover:text-foreground'
                    )}
                >
                    <Mic className="w-4 h-4" /> Voice session
                </button>
                <button
                    type="button"
                    onClick={() => setTab('chat')}
                    className={cn(
                        'flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-all',
                        tab === 'chat'
                            ? 'bg-card text-foreground shadow-sm border border-border'
                            : 'text-muted-foreground hover:text-foreground'
                    )}
                >
                    <MessageSquare className="w-4 h-4" /> Text chat
                </button>
            </div>

            {tab === 'chat' ? (
                <div className="flex-1 min-h-[420px]">
                    <CompanionChat name={name} subject={subject} topic={topic} style={style} userName={userName} />
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-6 p-6 min-h-[420px]">
                    {/* Voice: Companion + You side by side */}
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-6 lg:max-w-[280px] shrink-0">
                        <div className="rounded-2xl border border-border bg-muted/30 p-5 flex flex-col items-center gap-3">
                            <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: getSubjectColor(subject) }}>
                                <div className={cn('absolute inset-0 flex items-center justify-center transition-opacity duration-300', (callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE) ? 'opacity-100' : 'opacity-0', callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse')}>
                                    <Image src={`/icons/${subject}.svg`} alt="" width={40} height={40} />
                                </div>
                                <div className={cn('absolute inset-0 flex items-center justify-center transition-opacity duration-300', callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0')}>
                                    <Lottie lottieRef={lottiRef} animationData={soundWaves} autoplay={false} className="w-full h-full" />
                                </div>
                            </div>
                            <p className="font-semibold text-foreground text-center">{name}</p>
                            <span className="text-xs text-muted-foreground">
                                {callStatus === CallStatus.INACTIVE && 'Start to begin'}
                                {callStatus === CallStatus.CONNECTING && 'Connecting…'}
                                {callStatus === CallStatus.ACTIVE && (isSpeaking ? 'Speaking…' : 'Listening')}
                                {callStatus === CallStatus.FINISHED && 'Session ended'}
                            </span>
                        </div>
                        <div className="rounded-2xl border border-border bg-muted/30 p-5 flex flex-col items-center gap-4">
                            <Image src={userImage} alt={userName} width={72} height={72} className="rounded-xl object-cover" />
                            <p className="font-semibold text-foreground">{userName}</p>
                            <button
                                type="button"
                                onClick={toggleMicrophone}
                                disabled={callStatus !== CallStatus.ACTIVE}
                                className={cn(
                                    'w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium border transition-colors',
                                    callStatus !== CallStatus.ACTIVE ? 'opacity-50 cursor-not-allowed border-border bg-muted/50' : 'border-border bg-card hover:bg-accent'
                                )}
                            >
                                <Image src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'} alt="" width={20} height={20} />
                                {isMuted ? 'Unmute' : 'Mute'}
                            </button>
                            <button
                                type="button"
                                onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
                                disabled={callStatus === CallStatus.CONNECTING}
                                className={cn(
                                    'w-full rounded-xl py-3 text-sm font-semibold transition-all',
                                    callStatus === CallStatus.ACTIVE && 'bg-red-600 hover:bg-red-700 text-white',
                                    (callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED) && 'bg-primary text-primary-foreground hover:opacity-90',
                                    callStatus === CallStatus.CONNECTING && 'bg-muted text-muted-foreground cursor-wait animate-pulse'
                                )}
                            >
                                {callStatus === CallStatus.ACTIVE ? 'End session' : callStatus === CallStatus.CONNECTING ? 'Connecting…' : 'Start voice session'}
                            </button>
                        </div>
                    </div>
                    {/* Live transcript */}
                    <div className="flex-1 flex flex-col min-h-0 rounded-2xl border border-border bg-muted/20">
                        <div className="px-4 py-2 border-b border-border">
                            <p className="text-sm font-medium text-foreground">Live transcript</p>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 no-scrollbar">
                            {messages.length === 0 && (
                                <p className="text-sm text-muted-foreground">Transcript will appear here when you start the session.</p>
                            )}
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        'rounded-2xl px-4 py-2.5 max-w-[90%]',
                                        message.role === 'assistant' ? 'bg-card border border-border self-start' : 'bg-primary text-primary-foreground self-end'
                                    )}
                                >
                                    <span className="text-xs font-medium opacity-80">{message.role === 'assistant' ? companionShortName : userName}</span>
                                    <p className="text-sm mt-0.5 whitespace-pre-wrap">{message.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
    
  
}

export default CompanionComponets