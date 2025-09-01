"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

function postRedirect(url: string, data: Record<string, any>) {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = url;

  for (const key in data) {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = data[key];
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
}

export default function LoginPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  useEffect(() => {
    if (!userId) {
      console.error("User ID not found in URL");
      return;
    }

    postRedirect(
      'http://localhost:8000/api/login_with_id_redirect/?next=http://localhost:3000/',
      { id: userId }
    );
  }, [userId]);

  return (
    <div>
      <h1>Logging in...</h1>
    </div>
  );
}

