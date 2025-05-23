import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://jqupegwptbfpstuhcuhw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxdXBlZ3dwdGJmcHN0dWhjdWh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMzMxMzEsImV4cCI6MjA2MzYwOTEzMX0.Ju3JeERzCAeS8ULLhxEXiEpf5N5JS4U-wV3058KpO8M'
)
