const postgres = require('postgres');
const connectionString = "postgresql://postgres.iqjprlvlsguqkdmsivsc:pbsraVYM0Oc5o20M@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
const sql = postgres(connectionString)
module.exports = sql