import { useState } from "react";
import { useNavigation } from "../../context/NavigationContext";
import PageHeader from "../../components/layout/PageHeader";

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 bg-[#F3F3FD] border border-[#C8C8F0] text-[#5B5CE2] text-sm px-3 py-1 rounded-full">
      {label}
      <button onClick={onRemove} className="text-[#5B5CE2] hover:text-red-500 font-bold leading-none ml-0.5">×</button>
    </span>
  );
}

function PersonRow({ name, onRemove }: { name: string; onRemove: () => void }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-[#E8E8F0] last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#5B5CE2] flex items-center justify-center text-white text-xs font-bold">
          {name.charAt(0)}
        </div>
        <span className="text-sm text-[#0F0F1A]">{name}</span>
      </div>
      <button onClick={onRemove} className="text-[#6B6B80] hover:text-red-500 text-lg leading-none px-2">×</button>
    </div>
  );
}

interface AddInputProps {
  placeholder: string;
  onAdd: (val: string) => void;
}

function AddInput({ placeholder, onAdd }: AddInputProps) {
  const [val, setVal] = useState("");
  const submit = () => {
    if (val.trim()) { onAdd(val.trim()); setVal(""); }
  };
  return (
    <div className="flex gap-2 px-4 py-3">
      <input
        className="flex-1 bg-[#F8F8FC] border border-[#E8E8F0] rounded-xl px-3 py-2 text-sm text-[#0F0F1A] outline-none focus:border-[#5B5CE2]"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={placeholder}
        onKeyDown={(e) => e.key === "Enter" && submit()}
      />
      <button onClick={submit} className="bg-[#5B5CE2] text-white text-sm px-4 rounded-xl font-medium">Ekle</button>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h3 className="text-xs font-semibold text-[#6B6B80] uppercase tracking-wide mb-2 px-1">{title}</h3>
      <div className="bg-white rounded-2xl shadow-sm border border-[#E8E8F0] overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export default function PriorityRules() {
  useNavigation();
  const [people, setPeople] = useState(["Ahmet Yilmaz", "Mehmet Kaya"]);
  const [domains, setDomains] = useState(["sirket@ornek.com"]);
  const [keywords, setKeywords] = useState(["acil", "teklif", "fatura"]);
  const [lowPromo, setLowPromo] = useState(true);
  const [lowBulten, setLowBulten] = useState(true);
  const [lowSosyal, setLowSosyal] = useState(false);
  const [lowTicari, setLowTicari] = useState(true);

  const removeAt = (list: string[], setList: (v: string[]) => void, i: number) => {
    const copy = [...list]; copy.splice(i, 1); setList(copy);
  };
  const addTo = (list: string[], setList: (v: string[]) => void, val: string) => {
    setList([...list, val]);
  };

  const LowToggle = ({ label, value, onChange }: { label: string; value: boolean; onChange: () => void }) => (
    <div className="flex items-center justify-between px-4 py-3 border-b border-[#E8E8F0] last:border-0">
      <span className="text-sm text-[#0F0F1A]">{label}</span>
      <button onClick={onChange} className={`w-11 h-6 rounded-full transition-colors relative ${value ? "bg-[#5B5CE2]" : "bg-[#E8E8F0]"}`}>
        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${value ? "translate-x-5" : "translate-x-0.5"}`} />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F8FC]">
      <PageHeader title="Öncelik Kuralları" showBack />
      <div className="px-4 pt-4 pb-8">

        <SectionCard title="VIP Kisiler">
          {people.map((p, i) => (
            <PersonRow key={p} name={p} onRemove={() => removeAt(people, setPeople, i)} />
          ))}
          <AddInput placeholder="Kisi Ekle..." onAdd={(v) => addTo(people, setPeople, v)} />
        </SectionCard>

        <SectionCard title="Domains / Gönderenler">
          {domains.map((d, i) => (
            <div key={d} className="flex items-center justify-between px-4 py-3 border-b border-[#E8E8F0] last:border-0">
              <span className="text-sm text-[#0F0F1A]">{d}</span>
              <button onClick={() => removeAt(domains, setDomains, i)} className="text-[#6B6B80] hover:text-red-500 text-lg px-2">×</button>
            </div>
          ))}
          <AddInput placeholder="ornek@domain.com" onAdd={(v) => addTo(domains, setDomains, v)} />
        </SectionCard>

        <SectionCard title="Anahtar Kelimeler">
          <div className="px-4 py-3 flex flex-wrap gap-2">
            {keywords.map((kw, i) => (
              <Chip key={kw} label={kw} onRemove={() => removeAt(keywords, setKeywords, i)} />
            ))}
          </div>
          <AddInput placeholder="Kelime ekle..." onAdd={(v) => addTo(keywords, setKeywords, v)} />
        </SectionCard>

        <SectionCard title="Düsük Öncelik Kategorileri">
          <LowToggle label="Promosyonlar" value={lowPromo} onChange={() => setLowPromo(!lowPromo)} />
          <LowToggle label="Bültenler" value={lowBulten} onChange={() => setLowBulten(!lowBulten)} />
          <LowToggle label="Sosyal Medya" value={lowSosyal} onChange={() => setLowSosyal(!lowSosyal)} />
          <LowToggle label="Ticari E-postalar" value={lowTicari} onChange={() => setLowTicari(!lowTicari)} />
        </SectionCard>
      </div>
    </div>
  );
}
