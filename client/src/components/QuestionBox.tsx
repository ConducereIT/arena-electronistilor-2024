import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import AnswersAndVotes from "./AnswersAndVoters";
import Button from "./Button";
import * as adminQuickRound from "../newtork/adminQuickRound";
import EditQuestionForm from "./EditQuestionForm";
import { Modal, ModalHeader, ModalBody } from "./Modal";

interface Answer {
  [key: string]: number;
}

interface QuestionProps {
  id: number;
  question: string;
  answers: Answer;
  createdAt: string;
  updatedAt: string;
}

function convertDate(date: string) {
  return new Date(date).toLocaleString();
}

export default function QuestionBox({ question }: { question: QuestionProps }) {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  async function handleDelete(id: number) {
    try {
      await adminQuickRound.deleteQuestion(id);
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    } catch (error) {
      console.error(error);
    }
  }

  function handleEdit() {
    setIsModalOpen(true);
  }

  interface UpdatedDataProps {
    question: string;
    answers: { [key: string]: number };
  }

  const handleEditSubmit = async (data: UpdatedDataProps) => {
    try {
      await adminQuickRound.updateQuestion(question.id, data);
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to update question", error);
    }
  };

  return (
    <>
      <div className="border border-gray-400 p-8 rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.3)] bg-indigo-300 w-full grid grid-cols-2 gap-20">
        <div>
          <div className="text-sm text-gray-500">
            Question ID: {question.id}
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            {question.question}?
          </h2>
          <AnswersAndVotes answers={question.answers} />
          <div className="text-xs text-gray-700">
            Created At: {convertDate(question.createdAt)}
          </div>
          <div className="text-xs text-gray-700">
            Updated At: {convertDate(question.updatedAt)}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-5">
          <Button onClick={() => handleDelete(+question.id)}>
            Delete the question
          </Button>
          <Button onClick={() => handleEdit()}>Edit the question</Button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalHeader title="Edit the Question" />
        <ModalBody>
          <EditQuestionForm
            questionData={question}
            onSubmit={handleEditSubmit}
            onClose={() => setIsModalOpen(false)}
          />
        </ModalBody>
      </Modal>
    </>
  );
}
