import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://qlvnowmidyqbdawezhli.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsdm5vd21pZHlxYmRhd2V6aGxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1MzY3MzAsImV4cCI6MjA4NDExMjczMH0.kZJ4Qr_4K_vSsH6FxOxx6fSyIJ5yzYshcd0Oakkinrs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: Platform.OS === "web" ? undefined : AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
