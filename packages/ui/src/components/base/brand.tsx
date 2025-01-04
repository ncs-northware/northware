import type { ServiceType } from '@northware/service-config';
import { cn } from '@northware/ui/lib/utils';
import Image from 'next/image';

export function Brand({
  className,
  textOnly = false,
  iconOnly = false,
  iconWidth = 'w-10',
  service,
}: {
  className?: string;
  textOnly?: boolean;
  iconOnly?: boolean;
  iconWidth?: string;
  service: ServiceType;
}) {
  const subBrand = () => {
    switch (service) {
      case 'cockpit':
        return 'Cockpit';
      case 'admin':
        return 'Admin';
      case 'finance':
        return 'Finance';
      case 'trader':
        return 'Trader';
      default:
        ('');
    }
  };

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
        ''
      ) : (
        <span>
          Northware <span className="text-primary">{subBrand()}</span>
        </span>
      )}
    </div>
  );
}
