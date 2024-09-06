import { useState } from "react";
import QuestionBox from "../components/QuestionBox";
import Spinner from "../components/Spinner";
import * as adminQuickRound from "../newtork/adminQuickRound";
import PageNotFetch from "./PageNotFetch";
import useReactQuery from "../newtork/useReactQuery";
import AddQuestionForm from "../components/AddQuestionForm";
import Button from "../components/Button";
import { Modal, ModalHeader, ModalBody } from "../components/Modal";

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

export default function AdminQuickRound() {
  const {
    data: questions,
    isLoading,
    isError,
  } = useReactQuery(["questions"], adminQuickRound.getQuestions);

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  if (isLoading) return <Spinner />;

  if (isError) return <PageNotFetch />;

  return (
    <div className="bg-gradient-to-r from-violet-500 to-sky-500 min-h-screen w-full">
      <div className="flex justify-center items-center flex-col p-6">
        <div className="text-4xl p-6">Admin quick round</div>
        <Button addNewContent={"w-40"} onClick={openModal}>
          Add new question
        </Button>

        <div>
          <div className="grid grid-cols-1 gap-8 p-6">
            {questions.map((question: QuestionProps) => (
              <QuestionBox question={question} key={question.id} />
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader title="Add New Question" />
        <ModalBody>
          <AddQuestionForm closeModal={closeModal} />
        </ModalBody>
      </Modal>
    </div>
  );
}
