"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@northware/ui/components/shadcn/button";
import { Calendar } from "@northware/ui/components/shadcn/calendar";
import {
  Field,
  FieldError,
  FieldLabel,
  FieldSeparator,
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
  sex: z.string(),
  birthday: z.date().nullable(),
  street: z.string().max(100).nullable(),
  zipcode: z.number().nullable(),
  city: z.string().nullable(),
  meritalStatus: z.string(),
  religion: z.string(),
  taxClass: z.string(),
  taxKids: z.number(),
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
  function onSubmit(formData: z.infer<typeof employeePersonalFormSchema>) {
    console.log(formData);
  }
  return (
    <form
      className="flex flex-col gap-6"
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
      <FieldSeparator />
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
      <FieldSeparator />
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
      <FieldSeparator />
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
      <FieldSeparator />
      <Field>
        <Button type="submit">Änderungen speichern</Button>
      </Field>
    </form>
  );
}
