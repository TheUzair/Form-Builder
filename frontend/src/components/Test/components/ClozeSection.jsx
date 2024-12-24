import React, { useState } from 'react';
import QuestionHeader from './QuestionHeader';
import DraggableClozeWord from './cloze/DraggableClozeWord';
import DroppableClozeBlank from './cloze/DroppableClozeBlank';

const ClozeSection = ({ data, onDrop }) => {
  const [filledBlanks, setFilledBlanks] = useState({});

  if (!data?.length) return null;

  const handleWordDrop = (questionId, blankIndex, item) => {
    const key = `${questionId}-${blankIndex}`;
    
    setFilledBlanks(prev => ({
      ...prev,
      [key]: item.word
    }));

    onDrop && onDrop({
      word: item.word,
      blankIndex: blankIndex,
      questionId: questionId
    });
    
  };

  const renderSentenceWithBlanks = (sentence, questionId) => {
    const parts = sentence.split('____');
    
    return parts.map((part, index) => {
      const isLastPart = index === parts.length - 1;
      const key = `${questionId}-${index}`;

      return (
        <React.Fragment key={`sentence-part-${questionId}-${index}`}>
          <span key={`text-${questionId}-${index}`}>{part}</span>
          {!isLastPart && (
            <DroppableClozeBlank
              key={`blank-${questionId}-${index}`}
              filledWord={filledBlanks[key]}
              onDrop={(item) => handleWordDrop(questionId, index, item)}
              questionId={questionId}
              blankIndex={index}
            />
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Fill in the Blanks
      </h2>
      {data.map((clozeItem, index) => (
        <div key={clozeItem._id} className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <QuestionHeader number={clozeItem.displayNumber} />
          <p className="mb-4">{clozeItem.description}</p>
          {/* Word Options */}
          <div className="flex flex-wrap gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
            {clozeItem.options?.map((word, wordIndex) => (
              <DraggableClozeWord
                key={`option-${clozeItem._id.$oid}-${wordIndex}`}
                id={`${clozeItem._id.$oid}-word-${index}`}
                word={word}
                questionId={clozeItem._id.$oid}
              />
            ))}
          </div>

          {/* Sentence with Blanks */}
          <div className="p-4 bg-white rounded-lg border">
            <p className="leading-relaxed text-lg">
              {renderSentenceWithBlanks(clozeItem.sentence, clozeItem._id.$oid)}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ClozeSection;