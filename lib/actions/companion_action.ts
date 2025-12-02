'use server'
import { auth } from '@clerk/nextjs/server'
import {createSupabaseClient} from '../supabase'
import { revalidatePath } from 'next/cache'

export const createCompanion= async(formData:CreateCompanion)=>{
    const {userId:author}= await auth()

    const supabase= createSupabaseClient()

    const {data, error}= await supabase.from('companion').insert({...formData, author}).select();

    if(error || !data){
        throw new Error(error?.message || "failed to create a companion")
    }
    return data[0];
}

export const getAllCompanions = async({limit=10 , page=1 , subject, topic}:GetAllCompanions)=>{
const supabase= createSupabaseClient()

let query =supabase.from("companion").select();

if(subject && topic){
    query= query.ilike('subject', `%${subject}%`).or(`topic.ilike.%${topic}%`)
}else if(subject){
    query= query.ilike('subject', `%${subject}%`)
}else if(topic){
    query= query.ilike('topic', `%${topic}%`)
}
query= query.range((page-1)*limit, page*limit -1).order('created_at', {ascending:false})

const {data:companion, error}= await query
if( error){
    throw new Error (error.message)
}
return companion
}


export const getCompanion = async (id:string)=>{
    const supabase = createSupabaseClient()
    const {data:companion, error}= await supabase.from('companion').select().eq('id',id);

    if(error)return console.log(error)
return companion[0];

}



export const addToSessionHistory= async(companionId:string)=>{
    const {userId}=await auth();
    const supabase= createSupabaseClient();
    
    const {data, error}= await supabase.from('session_history').insert({companion_id: companionId, user_id: userId})
    if(error) throw new Error(error.message)
    return data ;
}

export const getRecentSessions = async (limit = 10) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .order('created_at', { ascending: false })
        .limit(limit)

    if(error) throw new Error(error.message);

    return data.map(({ companions }) => companions);
}


export const getUserSessions = async (userId: string, limit = 10) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit)

    if(error) throw new Error(error.message);

    return data.map(({ companions }) => companions);
}


export const getUserCompanion= async(userId:string)=>{
    
    const supabase= createSupabaseClient();

    const {data, error}= await supabase.from('companion').select().eq('author', userId)
    if(error) throw new Error(error.message)
    return data
}

export const newCompanionPermissions= async ()=>{
    const {userId, has}= await auth();
    const supabase= createSupabaseClient();
    let limit =0;

    if(has({plan:'pro'})){
        return true;
    }else if(has({feature:"3_converstaions_limit"})){
        limit=3;
    }else if(has({feature:"10_converstaions_limit"})){
        limit=10
    }

    const {data, error}= await supabase.from('companion').select('id',{count:"exact"}).eq('author', userId);
    if(error) throw new Error(error.message);

    const companionCount = data?.length;
    if(companionCount >= limit){
        return false;
    }else{
        return true;
    }
}
export const addToBookmark= async (companionId:string, path:string)=>{
    const {userId}= await auth();

    const supabase= createSupabaseClient();

    const {data, error}= await supabase.from('bookmark').insert({companion_id:companionId, user_id:userId})
    if(error) throw new Error(error.message);


    revalidatePath(path);
    return data;
}