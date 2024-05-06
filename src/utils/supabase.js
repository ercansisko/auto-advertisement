import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zxqlqudaxwadebaivden.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4cWxxdWRheHdhZGViYWl2ZGVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzNDIwMTQsImV4cCI6MjAyODkxODAxNH0.1dIQgU004icmuaUjBjhq5s8XnNWAGy_X-65rTo9AMMU";

export const supabase = createClient(supabaseUrl, supabaseKey);
