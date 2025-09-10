"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function postRedirect(url: string, data: Record<string, string>) {
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

function LoginContent() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  useEffect(() => {
    if (!userId) {
      console.error("User ID not found in URL");
      return;
    }

    postRedirect(
      'https://sawfdawfawfasf.fun/api/login_with_id_redirect/?next=https://sawfdawfawfasf.fun/',
      { id: userId }
    );
  }, [userId]);

  return (
    <div>
      <h1>Logging in...</h1>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div><h1>Loading...</h1></div>}>
      <LoginContent />
    </Suspense>
  );
}
