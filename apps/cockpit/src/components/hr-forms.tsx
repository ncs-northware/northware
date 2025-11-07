"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertWrapper } from "@northware/ui/components/custom-alert";
import { Headline } from "@northware/ui/components/headline";
import { AlertDescription } from "@northware/ui/components/shadcn/alert";
import { Button } from "@northware/ui/components/shadcn/button";
import { Calendar } from "@northware/ui/components/shadcn/calendar";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@northware/ui/components/shadcn/field";
import { Input } from "@northware/ui/components/shadcn/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@northware/ui/components/shadcn/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@northware/ui/components/shadcn/select";
import { CalendarIcon } from "@northware/ui/icons/lucide";
import { cn, toast } from "@northware/ui/lib/utils";
import { formatDate } from "date-fns";
import { de } from "date-fns/locale";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  type BasicCompany,
  type BasicDepartment,
  type EmployeePersonal,
  type EmploymentItem,
  updateEmployeePersonal,
} from "@/lib/hr-actions";
import {
  employeePersonalFormSchema,
  type TEmployeePersonalFormSchema,
  type TUpdateEmploymentFormSchema,
  updateEmploymentFormSchema,
} from "@/lib/hr-schema";
import { parseErrorMessages } from "@/lib/rbac-schema";

export function EmployeePersonalForm({ data }: { data: EmployeePersonal }) {
  const [errors, setErrors] = useState<string[]>([]);
  const form = useForm<TEmployeePersonalFormSchema>({
    resolver: zodResolver(employeePersonalFormSchema),
    defaultValues: {
      employeeId: data.employeeId,
      sirName: data.sirName,
      firstName: data.firstName,
      sex: data.sex,
      birthday: data.birthday,
      street: data.street,
      zipcode: data.zipcode,
      city: data.city,
      meritalStatus: data.meritalStatus,
      religion: data.religion,
      taxClass: data.taxClass,
      taxKids: data.taxKids,
      phoneWork: data.phoneWork,
      mailWork: data.mailWork,
    },
  });

  async function onSubmit(formData: TEmployeePersonalFormSchema) {
    try {
      await updateEmployeePersonal(formData);
      toast.success("Die Mitarbeiterdaten wurden aktualisiert.");
    } catch (error) {
      setErrors(parseErrorMessages(error));
    }
  }
  return (
    <form
      className="flex flex-col gap-6"
      noValidate
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Controller
        control={form.control}
        name="employeeId"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="employeeId">Personalnummer</FieldLabel>
            <Input
              {...field}
              aria-invalid={fieldState.invalid}
              disabled
              id="employeeId"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Headline level="h3">Persönliche Daten</Headline>
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-3">
        <Controller
          control={form.control}
          name="sirName"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="sirName">Nachname</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                id="sirName"
                placeholder="Mustermann"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="firstName"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="sirName">Vorname</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                id="firstName"
                placeholder="Max"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-3">
        <Controller
          control={form.control}
          name="birthday"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="birthday">Geburtsdatum</FieldLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className={cn(
                      "w-60 pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                    variant={"outline"}
                  >
                    {field.value ? (
                      formatDate(field.value, "PPP", {
                        locale: de,
                      })
                    ) : (
                      <span>Geburtsdatum wählen</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    captionLayout="dropdown"
                    defaultMonth={field.value || new Date()}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    mode="single"
                    onSelect={field.onChange}
                    selected={field.value || new Date()}
                  />
                </PopoverContent>
              </Popover>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="sex"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="sex">Geschlecht</FieldLabel>
              <Select
                name={field.name}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger aria-invalid={fieldState.invalid} id="sex">
                  <SelectValue placeholder="Geschlecht wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">männlich</SelectItem>
                  <SelectItem value="female">weiblich</SelectItem>
                  <SelectItem value="diverse">divers</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <Controller
        control={form.control}
        name="street"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="street">Straße</FieldLabel>
            <Input
              {...field}
              aria-invalid={fieldState.invalid}
              id="street"
              placeholder="Musterstraße 1"
              value={field.value || ""}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-3">
        <Controller
          control={form.control}
          name="zipcode"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="zipcode">Postleitzahl</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                id="zipcode"
                placeholder="12345"
                value={field.value || ""}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="city"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="city">Ort</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                id="city"
                placeholder="Musterstadt"
                value={field.value || ""}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <Headline level="h3">Steuerliche Daten</Headline>
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-3">
        <Controller
          control={form.control}
          name="meritalStatus"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="meritalStatus">Familienstand</FieldLabel>
              <Select
                name={field.name}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger
                  aria-invalid={fieldState.invalid}
                  id="meritalStatus"
                >
                  <SelectValue placeholder="Familienstand wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ledig">ledig</SelectItem>
                  <SelectItem value="verheiratet">verheiratet</SelectItem>
                  <SelectItem value="geschieden">geschieden</SelectItem>
                  <SelectItem value="verwitwet">verwitwet</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="religion"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="religion">Religionszugehörigkeit</FieldLabel>
              <Select
                name={field.name}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger aria-invalid={fieldState.invalid} id="religion">
                  <SelectValue placeholder="Religion wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ev">evangelisch</SelectItem>
                  <SelectItem value="kath">katholisch</SelectItem>
                  <SelectItem value="andere">andere</SelectItem>
                  <SelectItem value="keine">keine</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-3">
        <Controller
          control={form.control}
          name="taxClass"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="taxClass">Steuerklasse</FieldLabel>
              <Select
                name={field.name}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger aria-invalid={fieldState.invalid} id="taxClass">
                  <SelectValue placeholder="Steuerklasse wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="I">
                    StK I / ledig oder verwitwet
                  </SelectItem>
                  <SelectItem value="II">StK II / alleinerziehend</SelectItem>
                  <SelectItem value="III">
                    StK III / verheiratet, höheres Einkommen
                  </SelectItem>
                  <SelectItem value="IV">
                    StK IV / verheiratet, änhliche Einkommen
                  </SelectItem>
                  <SelectItem value="V">
                    StK V / verheiratet, geringeres Einkommen
                  </SelectItem>
                  <SelectItem value="VI">
                    StK VI / Nebenarbeitsverhältnis
                  </SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="taxKids"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="taxKids">Kinderfreibetrag</FieldLabel>
              <Select
                name={field.name}
                onValueChange={field.onChange}
                value={field.value.toString() || "0"}
              >
                <SelectTrigger aria-invalid={fieldState.invalid} id="taxKids">
                  <SelectValue placeholder="Kinderfreibetrag wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">keine Kinderfreibeträge (0)</SelectItem>
                  <SelectItem value="1">0,5 Kinderfreibeträge</SelectItem>
                  <SelectItem value="2">1,0 Kinderfreibeträge</SelectItem>
                  <SelectItem value="3">1,5 Kinderfreibeträge</SelectItem>
                  <SelectItem value="4">2,0 Kinderfreibeträge</SelectItem>
                  <SelectItem value="5">2,5 Kinderfreibeträge</SelectItem>
                  <SelectItem value="6">3,0 Kinderfreibeträge</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <Headline level="h3">Dienstliche Kontaktdaten</Headline>
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-3">
        <Controller
          control={form.control}
          name="mailWork"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="mailWork">E-Mail-Adresse</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                id="mailWork"
                placeholder="mmuster@test.de"
                type="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="phoneWork"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="phoneWork">Telefonnummer</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                id="phoneWork"
                placeholder="0123 456789-10"
                type="tel"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      {errors.length > 0 && (
        <AlertWrapper variant="destructive">
          <AlertDescription>
            <ul>
              {errors.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          </AlertDescription>
        </AlertWrapper>
      )}
      <Field>
        <Button type="submit">Änderungen speichern</Button>
      </Field>
    </form>
  );
}

export function UpdateEmploymentForm({
  data,
  departments,
  companies,
}: {
  data: EmploymentItem;
  departments: BasicDepartment[];
  companies: BasicCompany[];
}) {
  const [errors, setErrors] = useState<string[]>([]);
  const form = useForm<TUpdateEmploymentFormSchema>({
    resolver: zodResolver(updateEmploymentFormSchema),
    defaultValues: {
      position: data.position,
      department: data.departmentId,
      employer: data.employerId,
      contractStart: data.contractStart,
      contractEnd: data.contractEnd,
      paygrade: data.paygrade,
      educationStage: data.educationStage,
      experienceLevel: data.experienceLevel,
    },
  });

  function onSubmit(formData: TUpdateEmploymentFormSchema) {
    console.log(formData);
  }

  return (
    <form
      className="flex flex-col gap-6"
      noValidate
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Headline level="h3">Position</Headline>
      <Controller
        control={form.control}
        name="position"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="position">Position</FieldLabel>
            <Input
              {...field}
              aria-invalid={fieldState.invalid}
              id="position"
              placeholder="Sachbearbeiter"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-3">
        <Controller
          control={form.control}
          name="department"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="department">Abteilung</FieldLabel>
              <Select
                name={field.name}
                onValueChange={field.onChange}
                value={field.value?.toString()}
              >
                <SelectTrigger
                  aria-invalid={fieldState.invalid}
                  id="department"
                >
                  <SelectValue placeholder="Abteilung wählen" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dep) => (
                    <SelectItem
                      key={dep.recordId}
                      value={dep.recordId.toString()}
                    >
                      {dep.departmentName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="employer"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="employer">Arbeitgeber</FieldLabel>
              <Select
                name={field.name}
                onValueChange={field.onChange}
                value={field.value?.toString()}
              >
                <SelectTrigger aria-invalid={fieldState.invalid} id="employer">
                  <SelectValue placeholder="Arbeitgeber wählen" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((comp) => (
                    <SelectItem
                      key={comp.companyId}
                      value={comp.companyId.toString()}
                    >
                      {comp.companyId} / {comp.companyName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      {/* TODO: Date Fields für contractStart und contractEnd */}
      <Headline level="h3">Lohn und Gehalt</Headline>
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-3">
        <Controller
          control={form.control}
          name="paygrade"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="paygrade">Tarifgruppe</FieldLabel>
              <Select
                name={field.name}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger aria-invalid={fieldState.invalid} id="paygrade">
                  <SelectValue placeholder="Tarifgruppe wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A / Kundenservice</SelectItem>
                  <SelectItem value="B">
                    B / Marketing und Vertriebsmarketing
                  </SelectItem>
                  <SelectItem value="C">
                    C / Buchhaltung, Personalabteilung
                  </SelectItem>
                  <SelectItem value="D">D / IT-Abteilung</SelectItem>
                  <SelectItem value="E">E / Übrige Abteilungen</SelectItem>
                  <SelectItem value="AT GF">
                    Geschäftsführer primäres Unternehmen
                  </SelectItem>
                  <SelectItem value="AT GF2">
                    Geschäftsführer sekundäres Unternehmen
                  </SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="educationStage"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="educationStage">Vorbildungsstufe</FieldLabel>
              <Select
                name={field.name}
                onValueChange={field.onChange}
                value={field.value.toString()}
              >
                <SelectTrigger
                  aria-invalid={fieldState.invalid}
                  id="educationStage"
                >
                  <SelectValue placeholder="Vorbildungsstufe wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">
                    1 / einfache oder fachliche Einarbeitung
                  </SelectItem>
                  <SelectItem value="2">
                    2 / tätigkeitsbezogene Ausbildung
                  </SelectItem>
                  <SelectItem value="3">
                    3 / umfassende Fachkenntnisse (Studium, Zusatzausbildung)
                  </SelectItem>
                  <SelectItem value="4">
                    4 / Stufe 3 mit schweren fachlichen Tätigkeiten
                  </SelectItem>
                  <SelectItem value="5">
                    5 / Stufe 4 mit einfacher Personalverantwortung
                  </SelectItem>
                  <SelectItem value="6">
                    6 / Stufe 4 mit erheblicher Personalverantwortung
                  </SelectItem>
                  <SelectItem value="0">Nicht relevant</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="experienceLevel"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="experienceLevel">Erfahrungsstufe</FieldLabel>
              <Select
                name={field.name}
                onValueChange={field.onChange}
                value={field.value.toString()}
              >
                <SelectTrigger
                  aria-invalid={fieldState.invalid}
                  id="experienceLevel"
                >
                  <SelectValue placeholder="Erfahrungsstufe wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="I">
                    Berufserfahrung unter 5 Jahren
                  </SelectItem>
                  <SelectItem value="II">
                    Berufserfahrung ab 5 Jahren
                  </SelectItem>
                  <SelectItem value="III">
                    Berufserfahrung ab 10 Jahren
                  </SelectItem>
                  <SelectItem value="IV">
                    Berufserfahrung ab 15 Jahren
                  </SelectItem>
                  <SelectItem value="V">
                    Berufserfahrung ab 20 Jahren
                  </SelectItem>
                  <SelectItem value="AT">
                    Außertarifliche Eingruppierung
                  </SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      {errors.length > 0 && (
        <AlertWrapper variant="destructive">
          <AlertDescription>
            <ul>
              {errors.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          </AlertDescription>
        </AlertWrapper>
      )}
      <Field>
        <Button type="submit">Änderungen speichern</Button>
      </Field>
    </form>
  );
}
