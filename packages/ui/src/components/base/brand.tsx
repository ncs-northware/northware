import { cn } from '@northware/ui/lib/utils';
import Image from 'next/image';

export function Brand({
  className,
  textOnly = false,
  iconOnly = false,
  iconWidth = 'w-10',
}: {
  className?: string;
  textOnly?: boolean;
  iconOnly?: boolean;
  iconWidth?: string;
}) {
  return (
    <div
      className={cn('flex items-center gap-1 font-semibold text-xl', className)}
    >
      {textOnly ? (
        ''
      ) : (
        <Image
          src="/img/icon.png"
          alt="Icon"
          width={250}
          height={250}
          className={iconWidth}
        />
      )}
      {iconOnly ? (
        // TODO: Schriftzug über service steuern
        ''
      ) : (
        <span>
          Northware <span className="text-primary">Cockpit</span>
        </span>
      )}
    </div>
  );
}
