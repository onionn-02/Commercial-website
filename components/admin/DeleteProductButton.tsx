"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Submits the surrounding <form> only after the admin confirms.
export function DeleteProductButton({ name }: { name: string }) {
  return (
    <Button
      type="submit"
      variant="outline"
      className="text-red-600"
      onClick={(e) => {
        if (!confirm(`Delete "${name}"? This cannot be undone.`)) e.preventDefault();
      }}
    >
      <Trash2 /> Delete
    </Button>
  );
}
