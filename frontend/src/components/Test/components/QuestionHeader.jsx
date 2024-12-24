import React from 'react';
import { BsQuestionCircle, BsBookmark, BsArrowClockwise } from 'react-icons/bs';

const QuestionHeader = ({ number, showReset = false }) => (
  <div className="flex justify-between items-center mb-4">
    <div className="text-xl font-bold">Question {number}</div>
    <div className="flex gap-4">
      <BsQuestionCircle 
        className="text-2xl cursor-pointer text-blue-600" 
        title="Help" 
      />
      <BsBookmark 
        className="text-2xl cursor-pointer text-blue-600" 
        title="Bookmark" 
      />
      {showReset && (
        <BsArrowClockwise 
          className="text-2xl cursor-pointer text-blue-600" 
          title="Reset" 
        />
      )}
    </div>
  </div>
);

export default QuestionHeader;