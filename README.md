This is a SaaS-based web application built with Clerk for secure authentication and Vapi for real-time voice AI interaction. The platform allows users to create their own custom subjects or topics and interact with an AI agent entirely through voice. Users can define what they want to learn or discuss and have natural, real-time voice conversations with an intelligent assistant. The app is designed for interactive learning, practice, and productivity using modern AI-driven voice technology.

Link: [sass-personal-learning.vercel.app](https://sass-personal-learning-j1g95i6ia-nebil-esmaels-projects.vercel.app/)

### Supabase: transcript column (optional)

To save voice-session transcripts, add a column to `session_history`:

```sql
ALTER TABLE session_history ADD COLUMN IF NOT EXISTS transcript jsonb;
```

### Environment

- `OPENAI_API_KEY`: Optional. When set, text chat with companions uses OpenAI for replies.

### Clerk + Supabase (optional)

The app uses Supabase with the **anon key** and passes the Clerk `user_id` in queries, so you do **not** need to configure Clerk’s Supabase integration for the “No suitable key or wrong key type” error to go away.

If you later want Supabase Row Level Security (RLS) to use Clerk’s JWT:

1. **Clerk Dashboard** → [Supabase integration](https://dashboard.clerk.com/setup/supabase) → **Activate Supabase integration** (so session tokens include the claim Supabase expects).
2. **Supabase Dashboard** → **Authentication** → **Third-party auth** → Add **Clerk** and paste your Clerk instance domain.
3. In code, you could then switch back to a Supabase client that sends `(await auth()).getToken()` as the access token (see [Clerk Supabase docs](https://clerk.com/docs/integrations/databases/supabase)).
