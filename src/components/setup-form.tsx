"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Gauge, Wind, Activity, Save, X, Terminal, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { translations, Language } from "@/lib/translations"
import { Setup } from "@/lib/types"

const formSchema = z.object({
  name: z.string().min(1),
  car: z.string().min(1),
  track: z.string().min(1),
  tires: z.object({
    fl: z.number().min(0),
    fr: z.number().min(0),
    rl: z.number().min(0),
    rr: z.number().min(0),
  }),
  aero: z.object({
    frontWing: z.number().min(0),
    rearWing: z.number().min(0),
  }),
  suspension: z.object({
    stiffness: z.number().min(0),
    rideHeight: z.number().min(0),
  }),
})

interface SetupFormProps {
  initialData?: Setup
  lang: Language
  onSave: (data: Omit<Setup, 'id' | 'updatedAt'>) => void
  onCancel: () => void
}

export function SetupForm({ initialData, lang, onSave, onCancel }: SetupFormProps) {
  const t = translations[lang]
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      car: "",
      track: "",
      tires: { fl: 28.5, fr: 28.5, rl: 28.5, rr: 28.5 },
      aero: { frontWing: 5, rearWing: 5 },
      suspension: { stiffness: 150, rideHeight: 60 },
    },
  })

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-12">
      {/* Identification Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-l-4 border-primary pl-4">
          <Terminal className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-headline uppercase tracking-widest font-bold">Metadata Calibration</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2.5">
            <Label className="font-headline text-[10px] uppercase tracking-widest text-muted-foreground">{t.name}</Label>
            <Input {...register("name")} placeholder={t.placeholderName} className="rounded-none border-border focus:border-primary h-12 bg-muted/20" />
            {errors.name && <p className="text-[10px] text-destructive uppercase font-bold">Signal Error: Required Field</p>}
          </div>
          <div className="space-y-2.5">
            <Label className="font-headline text-[10px] uppercase tracking-widest text-muted-foreground">{t.car}</Label>
            <Input {...register("car")} placeholder={t.placeholderCar} className="rounded-none border-border focus:border-primary h-12 bg-muted/20" />
          </div>
          <div className="space-y-2.5">
            <Label className="font-headline text-[10px] uppercase tracking-widest text-muted-foreground">{t.track}</Label>
            <Input {...register("track")} placeholder={t.placeholderTrack} className="rounded-none border-border focus:border-primary h-12 bg-muted/20" />
          </div>
        </div>
      </section>

      {/* Engineering Pods Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Tires Pod */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-primary">
            <Gauge className="w-5 h-5" />
            <h3 className="text-xs font-headline uppercase tracking-[0.2em] font-bold">{t.tirePressure}</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 p-6 bg-muted/10 technical-border">
            <div className="space-y-2">
              <Label className="text-[9px] text-muted-foreground uppercase font-bold">{t.fl}</Label>
              <Input type="number" step="0.1" {...register("tires.fl", { valueAsNumber: true })} className="h-10 text-xs rounded-none border-border/50 font-mono" />
            </div>
            <div className="space-y-2">
              <Label className="text-[9px] text-muted-foreground uppercase font-bold">{t.fr}</Label>
              <Input type="number" step="0.1" {...register("tires.fr", { valueAsNumber: true })} className="h-10 text-xs rounded-none border-border/50 font-mono" />
            </div>
            <div className="space-y-2">
              <Label className="text-[9px] text-muted-foreground uppercase font-bold">{t.rl}</Label>
              <Input type="number" step="0.1" {...register("tires.rl", { valueAsNumber: true })} className="h-10 text-xs rounded-none border-border/50 font-mono" />
            </div>
            <div className="space-y-2">
              <Label className="text-[9px] text-muted-foreground uppercase font-bold">{t.rr}</Label>
              <Input type="number" step="0.1" {...register("tires.rr", { valueAsNumber: true })} className="h-10 text-xs rounded-none border-border/50 font-mono" />
            </div>
          </div>
        </div>

        {/* Aero Pod */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-primary">
            <Wind className="w-5 h-5" />
            <h3 className="text-xs font-headline uppercase tracking-[0.2em] font-bold">{t.aerodynamics}</h3>
          </div>
          <div className="space-y-4 p-6 bg-muted/10 technical-border">
            <div className="space-y-2">
              <Label className="text-[9px] text-muted-foreground uppercase font-bold">{t.frontWing}</Label>
              <Input type="number" {...register("aero.frontWing", { valueAsNumber: true })} className="h-10 text-xs rounded-none border-border/50 font-mono" />
            </div>
            <div className="space-y-2">
              <Label className="text-[9px] text-muted-foreground uppercase font-bold">{t.rearWing}</Label>
              <Input type="number" {...register("aero.rearWing", { valueAsNumber: true })} className="h-10 text-xs rounded-none border-border/50 font-mono" />
            </div>
          </div>
        </div>

        {/* Suspension Pod */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-primary">
            <Activity className="w-5 h-5" />
            <h3 className="text-xs font-headline uppercase tracking-[0.2em] font-bold">{t.suspension}</h3>
          </div>
          <div className="space-y-4 p-6 bg-muted/10 technical-border">
            <div className="space-y-2">
              <Label className="text-[9px] text-muted-foreground uppercase font-bold">{t.stiffness}</Label>
              <Input type="number" {...register("suspension.stiffness", { valueAsNumber: true })} className="h-10 text-xs rounded-none border-border/50 font-mono" />
            </div>
            <div className="space-y-2">
              <Label className="text-[9px] text-muted-foreground uppercase font-bold">{t.rideHeight}</Label>
              <Input type="number" {...register("suspension.rideHeight", { valueAsNumber: true })} className="h-10 text-xs rounded-none border-border/50 font-mono" />
            </div>
          </div>
        </div>
      </section>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-border/50">
        <div className="flex items-center gap-4 text-[10px] font-headline uppercase tracking-widest opacity-40">
          <ArrowRight className="w-3 h-3 text-primary" />
          <span>Encryption Secure</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span>Local Write Sync</span>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1 md:flex-none h-12 px-8 rounded-none uppercase font-headline text-xs gap-2">
            <X className="w-4 h-4" /> {t.cancel}
          </Button>
          <Button type="submit" className="flex-1 md:flex-none h-12 px-10 rounded-none uppercase font-headline text-xs gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Save className="w-4 h-4" /> {t.saveSetup}
          </Button>
        </div>
      </div>
    </form>
  )
}
