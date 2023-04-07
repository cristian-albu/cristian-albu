import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import MDComponent from "./MDComponent";
import ReactMarkdown from "react-markdown";

const MarkDownEditor = ({
  content,
  setContent,
}: {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  return (
    <div className="w-full">
      <div className="w-full grid grid-cols-2 gap-5 justify-between items-start ">
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            name="content"
            value={content}
            onChange={(event) => handleChange(event)}
            placeholder="Content..."
            className={`inputPrimary w-full min-h-[500px] text-sm ${
              content.length > 65000 && "border-red-500"
            }`}
          />
        </div>

        <div className="w-full flex flex-col justify-start items-start">
          <div className="prose w-full">
            <ReactMarkdown
              children={content}
              components={MDComponent}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkDownEditor;
