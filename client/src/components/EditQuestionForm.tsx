import { useForm, SubmitHandler } from "react-hook-form";
import Button from "./Button";
import FormInputField from "./FormInputField";

interface EditQuestionFormProps {
  questionData: {
    id: number;
    question: string;
    answers: { [key: string]: number };
  };
  onSubmit: (data: UpdatedDataProps) => void;
  onClose: () => void;
}

interface UpdatedDataProps {
  question: string;
  answers: { [key: string]: number };
}

interface FormValues {
  question: string;
  answers: { answer: string; numberOfResponse: number }[];
}

export default function EditQuestionForm({
  questionData,
  onSubmit,
  onClose,
}: EditQuestionFormProps) {
  const initialAnswers = Object.entries(questionData.answers).map(
    ([answer, numberOfResponse]) => ({
      answer,
      numberOfResponse,
    })
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      question: questionData.question,
      answers: initialAnswers,
    },
  });

  const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
    const transformedAnswers = data.answers.reduce((acc, curr) => {
      acc[curr.answer] = curr.numberOfResponse;
      return acc;
    }, {} as { [key: string]: number });

    const updatedData: UpdatedDataProps = {
      question: data.question,
      answers: transformedAnswers,
    };

    onSubmit(updatedData);
  };

  return (
    <div className="bg-indigo-300 p-8 w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <FormInputField
          register={register("question", { required: true })}
          label="Question"
          error={errors.question}
          placeholder="Enter your question"
        />

        {initialAnswers.map((_, index) => (
          <div key={index} className="flex gap-4 mb-4">
            <FormInputField
              register={register(`answers.${index}.answer`, { required: true })}
              label={`Answer ${index + 1}`}
              error={errors.answers?.[index]?.answer}
              placeholder={`Answer ${index + 1}`}
            />
            <FormInputField
              register={register(`answers.${index}.numberOfResponse`, {
                required: true,
                valueAsNumber: true,
              })}
              label={`Votes ${index + 1}`}
              error={errors.answers?.[index]?.numberOfResponse}
              type="number"
              placeholder={`Votes ${index + 1}`}
            />
          </div>
        ))}

        <div className="flex justify-end gap-4">
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}
