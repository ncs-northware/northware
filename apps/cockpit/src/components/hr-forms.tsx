"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertWrapper } from "@northware/ui/components/custom-alert";
import { DateInput } from "@northware/ui/components/date-input";
import { Headline } from "@northware/ui/components/headline";
import { AlertDescription } from "@northware/ui/components/shadcn/alert";
import { Button } from "@northware/ui/components/shadcn/button";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@northware/ui/components/shadcn/field";
import { Input } from "@northware/ui/components/shadcn/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@northware/ui/components/shadcn/select";
import { toast } from "@northware/ui/lib/utils";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  type BasicCompany,
  type BasicDepartment,
  type EmployeePersonal,
  type EmploymentItem,
  updateEmployeePersonal,
  updateEmployment,
} from "@/lib/hr-actions";
import {
  employeePersonalFormSchema,
  type TEmployeePersonalFormSchema,
  type TUpdateEmploymentFormSchema,
  updateEmploymentFormSchema,
} from "@/lib/hr-schema";
import { parseErrorMessages } from "@/lib/rbac-schema";

/** Select Arrays for EmployeePersonal */

const sexItems = [
  { label: "Geschlecht wählen", value: null },
  { label: "männlich", value: "male" },
  { label: "weiblich", value: "female" },
  { label: "divers", value: "diverse" },
];

const maritalStatusItems = [
  { label: "Familienstand wählen", value: null },
  { label: "ledig", value: "ledig" },
  { label: "verheiratet", value: "verheiratet" },
  { label: "geschieden", value: "geschieden" },
  { label: "verwitwet", value: "verwitwet" },
];

const religionItems = [
  { label: "Religion wählen", value: null },
  { label: "evangelisch", value: "ev" },
  { label: "katholisch", value: "kath" },
  { label: "andere", value: "andere" },
  { label: "keine", value: "keine" },
];

const taxClassItems = [
  { label: "Steuerklasse wählen", value: null },
  { label: "StK I / ledig oder verwitwet", value: "I" },
  { label: "StK II / alleinerziehend", value: "II" },
  { label: "StK III / verheiratet, höheres Einkommen", value: "III" },
  { label: "StK IV / verheiratet, änhliche Einkommen", value: "IV" },
  { label: "StK V / verheiratet, geringeres Einkommen", value: "V" },
  { label: "StK VI / Nebenarbeitsverhältnis", value: "VI" },
];

const taxKidsItems = [
  { label: "Kinderfreibetrag wählen", value: null },
  { label: "keine Kinderfreibeträge (0)", value: 0 },
  { label: "0,5 Kinderfreibeträge", value: 1 },
  { label: "1,0 Kinderfreibeträge", value: 2 },
  { label: "1,5 Kinderfreibeträge", value: 3 },
  { label: "2,0 Kinderfreibeträge", value: 4 },
  { label: "2,5 Kinderfreibeträge", value: 5 },
  { label: "3,0 Kinderfreibeträge", value: 6 },
];

