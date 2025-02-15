import React, {useEffect, useState} from "react";
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import axios from "axios";
import rehypeHylight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Markdown from "react-markdown";

const App = () => {
  const [code, setCode] = useState('')
  const [review, setReview] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    prism.highlightAll();
  })

  async function reviewCode(){
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', {code: code})
      setReview(response.data)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }
  return (
    <>
      <div className="pt-5">
        <h1 className="text-3xl text-gray-50 text-center">AI code reviewer</h1>
      </div>
      <main className="w-full h-screen gap-4 p-4 flex justify-center items-center">
        <div className="basis-[50%] bg-zinc-900 relative h-full rounded-lg">
          <div className="h-full">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                color: '#d1d5db',
                borderRadius: '5px',
                width: '100%',
                height: '100%',
              }}
            />
          </div>
          <div><button onClick={reviewCode} className="bg-blue-400 absolute hover:bg-blue-300 bottom-20 cursor-pointer right-6 px-5 py-1 rounded-md">submit for review</button></div>
        </div>
        <div className="basis-[50%] overflow-auto bg-zinc-400 text-md p-6 h-full rounded-lg">
        {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-4 bg-gray-500 rounded w-3/4"></div>
              <div className="h-4 bg-gray-500 rounded w-full"></div>
              <div className="h-4 bg-gray-500 rounded w-5/6"></div>
              <div className="h-4 bg-gray-500 rounded w-2/3"></div>
            </div>
          ) : (
            <Markdown rehypePlugins={[rehypeHylight]}>{review}</Markdown>
          )}
        </div>
      </main>
    </>
  );
};

export default App;
