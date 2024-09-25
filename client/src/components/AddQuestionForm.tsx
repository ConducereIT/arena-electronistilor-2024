import { useForm, SubmitHandler } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import FormInputField from "./FormInputField";
import Spinner from "./Spinner";
import Button from "./Button";
import * as adminQuickRound from "../newtork/adminQuickRound";
import { useQueryClient } from "@tanstack/react-query";

import { VscSend } from "react-icons/vsc";

interface Answer {
  answer: string;
  numberOfResponse: number;
}

interface FormValues {
  question: string;
  answers: Answer[];
}

export default function AddQuestionForm({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const [numOfAnswers, setNumOfAnswers] = useState(6);
  const [correctScore, setCorrectScore] = useState<boolean>(true);

  const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      if (value > 10) {
        setNumOfAnswers(10);
      } else {
        setNumOfAnswers(value);
      }
    }
  };

  interface AnswerSendProp {
    [key: string]: number;
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const filteredData = {
      ...data,
      answers: data.answers.filter(
        (answer) =>
          answer.answer.trim() !== "" && answer.numberOfResponse !== null
      ),
    };

    const totalResponses = filteredData.answers.reduce(
      (acc, answer) => acc + +answer.numberOfResponse,
      0
    );
    if (totalResponses !== 100) {
      console.error("Total responses must be 100");
      setCorrectScore(false);
      return;
    }

    const answersToSend: AnswerSendProp = {};
    filteredData.answers.forEach((answer) => {
      answersToSend[answer.answer] = +answer.numberOfResponse;
    });

    const sendObject = {
      question: filteredData.question,
      answers: answersToSend,
    };

    try {
      await adminQuickRound.createQuestion(sendObject);

      queryClient.invalidateQueries({ queryKey: ["questions"] });
      setCorrectScore(true);
      closeModal();
    } catch (error) {
      console.error("Failed to create question:", error);
    }
  };

  if (isSubmitting) return <Spinner />;

  return (
    <div className="flex justify-center items-center h-auto w-full">
      <div className="p-12 bg-opacity-60 w-full max-w-3xl mx-auto">
        <div className="mb-6">
          <label className="block text-gray-50 mb-2">Number of Answers</label>
          <span className="text-red-500">
            {correctScore ? "" : "Total Points must be 100"}
          </span>
          <input
            type="number"
            min="1"
            max="10"
            value={numOfAnswers}
            onChange={handleAnswerChange}
            className="block w-full max-w-md bg-transparent outline-none border-b-2 border-black py-2 px-4 text-gray-50"
            placeholder="Enter number of answers"
          />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-3xl mx-auto"
        >
          <FormInputField
            type="text"
            register={register("question", {
              required: "Question is required",
            })}
            label="Question"
            error={errors.question}
            placeholder="Enter your question"
          />

          {[...Array(numOfAnswers)].map((_, index) => (
            <div key={index} className="flex gap-4 mb-6">
              <FormInputField
                type="text"
                register={register(`answers.${index}.answer`, {
                  required: "Answer is required",
                })}
                label={`Answer ${index + 1}`}
                error={errors.answers?.[index]?.answer}
                placeholder="Enter answer"
                className="flex-1"
              />
              <FormInputField
                type="number"
                register={register(`answers.${index}.numberOfResponse`, {
                  required: "Number of Points is required",
                  valueAsNumber: true,
                })}
                min={1}
                max={100}
                label={`Number of Points ${index + 1}`}
                error={errors.answers?.[index]?.numberOfResponse}
                placeholder="Enter number of Points"
                className="flex-1"
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
    </div>
  );
}
