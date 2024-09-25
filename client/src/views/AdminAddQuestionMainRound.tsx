import { useState } from "react";
import QuestionBox from "../components/QuestionBox";
import Spinner from "../components/Spinner";
import * as adminQuickRound from "../newtork/adminQuickRound";
import PageNotFetch from "./PageNotFetch";
import useReactQuery from "../newtork/useReactQuery";
import AddQuestionForm from "../components/AddQuestionForm";
import { Modal, ModalHeader, ModalBody } from "../components/Modal";
import { MdOutlineNoteAdd } from "react-icons/md";
import ButtonInteractiveIcons from "../components/ButtonInteractiveIcons.tsx";

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

export default function AdminQuestionMainRound() {
  const {
    data: questions,
    isLoading,
    isError,
  } = useReactQuery(["questions"], adminQuickRound.getQuestions);

  questions?.sort((a: QuestionProps, b: QuestionProps) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  if (isLoading) return <Spinner />;

  if (isError) return <PageNotFetch />;

  return (
    <div className="bg-gradient-to-r from-violet-500 to-sky-500 min-h-screen w-full text-gray-50">
      <div className="flex justify-center items-center flex-col p-6">
        <div className="text-4xl p-6">Admin quick round</div>
        <div>
          <ButtonInteractiveIcons onClick={openModal} text={"Add new question"}>
            <MdOutlineNoteAdd className="text-2xl" />
          </ButtonInteractiveIcons>
        </div>

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
