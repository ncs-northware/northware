"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import type { ServiceType } from "@northware/service-config";
import { Alert, AlertDescription } from "@northware/ui/components/alert";
import { Brand } from "@northware/ui/components/brand";
import { Button } from "@northware/ui/components/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@northware/ui/components/card";
import { Input } from "@northware/ui/components/input";
import { Label } from "@northware/ui/components/label";
import { navigationMenuButtonStyle } from "@northware/ui/components/navigation-menu";
import { ThemeSwitch } from "@northware/ui/components/theme-switch";
import { EyeClosedIcon, EyeIcon, LoaderCircle, PencilIcon } from "lucide-react";
import { useState } from "react";

export function LoginForm({ service }: { service: ServiceType }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center px-4">
      <SignIn.Root>
        <Brand className="mb-6 text-2xl" iconWidth="w-14" service={service} />
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              <SignIn.Step className="w-full max-w-sm" name="start">
                <Card className="bg-background">
                  <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Clerk.Field className="grid gap-4" name="identifier">
                      <Clerk.Label asChild>
                        <Label>Email</Label>
                      </Clerk.Label>
                      <Clerk.Input asChild required type="email">
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
                    <SignIn.Action asChild submit>
                      <Button
                        className="w-full"
                        disabled={isGlobalLoading}
                        size="lg"
                        variant="default"
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

              <SignIn.Step className="w-full max-w-sm" name="verifications">
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
                      <Clerk.Field className="grid gap-4" name="password">
                        <Clerk.Label asChild>
                          <Label>Passwort</Label>
                        </Clerk.Label>
                        <div className="flex">
                          <Clerk.Input
                            asChild
                            type={showPassword ? "text" : "password"}
                          >
                            <Input className="rounded-r-none border-r-0" />
                          </Clerk.Input>
                          <Button
                            className="rounded-l-none border border-input bg-background dark:bg-input/30"
                            onClick={() => setShowPassword(!showPassword)}
                            size="icon"
                            type="button"
                            variant="ghost"
                          >
                            {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
                          </Button>
                        </div>
                        <Clerk.FieldError>
                          {({ message, code }) => (
                            <LoginErrorAlert code={code} message={message} />
                          )}
                        </Clerk.FieldError>
                      </Clerk.Field>
                    </CardContent>
                    <CardFooter>
                      <SignIn.Action asChild submit>
                        <Button
                          className="w-full"
                          disabled={isGlobalLoading}
                          size="lg"
                          variant="default"
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
      case "form_password_pwned":
        return "Sie nutzen ein kompromitiertes Passwort. Aus Sicherheitsgründen können Sie sich erst wieder einloggen, wenn Sie ein sicheres Passwort verwenden. Bitten wenden Sie sich an den Support.";

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