export function EmployeePersonalForm({ data }: { data: EmployeePersonal }) {
  const [errors, setErrors] = useState<string[]>([]);
  const form = useForm<TEmployeePersonalFormSchema>({
    defaultValues: {
      birthday: data.birthday,
      city: data.city,
      employeeId: data.employeeId,
      firstName: data.firstName,
      mailWork: data.mailWork,
      meritalStatus: data.meritalStatus,
      phoneWork: data.phoneWork,
      religion: data.religion,
      sex: data.sex,
      sirName: data.sirName,
      street: data.street,
      taxClass: data.taxClass,
      taxKids: data.taxKids,
      zipcode: data.zipcode,
    },
    resolver: zodResolver(employeePersonalFormSchema),
  });

  async function onSubmit(formData: TEmployeePersonalFormSchema) {
    try {
      console.log(formData);
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
            {fieldState.invalid === true && (
              <FieldError errors={[fieldState.error]} />
            )}
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
              {fieldState.invalid === true && (
                <FieldError errors={[fieldState.error]} />
              )}
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
              {fieldState.invalid === true && (
                <FieldError errors={[fieldState.error]} />
              )}
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
              <DateInput field={field} fieldState={fieldState} />
              {fieldState.invalid === true && (
                <FieldError errors={[fieldState.error]} />
              )}
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
                items={sexItems}
                name={field.name}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger aria-invalid={fieldState.invalid} id="sex">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {sexItems.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.invalid === true && (
                <FieldError errors={[fieldState.error]} />
              )}
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
            {fieldState.invalid === true && (
              <FieldError errors={[fieldState.error]} />
            )}
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
              {fieldState.invalid === true && (
                <FieldError errors={[fieldState.error]} />
              )}
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
              {fieldState.invalid === true && (
                <FieldError errors={[fieldState.error]} />
              )}
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
                items={maritalStatusItems}
                name={field.name}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger
                  aria-invalid={fieldState.invalid}
                  id="meritalStatus"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {maritalStatusItems.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.invalid === true && (
                <FieldError errors={[fieldState.error]} />
              )}
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
                items={religionItems}
                name={field.name}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger aria-invalid={fieldState.invalid} id="religion">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {religionItems.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.invalid === true && (
                <FieldError errors={[fieldState.error]} />
              )}
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
                items={taxClassItems}
                name={field.name}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger aria-invalid={fieldState.invalid} id="taxClass">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {taxClassItems.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.invalid === true && (
                <FieldError errors={[fieldState.error]} />
              )}
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
                items={taxKidsItems}
                name={field.name}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger aria-invalid={fieldState.invalid} id="taxKids">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {taxKidsItems.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.invalid === true && (
                <FieldError errors={[fieldState.error]} />
              )}
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
              {fieldState.invalid === true && (
                <FieldError errors={[fieldState.error]} />
              )}
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
              {fieldState.invalid === true && (
                <FieldError errors={[fieldState.error]} />
              )}
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

/** Select Items for Employment Forms (not fetched from Database) */

export const paygradeItems = [
  { label: "Tarifgruppe wählen", value: null },
  { label: "A / Kundenservice", value: "A" },
  { label: "B / Marketing und Vertriebsmarketing", value: "B" },
  { label: "C / Buchhaltung, Personalabteilung", value: "C" },
  { label: "D / IT-Abteilung", value: "D" },
  { label: "E / Übrige Abteilungen", value: "E" },
  { label: "Geschäftsführergestellung", value: "GF" },
];

export const educationStageItems = [
  { label: "Vorbildungsstufe wählen", value: null },
  { label: "1 / einfache oder fachliche Einarbeitung", value: "1" },
  { label: "2 / tätigkeitsbezogene Ausbildung", value: "2" },
  {
    label: "3 / umfassende Fachkenntnisse (Studium, Zusatzausbildung)",
    value: "3",
  },
  {
    label: "4 / Stufe 3 mit schweren fachlichen Tätigkeiten",
    value: "4",
  },
  {
    label: "5 / Stufe 4 mit einfacher Personalverantwortung",
    value: "5",
  },
  {
    label: "6 / Stufe 4 mit erheblicher Personalverantwortung",
    value: "6",
  },
  { label: "Nicht relevant", value: "0" },
];

export const experienceLevelItems = [
  { label: "Erfahrungsstufe wählen", value: null },
  { label: "Berufserfahrung unter 5 Jahren", value: "I" },
  { label: "Berufserfahrung ab 5 Jahren", value: "II" },
  { label: "Berufserfahrung ab 10 Jahren", value: "III" },
  { label: "Berufserfahrung ab 15 Jahren", value: "IV" },
  { label: "Berufserfahrung ab 20 Jahren", value: "V" },
  { label: "Außertarifliche Eingruppierung", value: "AT" },
];

export function UpdateEmploymentForm({
  companies,
  data,
  departments,
  employeeId,
  recordId,
}: {
  companies: BasicCompany[];
  data: EmploymentItem;
  departments: BasicDepartment[];
  employeeId: number;
  recordId: number;
}) {
  const [errors, setErrors] = useState<string[]>([]);
  const form = useForm<TUpdateEmploymentFormSchema>({
    defaultValues: {
      contractEnd: data.contractEnd,
      contractStart: data.contractStart,
      department: data.departmentId?.toString(),
      educationStage: data.educationStage.toString(),
      employer: data.employerId?.toString(),
      experienceLevel: data.experienceLevel,
      paygrade: data.paygrade,
      position: data.position,
    },
    resolver: zodResolver(updateEmploymentFormSchema),
  });

  async function onSubmit(formData: TUpdateEmploymentFormSchema) {
    try {
      await updateEmployment(formData, employeeId, recordId);
      toast.success("Die Daten zu dem Arbeitsverhältnis wurden gespeichert.");
    } catch (err) {
      setErrors(parseErrorMessages(err));
    }
  }

  const departmentItems = [
    { label: "Abteilung wählen", value: null },
    ...departments.map((department) => ({
      label: department.departmentName,
      value: department.recordId.toString(),
    })),
  ];
  const employerItems = [
    { label: "Arbeitgeber wählen", value: null },
    ...companies.map((company) => ({
      label: `${company.companyId} / ${company.companyName}`,
      value: company.companyId.toString(),
    })),
  ];

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
            {fieldState.invalid === true && (
              <FieldError errors={[fieldState.error]} />
            )}
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
                items={departmentItems}
                name={field.name}
                onValueChange={field.onChange}
                value={field.value?.toString()}
              >
                <SelectTrigger
                  aria-invalid={fieldState.invalid}
                  id="department"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {departmentItems.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.invalid === true && (
                <FieldError errors={[fieldState.error]} />
              )}
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
                items={employerItems}
                name={field.name}
                onValueChange={field.onChange}
                value={field.value?.toString()}
              >
                <SelectTrigger aria-invalid={fieldState.invalid} id="employer">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {employerItems.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.invalid === true && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </div>
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-3">
        <Controller
          control={form.control}
          name="contractStart"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contractStart">Vertragsbeginn</FieldLabel>
              <DateInput field={field} fieldState={fieldState} />
              {fieldState.invalid === true && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="contractEnd"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contractEnd">Vertragsende</FieldLabel>
              <DateInput field={field} fieldState={fieldState} />
              {fieldState.invalid === true && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </div>
      <Headline level="h3">Lohn und Gehalt</Headline>
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-3">
        <Controller
          control={form.control}
          name="paygrade"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="paygrade">Tarifgruppe</FieldLabel>
              <Select
                items={paygradeItems}
                name={field.name}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger aria-invalid={fieldState.invalid} id="paygrade">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {paygradeItems.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.invalid === true && (
                <FieldError errors={[fieldState.error]} />
              )}
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
                items={educationStageItems}
                name={field.name}
                onValueChange={field.onChange}
                value={field.value.toString()}
              >
                <SelectTrigger
                  aria-invalid={fieldState.invalid}
                  id="educationStage"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {educationStageItems.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.invalid === true && (
                <FieldError errors={[fieldState.error]} />
              )}
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
                items={experienceLevelItems}
                name={field.name}
                onValueChange={field.onChange}
                value={field.value.toString()}
              >
                <SelectTrigger
                  aria-invalid={fieldState.invalid}
                  id="experienceLevel"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {experienceLevelItems.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.invalid === true && (
                <FieldError errors={[fieldState.error]} />
              )}
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
