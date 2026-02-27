"use client";
import { useState, useEffect, useRef } from "react";
import { SectionHeader, Card, Input, Textarea, Btn, Toast, useToast } from "@/components/admin/ui";

type P = { name:string; title:string; tagline:string; location:string; email:string; github:string; linkedin:string; website:string; avatar:string; available:boolean; };
type A = { bio:string; highlights:string[]; };

export default function AboutPage() {
  const [p, setP] = useState<P>({ name:"",title:"",tagline:"",location:"",email:"",github:"",linkedin:"",website:"",avatar:"",available:true });
  const [a, setA] = useState<A>({ bio:"", highlights:[] });
  const [hl, setHl] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast, show } = useToast();

  useEffect(() => {
    fetch("/api/portfolio").then(r=>r.json()).then(d=>{ setP(d.personal); setA(d.about); });
  }, []);

  const save = async () => {
    setSaving(true);
    const res = await fetch("/api/portfolio",{ method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify({personal:p, about:a}) });
    setSaving(false);
    show(res.ok?"Saved!":"Failed", res.ok?"success":"error");
  };

  const upload = async (file:File) => {
    setUploading(true);
    const fd = new FormData(); fd.append("file",file);
    const res = await fetch("/api/upload",{method:"POST",body:fd});
    setUploading(false);
    if(res.ok){ const {url}=await res.json(); setP(x=>({...x,avatar:url})); show("Avatar uploaded!"); }
    else show("Upload failed","error");
  };

  const addHl = () => { if(hl.trim()){ setA(x=>({...x,highlights:[...x.highlights,hl.trim()]})); setHl(""); } };
  const rmHl = (i:number) => setA(x=>({...x,highlights:x.highlights.filter((_,idx)=>idx!==i)}));

  return (
    <div className="max-w-2xl">
      <SectionHeader title="About & Personal" description="Your name, bio, links and avatar" />

      <Card className="mb-6">
        <p className="text-xs font-mono tracking-widest uppercase text-muted mb-4">Avatar</p>
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-subtle flex items-center justify-center text-3xl overflow-hidden shrink-0 border-2 border-subtle">
            {p.avatar ? <img src={p.avatar} alt="avatar" className="w-full h-full object-cover"/> : "👤"}
          </div>
          <div>
            <Btn variant="secondary" loading={uploading} onClick={()=>fileRef.current?.click()}>
              {uploading?"Uploading…":"Upload photo"}
            </Btn>
            <p className="text-xs text-muted mt-1">JPG, PNG, WebP — max 5MB</p>
            {p.avatar && <button onClick={()=>setP(x=>({...x,avatar:""}))} className="text-xs text-danger hover:underline mt-1 block">Remove</button>}
          </div>
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e=>e.target.files?.[0]&&upload(e.target.files[0])}/>
      </Card>

      <Card className="mb-6 space-y-4">
        <p className="text-xs font-mono tracking-widest uppercase text-muted">Personal Info</p>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Full Name" value={p.name} onChange={e=>setP(x=>({...x,name:e.target.value}))}/>
          <Input label="Title" value={p.title} onChange={e=>setP(x=>({...x,title:e.target.value}))}/>
        </div>
        <Textarea label="Tagline" value={p.tagline} rows={2} onChange={e=>setP(x=>({...x,tagline:e.target.value}))}/>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Location" value={p.location} onChange={e=>setP(x=>({...x,location:e.target.value}))}/>
          <Input label="Email" type="email" value={p.email} onChange={e=>setP(x=>({...x,email:e.target.value}))}/>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="GitHub URL" value={p.github} onChange={e=>setP(x=>({...x,github:e.target.value}))}/>
          <Input label="LinkedIn URL" value={p.linkedin} onChange={e=>setP(x=>({...x,linkedin:e.target.value}))}/>
        </div>
        <Input label="Website" value={p.website} onChange={e=>setP(x=>({...x,website:e.target.value}))}/>
        <label className="flex items-center gap-3 cursor-pointer pt-1">
          <div onClick={()=>setP(x=>({...x,available:!x.available}))}
            className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${p.available?"bg-emerald-400":"bg-subtle"}`}>
            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${p.available?"left-5":"left-0.5"}`}/>
          </div>
          <span className="text-sm text-ink">Available for work</span>
        </label>
      </Card>

      <Card className="mb-6 space-y-4">
        <p className="text-xs font-mono tracking-widest uppercase text-muted">Bio</p>
        <Textarea label="Bio" value={a.bio} rows={5} onChange={e=>setA(x=>({...x,bio:e.target.value}))}/>
        <div>
          <p className="text-xs font-mono tracking-widest uppercase text-muted mb-2">Highlights</p>
          <ul className="space-y-2 mb-3">
            {a.highlights.map((h,i)=>(
              <li key={i} className="flex items-center gap-3 text-sm text-ink bg-paper px-3 py-2 rounded-lg">
                <span className="text-accent">→</span>
                <span className="flex-1">{h}</span>
                <button onClick={()=>rmHl(i)} className="text-muted hover:text-danger text-xs">✕</button>
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            <input value={hl} onChange={e=>setHl(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&(e.preventDefault(),addHl())}
              placeholder="Add a highlight…"
              className="flex-1 px-3 py-2 rounded-lg border border-subtle bg-paper text-ink text-sm focus:outline-none focus:border-accent transition-colors"/>
            <Btn variant="secondary" onClick={addHl}>Add</Btn>
          </div>
        </div>
      </Card>

      <Btn loading={saving} onClick={save}>Save Changes</Btn>
      <Toast toast={toast}/>
    </div>
  );
}
