interface Answer {
  [key: string]: number;
}

export default function AnswersAndVotes({ answers }: { answers: Answer }) {
  return (
    <div className="space-y-2 mb-4">
      {Object.entries(answers).map(([answer, count]) => (
        <div key={answer} className="flex justify-between">
          <span className="text-gray-700">{answer}</span>
          <span className="font-medium text-gray-900">Votes: {count}</span>
        </div>
      ))}
    </div>
  );
}
