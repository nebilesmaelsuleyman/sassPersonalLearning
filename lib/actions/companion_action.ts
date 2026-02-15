'use server'
import { auth } from '@clerk/nextjs/server'
import { createSupabaseAnonClient } from '../supabase'
import { revalidatePath } from 'next/cache'

export const createCompanion = async (formData: CreateCompanion) => {
    const { userId: author } = await auth();
    if (!author) throw new Error('Unauthorized');
    const supabase = createSupabaseAnonClient();
    const { data, error } = await supabase.from('companion').insert({ ...formData, author }).select();

    if(error || !data){
        throw new Error(error?.message || "failed to create a companion")
    }
    return data[0];
}

export const getAllCompanions = async({limit=10 , page=1 , subject, topic}:GetAllCompanions)=>{
const supabase= createSupabaseAnonClient()

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
    const supabase = createSupabaseAnonClient()
    const {data:companion, error}= await supabase.from('companion').select().eq('id',id);

    if(error)return console.log(error)
return companion[0];

}



export const addToSessionHistory = async (companionId: string) => {
    const { userId } = await auth();
    if (!userId) throw new Error('Unauthorized');
    const supabase = createSupabaseAnonClient();
    const { data, error } = await supabase
        .from('session_history')
        .insert({ companion_id: companionId, user_id: userId })
        .select('id')
        .single();
    if (error) throw new Error(error.message);
    return data as { id: string } | null;
};

export const updateSessionTranscript = async (
    sessionId: string,
    messages: { role: string; content: string }[]
) => {
    const supabase = createSupabaseAnonClient();
    const { error } = await supabase
        .from('session_history')
        .update({ transcript: messages })
        .eq('id', sessionId);
    if (error) throw new Error(error.message);
};

export const getSessionsWithTranscripts = async (userId: string, limit = 20) => {
    const supabase = createSupabaseAnonClient();
    const { data, error } = await supabase
        .from('session_history')
        .select('id, created_at, transcript, companions:companion_id (id, name, subject, topic)')
        .eq('user_id', userId)
        .not('transcript', 'is', null)
        .order('created_at', { ascending: false })
        .limit(limit);
    if (error) throw new Error(error.message);
    return data ?? [];
}

export const getRecentSessions = async (limit = 10) => {
    const supabase = createSupabaseAnonClient();
    const { data, error } = await supabase
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) throw new Error(error.message);
    return (data ?? []).map(({ companions }) => companions);
};

export const getUserSessions = async (userId: string, limit = 10) => {
    const supabase = createSupabaseAnonClient();
    const { data, error } = await supabase
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) throw new Error(error.message);
    return (data ?? []).map(({ companions }) => companions);
};

/** Sessions with created_at for analysis (e.g. "this week" count, by subject). */
export const getSessionsForAnalysis = async (userId: string, limit = 100) => {
    const supabase = createSupabaseAnonClient();
    const { data, error } = await supabase
        .from('session_history')
        .select('created_at, companions:companion_id (subject)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);
    if (error) throw new Error(error.message);
    return (data ?? []).map((row) => {
        const companion = Array.isArray(row.companions) ? row.companions[0] : row.companions;
        return { created_at: row.created_at, subject: (companion as { subject?: string })?.subject ?? 'other' };
    });
}


export const getUserCompanion = async (userId: string) => {
    const supabase = createSupabaseAnonClient();
    const { data, error } = await supabase.from('companion').select().eq('author', userId);
    if(error) throw new Error(error.message)
    return data
}

export const newCompanionPermissions = async () => {
    const { userId, has } = await auth();
    if (!userId) return false;
    const supabase = createSupabaseAnonClient();
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
export const addToBookmark = async (companionId: string, path: string) => {
    const { userId } = await auth();
    if (!userId) throw new Error('Unauthorized');
    const supabase = createSupabaseAnonClient();
    const { data, error } = await supabase.from('bookmark').insert({ companion_id: companionId, user_id: userId });
    if(error) throw new Error(error.message);


    revalidatePath(path);
    return data;
}
export const removeBookmark = async () => {
    const { userId } = await auth();
    if (!userId) throw new Error('Unauthorized');
    const supabase = createSupabaseAnonClient();
    const { data, error } = await supabase.from('bookmark').delete().eq('user_id', userId);
    if(error) throw new Error (error.message)
        return data;

}
export const getBookmarkedCompanions = async (userId: string) => {
    const supabase = createSupabaseAnonClient();
    const { data, error } = await supabase
        .from('bookmark')
        .select(`companions:companion_id (*)`)
        .eq('user_id', userId);
    if (error) throw new Error(error.message);
    return (data ?? []).map(({ companions }) => companions);
}