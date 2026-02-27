"use client";
import { useState, useEffect } from "react";
import { SectionHeader, Card, Input, Btn, TagInput, Toast, useToast, ConfirmDelete } from "@/components/admin/ui";

type SkillGroup = { category:string; items:string[] };

export default function SkillsPage() {
  const [groups, setGroups] = useState<SkillGroup[]>([]);
  const [saving, setSaving] = useState(false);
  const [newCat, setNewCat] = useState("");
  const { toast, show } = useToast();

  useEffect(()=>{ fetch("/api/portfolio").then(r=>r.json()).then(d=>setGroups(d.skills)); },[]);

  const save = async () => {
    setSaving(true);
    const res = await fetch("/api/portfolio",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({skills:groups})});
    setSaving(false);
    show(res.ok?"Skills saved!":"Failed",res.ok?"success":"error");
  };

  const addCat = () => { if(newCat.trim()){ setGroups(g=>[...g,{category:newCat.trim(),items:[]}]); setNewCat(""); } };

  return (
    <div className="max-w-2xl">
      <SectionHeader title="Skills" description="Manage your skill categories and items"/>
      <div className="space-y-4 mb-6">
        {groups.map((group,i)=>(
          <Card key={i}>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-1">
                <Input label="Category" value={group.category}
                  onChange={e=>setGroups(g=>g.map((grp,idx)=>idx===i?{...grp,category:e.target.value}:grp))}/>
              </div>
              <div className="pt-6">
                <ConfirmDelete onConfirm={()=>setGroups(g=>g.filter((_,idx)=>idx!==i))} label="✕"/>
              </div>
            </div>
            <TagInput label="Skills" tags={group.items}
              onChange={items=>setGroups(g=>g.map((grp,idx)=>idx===i?{...grp,items}:grp))}/>
          </Card>
        ))}
      </div>
      <Card className="mb-6 flex items-end gap-3">
        <div className="flex-1">
          <Input label="New Category" value={newCat} onChange={e=>setNewCat(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&(e.preventDefault(),addCat())} placeholder="e.g. Mobile, Cloud…"/>
        </div>
        <Btn variant="secondary" onClick={addCat}>Add Category</Btn>
      </Card>
      <Btn loading={saving} onClick={save}>Save Changes</Btn>
      <Toast toast={toast}/>
    </div>
  );
}
