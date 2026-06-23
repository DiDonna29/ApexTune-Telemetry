
"use client"

import * as React from "react"
import { Plus, Globe, Moon, Sun, LayoutDashboard, ChevronRight, Activity, Cpu, Settings2, BarChart3, Download, RefreshCcw } from "lucide-react"
import { Language, translations } from "@/lib/translations"
import { Setup } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { SetupForm } from "@/components/setup-form"
import { SetupCard } from "@/components/setup-card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const INITIAL_EXAMPLES: Setup[] = [
  {
    id: "ex-1",
    name: "Monza Qualy Trim",
    car: "GT3-R 2024",
    track: "Monza GP",
    tires: { fl: 27.2, fr: 27.4, rl: 27.1, rr: 27.3 },
    aero: { frontWing: 2, rearWing: 3 },
    suspension: { stiffness: 180, rideHeight: 55, camber: -3.5, toe: 0.05 },
    updatedAt: Date.now() - 3600000
  },
  {
    id: "ex-2",
    name: "Spa Endurance Setup",
    car: "296 GT3",
    track: "Spa-Francorchamps",
    tires: { fl: 26.5, fr: 26.5, rl: 26.5, rr: 26.5 },
    aero: { frontWing: 8, rearWing: 10 },
    suspension: { stiffness: 140, rideHeight: 75, camber: -2.8, toe: 0.12 },
    updatedAt: Date.now() - 86400000
  }
]

