import { Button } from "@northware/ui/components/shadcn/button";
import { Calendar } from "@northware/ui/components/shadcn/calendar";
import { Input } from "@northware/ui/components/shadcn/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@northware/ui/components/shadcn/popover";
import { formatDate, isValid, parse } from "date-fns";
import { de } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { FieldError } from "react-hook-form";

function parseDateInput(input: string): Date | null {
  const trimmedInput = input.trim();
  if (!trimmedInput) {
    return null;
  }

  let parsedDate: Date | null = null;

  const formats = ["dd.MM.yyyy", "dd.MM.yy", "ddMMyyyy", "ddMMyy"];
  for (const pattern of formats) {
    try {
      const date = parse(input, pattern, new Date(), { locale: de });
      if (isValid(date)) {
        parsedDate = date;
        break;
      }
    } catch {
      // ignore parse errors
    }
  }

  return parsedDate;
}

function formatDateForDisplay(date: Date | null): string {
  if (!(date && isValid(date))) {
    return "";
  }
  return formatDate(date, "dd.MM.yyyy", { locale: de });
}

type DateInputProps = {
  field: {
    value?: Date | null;
    onChange: (date: Date | null) => void;
    onBlur?: () => void;
    name: string;
    ref?: React.Ref<HTMLInputElement>;
  };
  fieldState: {
    invalid?: boolean;
    error?: FieldError;
  };
};

export function DateInput({ fieldState, field }: DateInputProps) {
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState<string>(
    field.value && isValid(field.value) ? formatDateForDisplay(field.value) : ""
  );

  useEffect(() => {
    setInputText(
      field.value && isValid(field.value)
        ? formatDateForDisplay(field.value)
        : ""
    );
  }, [field.value]);

  return (
    <div className="relative flex gap-2">
      <Input
        aria-invalid={fieldState.invalid}
        className="bg-background pr-10"
        id="date"
        onBlur={() => {
          const trimmedInput = inputText.trim();
          if (trimmedInput) {
            const parsed = parseDateInput(trimmedInput);
            if (parsed && isValid(parsed)) {
              // Wenn ein gültiges Datum eingegeben wurde, übernehme es
              field.onChange(parsed);
              setInputText(formatDateForDisplay(parsed));
            } else {
              // Bei ungültigem Format: Stelle den letzten gültigen Wert wieder her
              setInputText(
                field.value && isValid(field.value)
                  ? formatDateForDisplay(field.value)
                  : ""
              );
            }
          } else {
            // Wenn das Feld leer ist, setze das Datum auf null
            field.onChange(null);
            setInputText("");
          }
        }}
        onChange={(e) => {
          const v = e.target.value;
          setInputText(v);
        }}
        placeholder="TT.MM.YYYY"
        ref={field.ref}
        value={inputText}
      />

      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button
            className="-translate-y-1/2 absolute top-1/2 right-2 size-6"
            id="date-picker"
            variant="ghost"
          >
            <CalendarIcon className="size-3.5" />
            <span className="sr-only">Datum auswählen</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          alignOffset={-8}
          className="w-auto overflow-hidden p-0"
          sideOffset={10}
        >
          <Calendar
            captionLayout="dropdown"
            defaultMonth={field.value || new Date()}
            mode="single"
            onSelect={(date) => {
              if (date) {
                field.onChange(date);
                setInputText(formatDateForDisplay(date ?? null));
                setOpen(false);
              }
            }}
            selected={field.value ? field.value : undefined}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
