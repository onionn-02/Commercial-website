"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { login, type FormState } from "@/app/admin/actions";

const input = "h-10 w-full rounded-lg border bg-white px-3 text-base outline-none focus:border-orange-600";

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState<FormState, FormData>(login, {});

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-16">
      <form action={action} className="w-full max-w-sm space-y-4 rounded-xl border bg-white p-6">
        <h1 className="text-2xl font-bold">Admin login</h1>
        <label className="block text-sm font-medium">
          Email
          <input name="email" type="email" required autoComplete="email" className={`${input} mt-1`} />
        </label>
        <label className="block text-sm font-medium">
          Password
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className={`${input} mt-1`}
          />
        </label>
        {state.error && (
          <p role="alert" className="text-sm text-red-600">
            {state.error}
          </p>
        )}
        <Button type="submit" size="lg" disabled={pending} className="h-10 w-full text-base">
          {pending ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
