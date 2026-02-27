"use client";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { SectionHeader, Card, Input, Textarea, Btn, TagInput, Toast, useToast, ConfirmDelete } from "@/components/admin/ui";

type Job = { id:string; company:string; role:string; period:string; location:string; description:string; tags:string[] };
const empty = (): Job => ({ id:uuidv4(), company:"", role:"", period:"", location:"", description:"", tags:[] });

export default function ExperiencePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState<string|null>(null);
  const { toast, show } = useToast();

  useEffect(()=>{ fetch("/api/portfolio").then(r=>r.json()).then(d=>{ setJobs(d.experience); setOpen(d.experience[0]?.id??null); }); },[]);

  const save = async () => {
    setSaving(true);
    const res = await fetch("/api/portfolio",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({experience:jobs})});
    setSaving(false);
    show(res.ok?"Saved!":"Failed",res.ok?"success":"error");
  };

  const upd = (id:string, field:keyof Job, val:unknown) => setJobs(j=>j.map(job=>job.id===id?{...job,[field]:val}:job));
  const add = () => { const j=empty(); setJobs(x=>[j,...x]); setOpen(j.id); };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <SectionHeader title="Experience" description="Your work history"/>
        <Btn onClick={add}>+ Add Job</Btn>
      </div>
      <div className="space-y-3 mb-6">
        {jobs.map(job=>{
          const isOpen = open===job.id;
          return (
            <Card key={job.id}>
              <button type="button" className="w-full flex items-center justify-between text-left" onClick={()=>setOpen(isOpen?null:job.id)}>
                <div>
                  <p className="font-medium text-ink text-sm">{job.role||<span className="text-muted italic">New Job</span>}</p>
                  <p className="text-xs text-muted">{job.company}{job.period?` · ${job.period}`:""}</p>
                </div>
                <span className="text-muted text-lg">{isOpen?"↑":"↓"}</span>
              </button>
              {isOpen&&(
                <div className="mt-5 space-y-4 border-t border-subtle pt-5">
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Company" value={job.company} onChange={e=>upd(job.id,"company",e.target.value)}/>
                    <Input label="Role" value={job.role} onChange={e=>upd(job.id,"role",e.target.value)}/>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Period" value={job.period} placeholder="2022 — Present" onChange={e=>upd(job.id,"period",e.target.value)}/>
                    <Input label="Location" value={job.location} onChange={e=>upd(job.id,"location",e.target.value)}/>
                  </div>
                  <Textarea label="Description" value={job.description} onChange={e=>upd(job.id,"description",e.target.value)}/>
                  <TagInput label="Tags" tags={job.tags} onChange={tags=>upd(job.id,"tags",tags)}/>
                  <div className="flex justify-end pt-1">
                    <ConfirmDelete onConfirm={()=>setJobs(j=>j.filter(x=>x.id!==job.id))} label="Delete this job"/>
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
