/* ==========================================================
   ربط الموقع بقاعدة بيانات Supabase
   من Supabase Dashboard → Project Settings → API انسخ:
     - Project URL        → url
     - anon public key    → anonKey
   (مفتاح anon آمن للنشر العلني لأن الصلاحيات محمية بسياسات RLS في schema.sql)
   اتركهما فارغين ليعمل الموقع بدون قاعدة بيانات (الحفظ على جهاز الزائر + واتساب).
   ========================================================== */
window.RAHEEM_DB = {
  url: 'https://ufltikmdybyncukonjfu.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmbHRpa21keWJ5bmN1a29uamZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTU1MzM1ODYsImV4cCI6MjExMTEwOTU4Nn0.2Tii1Upcz1tdpaUxSAlKOf8YVvXJXJ0Yqfg3wMSu__Y'
};
