
"use client"

import * as React from "react"
import { Trash2, Edit3, Car, MapPin, Gauge, Wind, Activity } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Setup } from "@/lib/types"
import { translations, Language } from "@/lib/translations"

interface SetupCardProps {
  setup: Setup
  lang: Language
  onEdit: (setup: Setup) => void
  onDelete: (id: string) => void
}

export function SetupCard({ setup, lang, onEdit, onDelete }: SetupCardProps) {
  const t = translations[lang]

  return (
    <Card className="group border-border bg-card hover:border-primary transition-all duration-150 shadow-none overflow-hidden flex flex-col">
      <CardHeader className="bg-muted/30 pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-[10px] font-headline text-primary uppercase tracking-widest">{setup.car}</p>
            <CardTitle className="text-lg font-headline">{setup.name}</CardTitle>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" onClick={() => onEdit(setup)} className="h-8 w-8">
              <Edit3 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(setup.id)} className="h-8 w-8 text-destructive hover:text-destructive">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="truncate">{setup.track}</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Visual Mini MFD */}
          <div className="bg-muted/20 p-2 rounded flex flex-col items-center justify-center">
            <Gauge className="w-4 h-4 mb-1 text-primary" />
            <span className="text-[10px] font-headline uppercase">{setup.tires.fl}/{setup.tires.fr}</span>
            <span className="text-[8px] text-muted-foreground">PSI</span>
          </div>
          <div className="bg-muted/20 p-2 rounded flex flex-col items-center justify-center">
            <Wind className="w-4 h-4 mb-1 text-primary" />
            <span className="text-[10px] font-headline uppercase">{setup.aero.frontWing}/{setup.aero.rearWing}</span>
            <span className="text-[8px] text-muted-foreground">AERO</span>
          </div>
          <div className="bg-muted/20 p-2 rounded flex flex-col items-center justify-center">
            <Activity className="w-4 h-4 mb-1 text-primary" />
            <span className="text-[10px] font-headline uppercase">{setup.suspension.rideHeight}</span>
            <span className="text-[8px] text-muted-foreground">RH MM</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-3 text-[10px] text-muted-foreground border-t border-border flex justify-between">
        <span>ID: {setup.id.split('-')[0].toUpperCase()}</span>
        <span>{new Date(setup.updatedAt).toLocaleDateString(lang)}</span>
      </CardFooter>
    </Card>
  )
}
