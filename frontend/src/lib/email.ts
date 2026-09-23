export type ContactEmailInput = {
  name: string;
  email: string;
  phone?: string;
  topic: string;
  message: string;
};

export async function sendContactEmail(input: ContactEmailInput): Promise<boolean> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.message || `Failed to send email (${res.status})`);
  }

  return true;
}
