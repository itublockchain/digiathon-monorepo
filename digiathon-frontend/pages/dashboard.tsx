import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { fileToBase64 } from 'utils/fileToBase64';

const Test: NextPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pdf, setPdf] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const send = async (file: File | null) => {
    if (file == null) return;
    const res = await fileToBase64(file);
    if (typeof res === 'string') {
      setPdf(res);
      console.log(res);
    }
  };

  return (
    <div>
      <div>{file?.name}</div>
      <input
        ref={inputRef}
        type="file"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file != null) {
            setFile(file);
          }
        }}
      />
      <button
        onClick={() => {
          if (!inputRef.current) return;
          inputRef.current.click();
        }}
        className="w-32 h-8 mr-2 bg-indigo-500"
      >
        Upload
      </button>

      <button
        className="w-32 h-8 mr-2 bg-indigo-500"
        onClick={() => {
          send(file);
        }}
      >
        Send
      </button>
      {pdf != null && <iframe src={pdf} />}
    </div>
  );
};

export default Test;
