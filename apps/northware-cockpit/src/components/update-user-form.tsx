'use client';

import { type TRoleListResponse, updateRoles } from '@/lib/user-actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@northware/ui/components/base/button';
import { Checkbox } from '@northware/ui/components/form-parts/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@northware/ui/components/form-parts/form';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

type RolesFormProps = {
  rolesResponse: TRoleListResponse;
  userRolesResponse: (string | null)[];
  userId: string;
};

export function RolesForm({
  rolesResponse,
  userRolesResponse,
  userId,
}: RolesFormProps) {
  if (!rolesResponse.success) {
    return <div>Fehler: {rolesResponse.error.message}</div>;
  }

  const FormSchema = z.object(
    rolesResponse.roleList.reduce(
      (acc, role) => {
        acc[role.roleKey] = z.boolean().default(false).optional();
        return acc;
      },
      {} as Record<string, z.ZodOptional<z.ZodDefault<z.ZodBoolean>>>
    )
  );

  const defaultValues = rolesResponse.roleList.reduce(
    (acc, role) => {
      acc[role.roleKey] = userRolesResponse.includes(role.roleKey) || false;
      return acc;
    },
    {} as Record<string, boolean>
  );

  // biome-ignore lint/correctness/useHookAtTopLevel: Da FormSchema und defaultValues sich auf roleResponse beziehen und vorher geprüft werden muss, ob roleResponse vorhanden ist, kann auch useForm erst verwendet werden, wenn roleResponse.success erfüllt ist.
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await updateRoles(data, userRolesResponse, userId);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {rolesResponse.roleList.map((role) => (
          <FormField
            key={role.recordId}
            control={form.control}
            name={role.roleKey}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{role.roleName}</FormLabel>
                </div>
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
