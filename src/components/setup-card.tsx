"use client"

import * as React from "react"
import { Trash2, Edit3, Car, MapPin, Gauge, Wind, Activity, Maximize2, Terminal } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Setup } from "@/lib/types"
import { translations, Language } from "@/lib/translations"
import { cn } from "@/lib/utils"

interface SetupCardProps {
  setup: Setup
  lang: Language
  onEdit: (setup: Setup) => void
  onDelete: (id: string) => void
}

export function SetupCard({ setup, lang, onEdit, onDelete }: SetupCardProps) {
  const t = translations[lang]

  return (
    <Card className="group relative border-border bg-card hover:border-primary/50 transition-all duration-300 rounded-none overflow-hidden technical-border flex flex-col h-full shadow-lg hover:shadow-primary/5">
      {/* Visual Accent Decoration */}
      <div className="absolute top-0 right-0 w-16 h-1 bg-primary transform translate-x-8 rotate-45 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <CardHeader className="bg-muted/10 pb-4 pt-6 px-6">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <Car className="w-3 h-3 text-primary" />
              <p className="text-[10px] font-headline text-primary uppercase tracking-[0.2em] font-bold truncate">{setup.car}</p>
            </div>
            <CardTitle className="text-xl font-headline italic truncate uppercase group-hover:text-primary transition-colors">{setup.name}</CardTitle>
          </div>
          <div className="flex gap-2 shrink-0">
             <Button variant="ghost" size="icon" onClick={() => onEdit(setup)} className="h-8 w-8 rounded-none border border-transparent hover:border-border">
              <Edit3 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 flex-grow space-y-6">
        <div className="flex items-center gap-2.5 text-[11px] font-headline text-muted-foreground uppercase tracking-wider bg-muted/30 px-3 py-2 border-l-2 border-primary">
          <MapPin className="w-3.5 h-3.5" />
          <span className="truncate">{setup.track}</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-muted/10 p-3 flex flex-col items-center justify-center border border-border/50 group-hover:border-primary/20 transition-colors">
            <Gauge className="w-4 h-4 mb-2 text-primary opacity-70" />
            <div className="text-center">
              <p className="text-[10px] font-headline leading-none uppercase font-bold">{setup.tires.fl}</p>
              <p className="text-[8px] text-muted-foreground uppercase mt-1">PSI FR-L</p>
            </div>
          </div>
          <div className="bg-muted/10 p-3 flex flex-col items-center justify-center border border-border/50 group-hover:border-primary/20 transition-colors">
            <Wind className="w-4 h-4 mb-2 text-primary opacity-70" />
            <div className="text-center">
              <p className="text-[10px] font-headline leading-none uppercase font-bold">{setup.aero.rearWing}</p>
              <p className="text-[8px] text-muted-foreground uppercase mt-1">WNG-R</p>
            </div>
          </div>
          <div className="bg-muted/10 p-3 flex flex-col items-center justify-center border border-border/50 group-hover:border-primary/20 transition-colors">
            <Activity className="w-4 h-4 mb-2 text-primary opacity-70" />
            <div className="text-center">
              <p className="text-[10px] font-headline leading-none uppercase font-bold">{setup.suspension.rideHeight}</p>
              <p className="text-[8px] text-muted-foreground uppercase mt-1">RH MM</p>
            </div>
          </div>
        </div>

        {/* Small Data Visualization Line */}
        <div className="space-y-1.5 opacity-60">
           <div className="flex justify-between text-[8px] font-headline uppercase">
             <span>Suspension Load</span>
             <span>88%</span>
           </div>
           <div className="h-1 bg-muted overflow-hidden">
             <div className="h-full bg-primary w-[88%]" />
           </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4 text-[9px] text-muted-foreground border-t border-border flex justify-between items-center bg-muted/5 font-headline uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <Terminal className="w-3 h-3 text-primary/40" />
          <span>UUID: {setup.id.split('-')[0]}</span>
        </div>
        <div className="flex items-center gap-3">
          <span>{new Date(setup.updatedAt).toLocaleDateString(lang, { month: 'short', day: '2-digit', year: 'numeric' })}</span>
          <button 
            onClick={() => onDelete(setup.id)}
            className="text-destructive hover:scale-110 transition-transform p-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </CardFooter>
    </Card>
  )
}
