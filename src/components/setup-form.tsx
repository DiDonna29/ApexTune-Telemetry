"use client"

import * as React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Gauge, Wind, Activity, Save, X, Terminal, ArrowRight, Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { translations, Language } from "@/lib/translations"
import { Setup } from "@/lib/types"

const formSchema = z.object({
  name: z.string().min(1),
  car: z.string().min(1),
  track: z.string().min(1),
  tires: z.object({
    fl: z.number(),
    fr: z.number(),
    rl: z.number(),
    rr: z.number(),
  }),
  aero: z.object({
    frontWing: z.number(),
    rearWing: z.number(),
  }),
  suspension: z.object({
    stiffness: z.number(),
    rideHeight: z.number(),
    camber: z.number(),
    toe: z.number(),
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
  const { register, handleSubmit, control, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      car: "",
      track: "",
      tires: { fl: 28.5, fr: 28.5, rl: 28.5, rr: 28.5 },
      aero: { frontWing: 5, rearWing: 5 },
      suspension: { stiffness: 150, rideHeight: 60, camber: -3.0, toe: 0.1 },
    },
  })

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-8">
      {/* Identification Section */}
      <section className="bg-muted/10 p-6 technical-border space-y-6">
        <div className="flex items-center gap-3">
          <Terminal className="w-4 h-4 text-primary" />
          <h3 className="text-xs font-headline uppercase tracking-widest font-bold">Metadata Calibration</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t.name}</Label>
            <Input {...register("name")} placeholder={t.placeholderName} className="rounded-none h-11 bg-background" />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t.car}</Label>
            <Input {...register("car")} placeholder={t.placeholderCar} className="rounded-none h-11 bg-background" />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t.track}</Label>
            <Input {...register("track")} placeholder={t.placeholderTrack} className="rounded-none h-11 bg-background" />
          </div>
        </div>
      </section>

      {/* Accordion Sections */}
      <Accordion type="single" collapsible defaultValue="tires" className="w-full space-y-4">
        {/* Tires Section */}
        <AccordionItem value="tires" className="border technical-border px-6 py-2 bg-card">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-4">
              <Gauge className="w-5 h-5 text-primary" />
              <span className="font-headline uppercase text-sm tracking-widest">{t.tirePressure}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-6 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {(['fl', 'fr', 'rl', 'rr'] as const).map((pos) => (
                <div key={pos} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-[9px] uppercase font-bold text-muted-foreground">{t[pos]}</Label>
                    <Controller
                      name={`tires.${pos}`}
                      control={control}
                      render={({ field }) => (
                        <span className="text-xs font-mono text-primary font-bold">{field.value.toFixed(1)} PSI</span>
                      )}
                    />
                  </div>
                  <Controller
                    name={`tires.${pos}`}
                    control={control}
                    render={({ field }) => (
                      <Slider
                        min={15}
                        max={40}
                        step={0.1}
                        value={[field.value]}
                        onValueChange={(val) => field.onChange(val[0])}
                        className="py-4"
                      />
                    )}
                  />
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Aero Section */}
        <AccordionItem value="aero" className="border technical-border px-6 py-2 bg-card">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-4">
              <Wind className="w-5 h-5 text-primary" />
              <span className="font-headline uppercase text-sm tracking-widest">{t.aerodynamics}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-6 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {(['frontWing', 'rearWing'] as const).map((part) => (
                <div key={part} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-[9px] uppercase font-bold text-muted-foreground">{t[part]}</Label>
                    <Controller
                      name={`aero.${part}`}
                      control={control}
                      render={({ field }) => (
                        <span className="text-xs font-mono text-primary font-bold">{field.value} POS</span>
                      )}
                    />
                  </div>
                  <Controller
                    name={`aero.${part}`}
                    control={control}
                    render={({ field }) => (
                      <Slider
                        min={0}
                        max={20}
                        step={1}
                        value={[field.value]}
                        onValueChange={(val) => field.onChange(val[0])}
                        className="py-4"
                      />
                    )}
                  />
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Suspension Section */}
        <AccordionItem value="suspension" className="border technical-border px-6 py-2 bg-card">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-4">
              <Activity className="w-5 h-5 text-primary" />
              <span className="font-headline uppercase text-sm tracking-widest">{t.suspension}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-6 pb-8 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-[9px] uppercase font-bold text-muted-foreground">{t.stiffness}</Label>
                  <Controller
                    name="suspension.stiffness"
                    control={control}
                    render={({ field }) => (
                      <span className="text-xs font-mono text-primary font-bold">{field.value} N/mm</span>
                    )}
                  />
                </div>
                <Controller
                  name="suspension.stiffness"
                  control={control}
                  render={({ field }) => (
                    <Slider
                      min={50}
                      max={300}
                      step={5}
                      value={[field.value]}
                      onValueChange={(val) => field.onChange(val[0])}
                      className="py-4"
                    />
                  )}
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-[9px] uppercase font-bold text-muted-foreground">{t.rideHeight}</Label>
                  <Controller
                    name="suspension.rideHeight"
                    control={control}
                    render={({ field }) => (
                      <span className="text-xs font-mono text-primary font-bold">{field.value} mm</span>
                    )}
                  />
                </div>
                <Controller
                  name="suspension.rideHeight"
                  control={control}
                  render={({ field }) => (
                    <Slider
                      min={30}
                      max={150}
                      step={1}
                      value={[field.value]}
                      onValueChange={(val) => field.onChange(val[0])}
                      className="py-4"
                    />
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-[9px] uppercase font-bold text-muted-foreground">{t.camber}</Label>
                  <Controller
                    name="suspension.camber"
                    control={control}
                    render={({ field }) => (
                      <span className="text-xs font-mono text-primary font-bold">{field.value.toFixed(1)}°</span>
                    )}
                  />
                </div>
                <Controller
                  name="suspension.camber"
                  control={control}
                  render={({ field }) => (
                    <Slider
                      min={-5.0}
                      max={0.0}
                      step={0.1}
                      value={[field.value]}
                      onValueChange={(val) => field.onChange(val[0])}
                      className="py-4"
                    />
                  )}
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-[9px] uppercase font-bold text-muted-foreground">{t.toe}</Label>
                  <Controller
                    name="suspension.toe"
                    control={control}
                    render={({ field }) => (
                      <span className="text-xs font-mono text-primary font-bold">{field.value.toFixed(2)} mm</span>
                    )}
                  />
                </div>
                <Controller
                  name="suspension.toe"
                  control={control}
                  render={({ field }) => (
                    <Slider
                      min={-0.5}
                      max={0.5}
                      step={0.01}
                      value={[field.value]}
                      onValueChange={(val) => field.onChange(val[0])}
                      className="py-4"
                    />
                  )}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

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