import { Calendar } from "@northware/ui/components/shadcn/calendar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@northware/ui/components/shadcn/input-group";
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
  let parsedDate: Date | null = null;
  const formats = [
    "ddMMyy",
    "dd.MM.yy",
    "ddMM",
    "dd.MM",
    "dd.MM.",
    "dd.MM.yyyy",
    "ddMMyyyy",
  ];

  for (const pattern of formats) {
    try {
      const date = parse(input, pattern, new Date(), { locale: de });
      if (isValid(date)) {
        date.setHours(12);
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
    <InputGroup>
      <InputGroupInput
        aria-invalid={fieldState.invalid}
        className="bg-background pr-10"
        id="date"
        onBlur={() => {
          if (inputText) {
            const parsed = parseDateInput(inputText);
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
      <InputGroupAddon align="inline-end">
        <Popover onOpenChange={setOpen} open={open}>
          <PopoverTrigger asChild>
            <InputGroupButton id="date-picker" size="icon-xs" variant="ghost">
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Datum auswählen</span>
            </InputGroupButton>
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
                  date.setHours(12);
                  field.onChange(date);
                  setInputText(formatDateForDisplay(date ?? null));
                  setOpen(false);
                }
              }}
              selected={field.value ? field.value : undefined}
            />
          </PopoverContent>
        </Popover>
      </InputGroupAddon>
    </InputGroup>
  );
}
