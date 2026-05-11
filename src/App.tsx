import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, BookOpen, Microscope, Landmark, 
  Palette, HeartPulse, Users, CheckCircle2, ChevronRight, Printer, Send, Sparkles 
} from 'lucide-react';

export default function DeepFacultyMapApp() {
  const [step, setStep] = useState<'welcome' | 'user-info' | 'test' | 'result'>('welcome');
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ STEM: 0, Umanistica: 0, Salute: 0, EconomicoGiuridica: 0, Artistica: 0, Sociale: 0 });

  const questions = [
    { id: 1, text: "Ti senti stimolato di fronte a un problema logico o matematico complesso", dim: "STEM" },
    { id: 2, text: "Trovi affascinante analizzare testi letterari o filosofici", dim: "Umanistica" },
    { id: 3, text: "Vorresti capire come funzionano le malattie per trovare nuove cure", dim: "Salute" },
    { id: 4, text: "Ti incuriosisce capire come le aziende producono profitto", dim: "EconomicoGiuridica" },
    { id: 5, text: "Ti piace l'idea di progettare l'estetica di un prodotto o di un edificio", dim: "Artistica" },
    { id: 6, text: "Sei attratto dallo studio della mente umana e dei comportamenti sociali", dim: "Sociale" },
    { id: 7, text: "Passeresti ore a programmare o a capire il funzionamento di un software", dim: "STEM" },
    { id: 8, text: "Ti interessa lo studio delle civiltà antiche e della loro evoluzione", dim: "Umanistica" },
    { id: 9, text: "Ti senti a tuo agio in un ambiente ospedaliero o di laboratorio", dim: "Salute" },
    { id: 10, text: "Ti piace l'idea di difendere i diritti di qualcuno in un'aula di tribunale", dim: "EconomicoGiuridica" },
    { id: 11, text: "Ami esprimerti attraverso la fotografia, il video o le arti visive", dim: "Artistica" },
    { id: 12, text: "Ti piacerebbe lavorare per migliorare le condizioni di vita di comunità svantaggiate", dim: "Sociale" },
    { id: 13, text: "Ti affascina l'esplorazione dello spazio e i segreti dell'universo", dim: "STEM" },
    { id: 14, text: "Ti piace scrivere saggi, articoli o approfondimenti culturali", dim: "Umanistica" },
    { id: 15, text: "Ti interessa la biologia cellulare e la genetica", dim: "Salute" },
    { id: 16, text: "Segui con interesse le notizie su borsa, mercati e politica economica", dim: "EconomicoGiuridica" },
    { id: 17, text: "Ti piacerebbe curare l'allestimento di una mostra o di un evento creativo", dim: "Artistica" },
    { id: 18, text: "Ti senti portato per l'insegnamento e la trasmissione del sapere", dim: "Sociale" },
    { id: 19, text: "Vorresti capire come costruire motori, ponti o sistemi energetici efficienti", dim: "STEM" },
    { id: 20, text: "Ami imparare nuove lingue straniere per connetterti con altre culture", dim: "Umanistica" },
    { id: 21, text: "Ti piacerebbe studiare come l'alimentazione influisce sulla salute", dim: "Salute" },
    { id: 22, text: "Ti affascina la diplomazia e i rapporti tra gli Stati", dim: "EconomicoGiuridica" },
    { id: 23, text: "Ti interessa il mondo della moda, dell'interior design o della grafica", dim: "Artistica" },
    { id: 24, text: "Ti piace mediare nei conflitti e aiutare le persone a capirsi", dim: "Sociale" },
    { id: 25, text: "Sei curioso di scoprire come l'intelligenza artificiale cambierà il mondo", dim: "STEM" },
    { id: 26, text: "Ti piace studiare come il linguaggio influenza il nostro modo di pensare", dim: "Umanistica" },
    { id: 27, text: "Vorresti approfondire lo studio dei farmaci e dei loro effetti", dim: "Salute" },
    { id: 28, text: "Ti vedi bene nel ruolo di manager o leader di un team organizzato", dim: "EconomicoGiuridica" },
    { id: 29, text: "Ami sperimentare nuove forme di comunicazione visiva o multimediale", dim: "Artistica" },
    { id: 30, text: "Ti interessa lo studio delle istituzioni politiche e della pubblica amministrazione", dim: "Sociale" }
  ];

  const profiles: any = {
    STEM: { title: "Area Scientifico-Tecnologica", faculties: "Ingegneria, Informatica, Fisica, Matematica, IA, Statistica.", desc: "Sei guidato dalla curiosità di capire 'come' funzionano le cose. La tua mente è analitica e innovativa.", icon: <Microscope />, color: "#4f46e5" },
    Umanistica: { title: "Area Umanistica e Culturale", faculties: "Lettere, Filosofia, Lingue, Storia, Archeologia, Beni Culturali.", desc: "Il tuo mondo è fatto di parole e concetti. Hai una spiccata capacità critica e ami le radici della cultura.", icon: <BookOpen />, color: "#701a75" },
    Salute: { title: "Area Medico-Sanitaria", faculties: "Medicina, Professioni Sanitarie, Biologia, Farmacia, Veterinaria.", desc: "La tua vocazione è la vita. Unisci rigore scientifico alla volontà di prenderti cura del benessere altrui.", icon: <HeartPulse />, color: "#ef4444" },
    EconomicoGiuridica: { title: "Area Economico-Giuridica", faculties: "Economia, Management, Giurisprudenza, Scienze Politiche.", desc: "Sei un osservatore delle regole che muovono il mondo: mercati, leggi e organizzazioni. Sei strategico.", icon: <Landmark />, color: "#0f172a" },
    Artistica: { title: "Area Creativa e Design", faculties: "Architettura, Design, Belle Arti, DAMS, Nuove Tecnologie per l'Arte.", desc: "Vedi bellezza e potenziale ovunque. Hai bisogno di dare forma visiva alle tue idee originali.", icon: <Palette />, color: "#d946ef" },
    Sociale: { title: "Area Sociale ed Educativa", faculties: "Psicologia, Scienze dell'Educazione, Servizio Sociale, Formazione Primaria.", desc: "Il tuo baricentro sono gli altri. Ti interessa il comportamento umano e la crescita delle persone.", icon: <Users />, color: "#0ea5e9" }
  };

  const handleAnswer = (val: number) => {
    const dim = questions[currentIdx].dim;
    setScores(prev => ({ ...prev, [dim]: prev[dim] + val }));
    if (currentIdx < questions.length - 1) setCurrentIdx(currentIdx + 1);
    else setStep('result');
  };

  const dominant = useMemo(() => Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b), [scores, step]);

  const sendEmail = () => {
    const subject = encodeURIComponent(`Mappa delle Facoltà - Risultato di ${userData.name}`);
    const body = encodeURIComponent(`Ciao ${userData.name}!\n\nEcco il risultato del tuo test:\n\nAREA: ${profiles[dominant].title}\nFACCOLTÀ: ${profiles[dominant].faculties}\n\n${profiles[dominant].desc}`);
    window.location.href = `mailto:${userData.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="app-wrapper">
      <style>{`
        .app-wrapper { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #FDFBFE; font-family: sans-serif; padding: 20px; }
        .card { max-width: 800px; width: 100%; background: white; border-radius: 45px; box-shadow: 0 40px 100px rgba(112,26,117,0.15); overflow: hidden; border: 1px solid #f3e8ff; }
        .content { padding: 50px; text-align: center; }
        .icon-header { background: #701a75; color: white; padding: 25px; border-radius: 28px; display: inline-flex; margin-bottom: 30px; rotate: 2deg; }
        h1 { color: #0f172a; font-size: 48px; font-weight: 900; margin: 0; letter-spacing: -2px; }
        .subtitle { color: #64748b; font-size: 19px; margin: 25px 0 45px; line-height: 1.6; }
        .btn-main { background: #1e293b; color: white; width: 100%; padding: 22px; border-radius: 22px; font-weight: 800; font-size: 18px; border: none; cursor: pointer; transition: 0.3s; }
        .btn-main:hover { background: #701a75; transform: translateY(-2px); }
        .input-field { width: 100%; padding: 20px; background: #f8fafc; border: 2px solid transparent; border-radius: 22px; margin-bottom: 15px; font-size: 16px; outline: none; box-sizing: border-box; }
        .likert-btn { width: 100%; text-align: left; padding: 20px; background: white; border: 2px solid #f1f5f9; border-radius: 22px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .likert-btn:hover { border-color: #701a75; background: #faf5ff; }
        .progress-bar { height: 10px; background: #f1f5f9; width: 100%; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, #701a75, #d946ef); transition: width 0.4s; }
        .result-box { background: #0f172a; color: white; padding: 45px; border-radius: 40px; margin: 30px 0; text-align: left; }
        .faculty-list { background: #f5f3ff; color: #701a75; padding: 25px; border-radius: 25px; font-weight: 800; margin-top: 25px; border: 1px solid #e9d5ff; }
        @media print { .no-print { display: none; } }
      `}</style>
      <div className="card">
        {step === 'test' && <div className="progress-bar"><div className="progress-fill" style={{ width: `${((currentIdx + 1) / 30) * 100}%` }}></div></div>}
        <div className="content">
          {step === 'welcome' && (
            <div>
              <div className="icon-header"><Sparkles size={45} /></div>
              <h1>Mappa delle<br/><span style={{color: '#701a75'}}>Facoltà</span></h1>
              <p className="subtitle">Analisi profonda in 30 domande per scoprire la tua area accademica ideale.</p>
              <button onClick={() => setStep('user-info')} className="btn-main">Inizia il Test</button>
            </div>
          )}
          {step === 'user-info' && (
            <div>
              <h2>Un ultimo passo</h2>
              <input type="text" placeholder="Nome" className="input-field" value={userData.name} onChange={e => setUserData({...userData, name: e.target.value})} />
              <input type="email" placeholder="Email" className="input-field" value={userData.email} onChange={e => setUserData({...userData, email: e.target.value})} />
              <button disabled={!userData.name || !userData.email} onClick={() => setStep('test')} className="btn-main">Vai alle Domande</button>
            </div>
          )}
          {step === 'test' && (
            <div style={{textAlign: 'left'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
                <span style={{color: '#701a75', fontWeight: '900', fontSize: '13px'}}>DOMANDA {currentIdx + 1} / 30</span>
              </div>
              <h2 style={{fontSize: '28px', marginBottom: '35px', lineHeight: '1.2'}}>{questions[currentIdx].text}?</h2>
              {["Per nulla", "Poco", "Molto", "Moltissimo"].map((label, i) => (
                <button key={i} onClick={() => handleAnswer(i + 1)} className="likert-btn">
                  <span style={{fontWeight: '700', color: '#334155'}}>{label}</span>
                  <ChevronRight size={20} color="#701a75" />
                </button>
              ))}
            </div>
          )}
          {step === 'result' && (
            <div>
              <CheckCircle2 size={60} color="#22c55e" style={{margin: '0 auto 20px'}} />
              <h1>Risultato per {userData.name}</h1>
              <div className="result-box">
                <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px'}}>
                  <div style={{background: 'white', color: '#0f172a', padding: '10px', borderRadius: '12px'}}>{profiles[dominant].icon}</div>
                  <h3 style={{fontSize: '28px', margin: 0}}>{profiles[dominant].title}</h3>
                </div>
                <p style={{fontSize: '18px', color: '#cbd5e1', lineHeight: '1.7'}}>{profiles[dominant].desc}</p>
                <div className="faculty-list">🎓 Corsi suggeriti:<br/><span style={{fontSize: '20px'}}>{profiles[dominant].faculties}</span></div>
              </div>
              <div style={{display: 'flex', gap: '15px'}} className="no-print">
                <button onClick={() => window.print()} className="btn-main" style={{flex: 1}}>Salva PDF</button>
                <button onClick={sendEmail} className="btn-main" style={{flex: 1, background: 'white', color: '#1e293b', border: '2px solid #f1f5f9'}}>Email</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
