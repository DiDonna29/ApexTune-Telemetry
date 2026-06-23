
"use client"

import * as React from "react"
import { Plus, Globe, Moon, Sun, LayoutDashboard, ChevronRight } from "lucide-react"
import { Language, translations } from "@/lib/translations"
import { Setup } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { SetupForm } from "@/components/setup-form"
import { SetupCard } from "@/components/setup-card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export default function ApexTuneApp() {
  const [lang, setLang] = React.useState<Language>('en')
  const [theme, setTheme] = React.useState<'light' | 'dark'>('dark')
  const [setups, setSetups] = React.useState<Setup[]>([])
  const [isFormOpen, setIsFormOpen] = React.useState(false)
  const [editingSetup, setEditingSetup] = React.useState<Setup | undefined>()
  const [isHydrated, setIsHydrated] = React.useState(false)

  const t = translations[lang]

  // Initial load
  React.useEffect(() => {
    const savedSetups = localStorage.getItem('apextune_setups')
    const savedTheme = localStorage.getItem('apextune_theme') as 'light' | 'dark'
    const savedLang = localStorage.getItem('apextune_lang') as Language

    if (savedSetups) setSetups(JSON.parse(savedSetups))
    if (savedTheme) setTheme(savedTheme)
    if (savedLang) setLang(savedLang)
    
    setIsHydrated(true)
  }, [])

  // Sync state
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

  if (!isHydrated) return null

  return (
    <div className="min-h-screen bg-background text-foreground font-body transition-none">
      {/* Navigation Header */}
      <header className="border-b border-border bg-card/30 backdrop-blur-sm sticky top-0 z-50 px-4 md:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
            <ChevronRight className="w-6 h-6 text-primary-foreground stroke-[3px]" />
          </div>
          <div>
            <h1 className="text-xl font-headline tracking-tighter leading-none">{t.title}</h1>
            <p className="text-[10px] text-primary uppercase font-headline tracking-[0.2em]">{t.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleLang} className="hover:bg-primary/10">
            <Globe className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="hover:bg-primary/10">
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>
          <div className="h-6 w-[1px] bg-border mx-2" />
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-headline uppercase text-xs h-9 px-4 gap-2 hidden md:flex"
            onClick={() => {
              setEditingSetup(undefined)
              setIsFormOpen(true)
            }}
          >
            <Plus className="w-4 h-4" /> {t.newSetup}
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        {/* Statistics Dashboard Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border p-4 rounded-sm">
            <p className="text-[10px] font-headline text-muted-foreground uppercase">{t.dashboard}</p>
            <p className="text-2xl font-headline">{setups.length}</p>
            <p className="text-[8px] text-primary uppercase">Configurations Active</p>
          </div>
          <div className="bg-card border border-border p-4 rounded-sm">
            <p className="text-[10px] font-headline text-muted-foreground uppercase">Last Track</p>
            <p className="text-2xl font-headline truncate">{setups[0]?.track || '--'}</p>
            <p className="text-[8px] text-primary uppercase">Recent Session</p>
          </div>
          <div className="bg-card border border-border p-4 rounded-sm hidden md:block">
            <p className="text-[10px] font-headline text-muted-foreground uppercase">Status</p>
            <p className="text-2xl font-headline text-primary">LIVE</p>
            <p className="text-[8px] text-primary uppercase">Telemetry Sync</p>
          </div>
          <div className="bg-card border border-border p-4 rounded-sm hidden md:block">
            <p className="text-[10px] font-headline text-muted-foreground uppercase">Region</p>
            <p className="text-2xl font-headline uppercase">{lang === 'en' ? 'EURO' : 'LATAM'}</p>
            <p className="text-[8px] text-primary uppercase">Signal Strength</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h2 className="text-sm font-headline flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4 text-primary" />
              {t.dashboard}
            </h2>
            <Button 
              variant="outline" 
              size="sm" 
              className="md:hidden h-8 font-headline text-[10px] uppercase"
              onClick={() => {
                setEditingSetup(undefined)
                setIsFormOpen(true)
              }}
            >
              <Plus className="w-3 h-3 mr-1" /> {t.newSetup}
            </Button>
          </div>

          {setups.length === 0 ? (
            <div className="bg-card border border-dashed border-border p-16 flex flex-col items-center justify-center text-center space-y-4 rounded-sm">
              <p className="text-muted-foreground max-w-xs">{t.noSetups}</p>
              <Button 
                onClick={() => setIsFormOpen(true)}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 mr-2" /> {t.newSetup}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {setups.map(setup => (
                <SetupCard 
                  key={setup.id} 
                  setup={setup} 
                  lang={lang} 
                  onEdit={handleEdit} 
                  onDelete={handleDelete} 
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Setup Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={(open) => {
        if (!open) {
          setIsFormOpen(false)
          setEditingSetup(undefined)
        }
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border border-2">
          <DialogHeader>
            <DialogTitle className="font-headline uppercase flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              {editingSetup ? t.editSetup : t.newSetup}
            </DialogTitle>
          </DialogHeader>
          <SetupForm 
            initialData={editingSetup} 
            lang={lang} 
            onSave={handleSave} 
            onCancel={() => setIsFormOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
