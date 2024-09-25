import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import AnswersAndVotes from "./AnswersAndVoters";
import * as adminQuickRound from "../newtork/adminQuickRound";
import EditQuestionForm from "./EditQuestionForm";
import { Modal, ModalHeader, ModalBody } from "./Modal";

import { FaTrash } from "react-icons/fa";
import { RiFileEditFill } from "react-icons/ri";
import ButtonInteractiveIcons from "./ButtonInteractiveIcons";

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
      <div className="border border-gray-700 p-8 rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.3)] bg-indigo-400 w-full grid grid-cols-2 gap-20 text-gray-100">
        <div>
          <div className="text-sm ">Question ID: {question.id}</div>
          <h2 className="text-lg font-semibold  mb-2">{question.question}</h2>
          <AnswersAndVotes answers={question.answers} />
          <div className="text-xs ">
            Created At: {convertDate(question.createdAt)}
          </div>
          <div className="text-xs ">
            Updated At: {convertDate(question.updatedAt)}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-5">
          <ButtonInteractiveIcons
            onClick={handleEdit}
            text={"Edit the question"}
          >
            <RiFileEditFill />
          </ButtonInteractiveIcons>

          <ButtonInteractiveIcons
            onClick={() => handleDelete(+question.id)}
            text={"Delete the question"}
          >
            <FaTrash />
          </ButtonInteractiveIcons>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalHeader title="Edit the Question" />
        <ModalBody>
          <EditQuestionForm
            questionData={question}
            onSubmit={handleEditSubmit}
          />
        </ModalBody>
      </Modal>
    </>
  );
}
