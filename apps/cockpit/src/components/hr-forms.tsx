"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { cn, formattedDate, localDateDE } from "@northware/ui/lib/utils";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import type { EmployeePersonal } from "@/lib/hr-actions";

const employeePersonalFormSchema = z.object({
  employeeId: z.number(),
  sirName: z.string().max(75),
  firstName: z.string().max(75),
  // Select male/female/diverse with enum
  sex: z.string(),
  birthday: z.date().nullable(),
  street: z.string().max(100).nullable(),
  zipcode: z.number().nullable(),
  city: z.string().nullable(),
  meritalStatus: z.string(),
  // Select ledig, verheiratet, geschieden, getrennt lebend
  religion: z.string(),
  // Select ev, kath, keine, andere
  taxClass: z.number().nullable(),
  // Römisch oder select?
  taxKids: z.number().nullable(),
  // Umrechnung oder Select?
});

export function EmployeePersonalForm({ data }: { data: EmployeePersonal }) {
  const form = useForm<z.infer<typeof employeePersonalFormSchema>>({
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
    },
  });
  return (
    <form>
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
      <Controller
        control={form.control}
        name="sirName"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="sirName">Nachname</FieldLabel>
            <Input {...field} aria-invalid={fieldState.invalid} id="sirName" />
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
            />
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
                    "w-[240px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                  variant={"outline"}
                >
                  {field.value ? (
                    formattedDate(field.value, "PPP", {
                      locale: localDateDE,
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
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  mode="single"
                  onSelect={field.onChange}
                  selected={new Date("2005-01-01")}
                />
              </PopoverContent>
            </Popover>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </form>
  );
}
