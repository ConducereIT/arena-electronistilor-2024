interface FormErrorProps {
  error: string | null;
}

export default function FormError({ error }: FormErrorProps) {
  return error ? <p className="text-red-500 text-sm mt-2">{error}</p> : null;
}
