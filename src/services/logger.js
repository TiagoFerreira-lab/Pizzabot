export function log(level, message, data){ const ts=new Date().toISOString(); if(data) console.log(`[${ts}] [${level}] ${message}`, data); else console.log(`[${ts}] [${level}] ${message}`); }
