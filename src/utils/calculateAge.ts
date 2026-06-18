export const calculateAge = (birthDate?: string) => {
  if (!birthDate) return "N/A";
  const dob = new Date(birthDate);
  const diff = Date.now() - dob.getTime();
  const age = new Date(diff).getUTCFullYear() - 1970;
  return age.toString();
};
