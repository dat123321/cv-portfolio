"use client";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { SectionHeader, Card, Input, Textarea, Btn, TagInput, Toast, useToast, ConfirmDelete } from "@/components/admin/ui";

type Proj = { id:string; name:string; description:string; link:string|null; github:string|null; tags:string[]; year:string };
const empty = (): Proj => ({ id:uuidv4(), name:"", description:"", link:"", github:"", tags:[], year:String(new Date().getFullYear()) });

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Proj[]>([]);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState<string|null>(null);
  const { toast, show } = useToast();

  useEffect(()=>{ fetch("/api/portfolio").then(r=>r.json()).then(d=>{ setProjects(d.projects); setOpen(d.projects[0]?.id??null); }); },[]);

  const save = async () => {
    setSaving(true);
    const res = await fetch("/api/portfolio",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({projects})});
    setSaving(false);
    show(res.ok?"Saved!":"Failed",res.ok?"success":"error");
  };

  const upd = (id:string, field:keyof Proj, val:unknown) => setProjects(p=>p.map(proj=>proj.id===id?{...proj,[field]:val}:proj));
  const add = () => { const proj=empty(); setProjects(p=>[proj,...p]); setOpen(proj.id); };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <SectionHeader title="Projects" description="Your portfolio projects"/>
        <Btn onClick={add}>+ Add Project</Btn>
      </div>
      <div className="space-y-3 mb-6">
        {projects.map(proj=>{
          const isOpen = open===proj.id;
          return (
            <Card key={proj.id}>
              <button type="button" className="w-full flex items-center justify-between text-left" onClick={()=>setOpen(isOpen?null:proj.id)}>
                <div>
                  <p className="font-medium text-ink text-sm">{proj.name||<span className="text-muted italic">New Project</span>}</p>
                  <p className="text-xs text-muted">{proj.year}</p>
                </div>
                <span className="text-muted text-lg">{isOpen?"↑":"↓"}</span>
              </button>
              {isOpen&&(
                <div className="mt-5 space-y-4 border-t border-subtle pt-5">
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Project Name" value={proj.name} onChange={e=>upd(proj.id,"name",e.target.value)}/>
                    <Input label="Year" value={proj.year} onChange={e=>upd(proj.id,"year",e.target.value)}/>
                  </div>
                  <Textarea label="Description" value={proj.description} onChange={e=>upd(proj.id,"description",e.target.value)}/>
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Live URL" value={proj.link??""} placeholder="https://…" onChange={e=>upd(proj.id,"link",e.target.value||null)}/>
                    <Input label="GitHub URL" value={proj.github??""} placeholder="https://github.com/…" onChange={e=>upd(proj.id,"github",e.target.value||null)}/>
                  </div>
                  <TagInput label="Tags" tags={proj.tags} onChange={tags=>upd(proj.id,"tags",tags)}/>
                  <div className="flex justify-end pt-1">
                    <ConfirmDelete onConfirm={()=>setProjects(p=>p.filter(x=>x.id!==proj.id))} label="Delete this project"/>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
      <Btn loading={saving} onClick={save}>Save Changes</Btn>
      <Toast toast={toast}/>
    </div>
  );
}
