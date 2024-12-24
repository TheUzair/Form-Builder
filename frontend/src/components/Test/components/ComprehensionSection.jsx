import React from 'react';
import QuestionHeader from './QuestionHeader';

const ComprehensionSection = ({ data, onAnswer }) => {
  if (!data?.length) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Reading Comprehension
      </h2>
      {data.map((data) => (
        <div key={data._id} className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <QuestionHeader number={data.displayNumber} />
          <p className="mb-4 text-gray-700">{data.description}</p>
          <div className="bg-gray-50 p-4 rounded mb-6">
            <p className="text-lg leading-relaxed">{data.passage}</p>
          </div>
          <div className="space-y-6">
            {data.subQuestions?.map((question, subIndex) => (
              <div key={question.id} className="space-y-2">
                <p className="font-semibold">
                  {`${data.displayNumber}.${subIndex + 1}. ${question.title}`}
                </p>
                <div className="space-y-2">
                  {question.options?.map((option) => (
                    <label key={option.id} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`question-${data.displayNumber}-${subIndex + 1}`}
                        value={option.id}
                        className="form-radio"
                        onChange={() => onAnswer(data._id)}
                      />
                      <span>{option.text}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default ComprehensionSection;