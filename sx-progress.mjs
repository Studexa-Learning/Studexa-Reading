// Learning completion only. Historical awards are read solely to preserve earlier completions.
export function completionStatus(task,progress,awards,student,settings={}){
 const rows=progress.filter(p=>p.student_id===undefined||p.student_id===student);
 const records=task.items.map(id=>rows.find(p=>p.id===(task.service==='maths'?id+':'+task.id:id))?.data||{});
 if(task.sx_completion){const total=task.items.length,done=records.filter(p=>p.complete).length;return {done:total>0&&done>=total,percent:total?Math.round(done/total*100):0,label:`${done} of ${total} ${task.service==='reader'?'reads':'packs'} completed`}}
 const previous=awards.filter(a=>a.student_id===student&&a.service===task.service&&new Date(a.created_at)>=new Date(task.release_at)&&new Date(a.created_at)<=new Date(task.due_at)&&task.items.some(id=>a.item===id||a.item===id+':'+task.id||a.item.startsWith(id+':'+task.id+':q')||a.item.startsWith(id+':cp'))).reduce((n,a)=>n+a.points,0);
 const maths=task.service==='maths',rate=maths?5:settings.starReader?20:10,target=Math.ceil(task.points/rate);
 const completed=maths?records.reduce((n,p)=>n+Object.values(p.correct||{}).filter(Boolean).length,0):records.reduce((n,p)=>n+(p.sx_checks??(p.complete?1:0)),0);
 const done=previous>=task.points||completed>=target||records.length>0&&records.every(p=>p.complete);
 return {done,percent:done?100:Math.min(99,Math.round(completed/Math.max(1,target)*100)),label:`${Math.min(completed,target)} of ${target} ${maths?'correct answers':'reading checks'}`};
}
