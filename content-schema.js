function validateContent(data){
 if(!data||data.version!==1||(!Array.isArray(data.guides)||!data.guides.length)||!data.media||!data.apps||!data.appShots)throw Error('지원하는 안내 파일 형식이 아닙니다.');
 const ids=new Set();
 for(const g of data.guides){if(!/^[a-z0-9-]{1,100}$/.test(g.id)||ids.has(g.id)||!['owner','master','order','common'].includes(g.app)||typeof g.title!=='string'||!g.title.trim()||typeof g.category!=='string'||!g.category.trim()||typeof g.intro!=='string'||typeof g.keywords!=='string'||!Array.isArray(g.steps)||g.steps.some(s=>typeof s!=='string'||!s.trim())||(g.tip!==undefined&&typeof g.tip!=='string')||(g.hidden!==undefined&&typeof g.hidden!=='boolean'))throw Error('안내 항목의 제목·분류·단계를 확인해 주세요.');ids.add(g.id);if(g.devices&&(!Array.isArray(g.devices)||g.devices.length!==g.steps.length||g.devices.some(x=>typeof x!=='string')))throw Error('단계별 앱 표시를 확인해 주세요.');}
 for(const list of Object.values(data.media)){if(!Array.isArray(list))throw Error('이미지 목록이 올바르지 않습니다.');for(const m of list){if(typeof m.caption!=='string'||!safeMedia(m.file)||(m.poster&&!safeMedia(m.poster))||(m.gif&&!m.poster))throw Error('이미지 파일 형식이 올바르지 않습니다.');}}
 for(const [id,a] of Object.entries(data.apps)){if(!['owner','master','order','common'].includes(id)||['name','official','who','desc','device'].some(k=>typeof a[k]!=='string'||/[<>]/.test(a[k])))throw Error('앱 정보가 올바르지 않습니다.');}
 for(const k of ['owner','master','order'])if(!data.apps[k]||!safeMedia(data.appShots[k]))throw Error('앱 대표 화면이 올바르지 않습니다.');
 return data;
}
function safeMedia(value){return typeof value==='string'&&(/^[a-zA-Z0-9_-]+\.(gif|png|jpe?g|webp|avif)$/.test(value)||/^data:image\/(png|jpeg|webp|gif|avif);base64,[A-Za-z0-9+/=]+$/.test(value));}
