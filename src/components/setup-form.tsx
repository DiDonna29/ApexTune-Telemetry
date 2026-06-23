
"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Gauge, Wind, Activity, Save, X } from "lucide-react"
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
    <form onSubmit={handleSubmit(onSave)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label className="font-headline text-xs">{t.name}</Label>
          <Input {...register("name")} placeholder={t.placeholderName} className="bg-background/50" />
        </div>
        <div className="space-y-2">
          <Label className="font-headline text-xs">{t.car}</Label>
          <Input {...register("car")} placeholder={t.placeholderCar} className="bg-background/50" />
        </div>
        <div className="space-y-2">
          <Label className="font-headline text-xs">{t.track}</Label>
          <Input {...register("track")} placeholder={t.placeholderTrack} className="bg-background/50" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tires Pod */}
        <Card className="border-t-2 border-t-primary bg-card/50 shadow-none">
          <CardHeader className="py-4">
            <CardTitle className="text-sm flex items-center gap-2">
              <Gauge className="w-4 h-4 text-primary" />
              {t.tirePressure}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground uppercase">{t.fl}</Label>
              <Input type="number" step="0.1" {...register("tires.fl", { valueAsNumber: true })} className="h-8 text-xs" />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground uppercase">{t.fr}</Label>
              <Input type="number" step="0.1" {...register("tires.fr", { valueAsNumber: true })} className="h-8 text-xs" />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground uppercase">{t.rl}</Label>
              <Input type="number" step="0.1" {...register("tires.rl", { valueAsNumber: true })} className="h-8 text-xs" />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground uppercase">{t.rr}</Label>
              <Input type="number" step="0.1" {...register("tires.rr", { valueAsNumber: true })} className="h-8 text-xs" />
            </div>
          </CardContent>
        </Card>

        {/* Aero Pod */}
        <Card className="border-t-2 border-t-primary bg-card/50 shadow-none">
          <CardHeader className="py-4">
            <CardTitle className="text-sm flex items-center gap-2">
              <Wind className="w-4 h-4 text-primary" />
              {t.aerodynamics}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground uppercase">{t.frontWing}</Label>
              <Input type="number" {...register("aero.frontWing", { valueAsNumber: true })} className="h-8 text-xs" />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground uppercase">{t.rearWing}</Label>
              <Input type="number" {...register("aero.rearWing", { valueAsNumber: true })} className="h-8 text-xs" />
            </div>
          </CardContent>
        </Card>

        {/* Suspension Pod */}
        <Card className="border-t-2 border-t-primary bg-card/50 shadow-none">
          <CardHeader className="py-4">
            <CardTitle className="text-sm flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              {t.suspension}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground uppercase">{t.stiffness}</Label>
              <Input type="number" {...register("suspension.stiffness", { valueAsNumber: true })} className="h-8 text-xs" />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground uppercase">{t.rideHeight}</Label>
              <Input type="number" {...register("suspension.rideHeight", { valueAsNumber: true })} className="h-8 text-xs" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="gap-2">
          <X className="w-4 h-4" /> {t.cancel}
        </Button>
        <Button type="submit" className="gap-2 bg-primary hover:bg-primary/90">
          <Save className="w-4 h-4" /> {t.saveSetup}
        </Button>
      </div>
    </form>
  )
}
