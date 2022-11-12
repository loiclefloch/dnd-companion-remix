export function formDataGetArrayValue(
  formData: FormData,
  name: string
): string[] {
  const results = [];
  let i = 0;
  while (formData.get(`${name}[${i}]`)) {
    results.push(formData.get(`${name}[${i}]`) as string);
    ++i;
  }
  return results;
}
