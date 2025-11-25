export function normalizeText(s){ if(!s) return ''; return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(); }
