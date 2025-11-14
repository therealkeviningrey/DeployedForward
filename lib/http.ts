export async function readRequestData(request: Request) {
  const contentType = request.headers.get('content-type')?.toLowerCase() ?? '';

  if (contentType.includes('application/json')) {
    const data = await request.json();
    return { data, isForm: false as const };
  }

  if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
    const formData = await request.formData();
    return { data: Object.fromEntries(formData.entries()), isForm: true as const };
  }

  try {
    const data = await request.json();
    return { data, isForm: false as const };
  } catch {
    const cloned = request.clone();
    const formData = await cloned.formData();
    return { data: Object.fromEntries(formData.entries()), isForm: true as const };
  }
}