export default function ApexTuneApp() {
  const [lang, setLang] = React.useState<Language>('en')
  const [theme, setTheme] = React.useState<'light' | 'dark'>('dark')
  const [setups, setSetups] = React.useState<Setup[]>([])
  const [isFormOpen, setIsFormOpen] = React.useState(false)
  const [editingSetup, setEditingSetup] = React.useState<Setup | undefined>()
  const [isHydrated, setIsHydrated] = React.useState(false)

  const t = translations[lang]

  React.useEffect(() => {
    const savedSetups = localStorage.getItem('apextune_setups')
    const savedTheme = localStorage.getItem('apextune_theme') as 'light' | 'dark'
    const savedLang = localStorage.getItem('apextune_lang') as Language

    if (savedSetups && JSON.parse(savedSetups).length > 0) {
      setSetups(JSON.parse(savedSetups))
    } else {
      setSetups(INITIAL_EXAMPLES)
    }

    if (savedTheme) setTheme(savedTheme || 'dark')
    if (savedLang) setLang(savedLang || 'en')
    
    setIsHydrated(true)
  }, [])

  React.useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('apextune_setups', JSON.stringify(setups))
      localStorage.setItem('apextune_theme', theme)
      localStorage.setItem('apextune_lang', lang)
      
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [setups, theme, lang, isHydrated])

  const toggleLang = () => setLang(prev => prev === 'en' ? 'es' : 'en')
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light')

  const handleSave = (data: Omit<Setup, 'id' | 'updatedAt'>) => {
    if (editingSetup) {
      setSetups(prev => prev.map(s => s.id === editingSetup.id ? { ...data, id: s.id, updatedAt: Date.now() } : s))
    } else {
      const newSetup: Setup = {
        ...data,
        id: crypto.randomUUID(),
        updatedAt: Date.now(),
      }
      setSetups(prev => [newSetup, ...prev])
    }
    setIsFormOpen(false)
    setEditingSetup(undefined)
  }

  const handleDelete = (id: string) => {
    setSetups(prev => prev.filter(s => s.id !== id))
  }

  const handleEdit = (setup: Setup) => {
    setEditingSetup(setup)
    setIsFormOpen(true)
  }

  const handleExport = (setup: Setup) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(setup, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `apextune_${setup.name.toLowerCase().replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  const resetToExamples = () => {
    setSetups(INITIAL_EXAMPLES)
  }

  if (!isHydrated) return null

  return (
    <div className="min-h-screen bg-background text-foreground font-body overflow-x-hidden relative">
      <div className="scanline pointer-events-none" />
      
      {/* Navigation Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50 h-20 flex items-center">
        <div className="max-w-[1600px] w-full mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-primary/20 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative w-10 h-10 bg-primary rounded-sm flex items-center justify-center transform skew-x-[-12deg]">
                <ChevronRight className="w-7 h-7 text-primary-foreground stroke-[3px] skew-x-[12deg]" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-headline tracking-tighter leading-none italic">{t.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <p className="text-[9px] text-muted-foreground uppercase font-headline tracking-[0.3em] font-medium">{t.subtitle} // v3.1.0</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" onClick={toggleLang} className="rounded-none border-border hover:bg-primary/5">
              <Globe className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={toggleTheme} className="rounded-none border-border hover:bg-primary/5">
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
            <div className="h-8 w-[1px] bg-border mx-2" />
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-headline uppercase text-xs h-10 px-6 gap-2 hidden md:flex rounded-none"
              onClick={() => {
                setEditingSetup(undefined)
                setIsFormOpen(true)
              }}
            >
              <Plus className="w-4 h-4" /> {t.newSetup}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-12">
        {/* Asymmetric Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-4 lg:col-span-3 bg-card technical-border p-6 group hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <LayoutDashboard className="w-4 h-4 text-primary" />
              <p className="text-[10px] font-headline text-muted-foreground uppercase tracking-widest">{t.dashboard}</p>
            </div>
            <p className="text-5xl font-headline italic">{setups.length}</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-[9px] text-primary uppercase font-bold">Loaded Configs</span>
              <div className="h-[1px] flex-1 bg-primary/20" />
            </div>
          </div>

          <div className="md:col-span-8 lg:col-span-6 bg-card technical-border p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-headline text-muted-foreground uppercase tracking-widest">Active Circuit</p>
                <p className="text-3xl font-headline italic mt-1 uppercase truncate">{setups[0]?.track || '--'}</p>
              </div>
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-4">
              <div className="text-center">
                <p className="text-[8px] text-muted-foreground uppercase">Latency</p>
                <p className="text-xs font-headline">0.42ms</p>
              </div>
              <div className="text-center border-x border-border">
                <p className="text-[8px] text-muted-foreground uppercase">Stability</p>
                <p className="text-xs font-headline text-primary">High</p>
              </div>
              <div className="text-center">
                <p className="text-[8px] text-muted-foreground uppercase">Sync</p>
                <p className="text-xs font-headline">Local</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-12 lg:col-span-3 bg-primary text-primary-foreground p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <p className="text-[10px] font-headline uppercase tracking-widest opacity-80">System Status</p>
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <p className="text-4xl font-headline italic leading-none">READY</p>
              <p className="text-[10px] uppercase font-bold mt-2 opacity-80">Simulator Interface Online</p>
            </div>
          </div>
        </section>

        {/* Setup Grid Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b-2 border-primary/20 pb-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-headline italic flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-primary" />
                Telemetry Repository
              </h2>
              <span className="bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">Version 3.1</span>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-9 font-headline text-[10px] uppercase rounded-none border-muted-foreground/30 hover:border-primary text-muted-foreground hover:text-primary transition-all"
                onClick={resetToExamples}
              >
                <RefreshCcw className="w-3 h-3 mr-2" /> Load Examples
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="md:hidden h-9 font-headline text-[10px] uppercase rounded-none border-primary text-primary"
                onClick={() => {
                  setEditingSetup(undefined)
                  setIsFormOpen(true)
                }}
              >
                <Plus className="w-3 h-3 mr-1" /> {t.newSetup}
              </Button>
            </div>
          </div>

          {setups.length === 0 ? (
            <div className="bg-card/30 border border-dashed border-border py-24 flex flex-col items-center justify-center text-center space-y-6 technical-border">
              <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center">
                <Settings2 className="w-8 h-8 text-muted-foreground/30" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-headline uppercase italic text-muted-foreground">{t.noSetups}</p>
                <p className="text-xs text-muted-foreground/60 max-w-xs uppercase tracking-widest">Connect your telemetry feed or create a manual profile</p>
              </div>
              <Button 
                onClick={() => setIsFormOpen(true)}
                className="bg-primary hover:bg-primary/90 rounded-none h-11 px-8 font-headline uppercase"
              >
                <Plus className="w-4 h-4 mr-2" /> {t.newSetup}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {setups.map((setup, idx) => (
                <div key={setup.id} className="space-y-2">
                  <SetupCard 
                    setup={setup} 
                    lang={lang} 
                    onEdit={handleEdit} 
                    onDelete={handleDelete} 
                  />
                  <Button 
                    variant="ghost" 
                    className="w-full rounded-none border border-border/50 h-9 font-headline text-[10px] uppercase gap-2 hover:bg-primary/10 hover:text-primary transition-colors"
                    onClick={() => handleExport(setup)}
                  >
                    <Download className="w-3 h-3" /> {t.export}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Setup Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={(open) => {
        if (!open) {
          setIsFormOpen(false)
          setEditingSetup(undefined)
        }
      }}>
        <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto bg-background/95 backdrop-blur-2xl border-primary border-t-8 rounded-none p-0">
          <div className="p-8">
            <DialogHeader className="mb-12">
              <DialogTitle className="text-3xl font-headline italic uppercase flex items-center gap-4">
                <div className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center skew-x-[-12deg]">
                  <Settings2 className="w-6 h-6 skew-x-[12deg]" />
                </div>
                {editingSetup ? t.editSetup : t.newSetup}
              </DialogTitle>
            </DialogHeader>
            <SetupForm 
              initialData={editingSetup} 
              lang={lang} 
              onSave={handleSave} 
              onCancel={() => setIsFormOpen(false)} 
            />
          </div>
        </DialogContent>
      </Dialog>

      <footer className="mt-20 border-t border-border py-12 px-8 bg-muted/5">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 grayscale opacity-50">
             <ChevronRight className="w-5 h-5 text-primary stroke-[3px]" />
             <p className="text-xs font-headline uppercase tracking-[0.2em]">{t.title}</p>
          </div>
          <div className="flex gap-8 text-[10px] text-muted-foreground font-headline uppercase tracking-widest">
            <span className="hover:text-primary cursor-pointer transition-colors">Telemetry API</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Documentation</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Privacy Protocol</span>
          </div>
          <p className="text-[10px] text-muted-foreground uppercase font-headline">© 2024 ApexTune High Performance</p>
        </div>
      </footer>
    </div>
  )
}
