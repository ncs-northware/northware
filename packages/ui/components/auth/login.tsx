"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import type { ServiceType } from "@northware/service-config";
import { Brand } from "@northware/ui/components/base/brand";
import { Button } from "@northware/ui/components/base/button";
import { Input } from "@northware/ui/components/form-parts/input";
import { Label } from "@northware/ui/components/form-parts/label";
import { navigationMenuButtonStyle } from "@northware/ui/components/menu/navigation-menu";
import { ThemeSwitch } from "@northware/ui/components/menu/theme-switch";
import { Alert, AlertDescription } from "@northware/ui/components/panels/alert";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@northware/ui/components/panels/card";
import { LoaderCircle, PencilIcon } from "lucide-react";

export function LoginForm({ service }: { service: ServiceType }) {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center px-4">
      <SignIn.Root>
        <Brand className="mb-6 text-2xl" iconWidth="w-14" service={service} />
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              <SignIn.Step name="start" className="w-full max-w-sm">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Clerk.Field name="identifier" className="grid gap-4">
                      <Clerk.Label asChild>
                        <Label>Email</Label>
                      </Clerk.Label>
                      <Clerk.Input type="email" required asChild>
                        <Input placeholder="kunde@northware.de" />
                      </Clerk.Input>
                      <Clerk.FieldError>
                        {({ message, code }) => (
                          <LoginErrorAlert code={code} message={message} />
                        )}
                      </Clerk.FieldError>
                    </Clerk.Field>
                  </CardContent>
                  <CardFooter>
                    <SignIn.Action submit asChild>
                      <Button
                        disabled={isGlobalLoading}
                        size="lg"
                        variant="default"
                        className="w-full"
                      >
                        <Clerk.Loading>
                          {(isLoading) => {
                            return isLoading ? (
                              <LoaderCircle className="size-4 animate-spin" />
                            ) : (
                              "Weiter"
                            );
                          }}
                        </Clerk.Loading>
                      </Button>
                    </SignIn.Action>
                  </CardFooter>
                </Card>
              </SignIn.Step>

              <SignIn.Step name="verifications" className="w-full max-w-sm">
                <SignIn.Strategy name="password">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">
                        Herzlich Willkommen
                      </CardTitle>
                      <p className="flex items-center text-muted-foreground text-sm leading-none">
                        <SignIn.SafeIdentifier />
                        <SignIn.Action asChild navigate="start">
                          <PencilIcon className="ml-3 size-4 cursor-pointer" />
                        </SignIn.Action>
                      </p>
                    </CardHeader>
                    <CardContent>
                      <Clerk.Field name="password" className="grid gap-4">
                        <Clerk.Label asChild>
                          <Label>Passwort</Label>
                        </Clerk.Label>
                        <Clerk.Input type="password" asChild>
                          <Input />
                        </Clerk.Input>
                        <Clerk.FieldError>
                          {({ message, code }) => (
                            <LoginErrorAlert code={code} message={message} />
                          )}
                        </Clerk.FieldError>
                      </Clerk.Field>
                    </CardContent>
                    <CardFooter>
                      <SignIn.Action submit asChild>
                        <Button
                          disabled={isGlobalLoading}
                          size="lg"
                          variant="default"
                          className="w-full"
                        >
                          <Clerk.Loading>
                            {(isLoading) => {
                              return isLoading ? (
                                <LoaderCircle className="size-4 animate-spin" />
                              ) : (
                                "Anmelden"
                              );
                            }}
                          </Clerk.Loading>
                        </Button>
                      </SignIn.Action>
                    </CardFooter>
                  </Card>
                </SignIn.Strategy>
              </SignIn.Step>
            </>
          )}
        </Clerk.Loading>
      </SignIn.Root>
      <ThemeSwitch
        className={`mt-3 text-muted-foreground ${navigationMenuButtonStyle()}`}
        withDescriptionText
      />
    </main>
  );
}

function LoginErrorAlert({ code, message }: { code: string; message: string }) {
  const alertMessage = () => {
    switch (code) {
      case "form_identifier_not_found":
        return "Die angegebene E-Mail-Adresse wurde nicht gefunden.";
      case "form_param_format_invalid":
        return "Bitte geben Sie eine gültige E-Mail-Adresse an.";
      case "form_password_incorrect":
        return "Das Passwort ist nicht korrekt. Bitte versuchen Sie es erneut.";

      default:
        return `${message} (${code})`;
    }
  };
  return (
    <Alert variant="danger">
      <AlertDescription>
        <p>{alertMessage()}</p>
      </AlertDescription>
    </Alert>
  );
}
