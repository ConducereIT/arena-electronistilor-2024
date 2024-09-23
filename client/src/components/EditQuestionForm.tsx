import { useForm, SubmitHandler } from "react-hook-form";
import Button from "./Button";
import FormInputField from "./FormInputField";
import { useMemo } from "react";
import { VscSend } from "react-icons/vsc";

interface EditQuestionFormProps {
  questionData: {
    id: number;
    question: string;
    answers: { [key: string]: number };
  };
  onSubmit: (data: UpdatedDataProps) => void;
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
}: EditQuestionFormProps) {
  const initialAnswers = useMemo(
    () =>
      Object.entries(questionData.answers).map(
        ([answer, numberOfResponse]) => ({
          answer,
          numberOfResponse,
        })
      ),
    [questionData.answers]
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
    <div className="bg-indigo-400 p-8 w-full max-w-xl mx-auto ">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <FormInputField
          register={register("question", { required: "Question is required" })}
          label="Question"
          error={errors.question}
          placeholder="Enter your question"
        />

        {initialAnswers.map((_, index) => (
          <div key={index} className="flex gap-4 mb-4">
            <FormInputField
              register={register(`answers.${index}.answer`, {
                required: "Answer is required",
              })}
              label={`Answer ${index + 1}`}
              error={errors.answers?.[index]?.answer}
              placeholder={`Answer ${index + 1}`}
            />
            <FormInputField
              register={register(`answers.${index}.numberOfResponse`, {
                required: "Points is required",
                valueAsNumber: true,
              })}
              label={`Points ${index + 1}`}
              error={errors.answers?.[index]?.numberOfResponse}
              type="number"
              min={1}
              max={100}
              placeholder={`Points ${index + 1}`}
            />
          </div>
        ))}

        <div className="grid place-items-center ">
          <Button
            type="submit"
            className="w-40 px-4 py-2 flex justify-center items-center gap-2"
          >
            Submit <VscSend className="text-sm ml-1" />
          </Button>
        </div>
      </form>
    </div>
  );
}
