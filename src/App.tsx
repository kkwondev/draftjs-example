import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function App() {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  const handleOnChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  // 콘텐츠 내용 가져오기.
  const converContent =
    editorState instanceof EditorState
      ? convertToRaw(editorState.getCurrentContent())
      : editorState;

  // html 형식으로 변환
  const html = draftToHtml(converContent);

  return (
    <>
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="wrapper-class"
          toolbarClassName="toolbar-class"
          editorClassName="editor-class"
          // defaultEditorState={editorState}
          onEditorStateChange={handleOnChange}
          placeholder="글을 쓰시오."
          toolbar={{
            options: ["inline", "list", "textAlign", "link"], // 원하는 옵션 선택
          }}
          localization={{
            locale: "ko",
          }}
        />
      </div>
      <div>
        <h2>안에 내용들</h2>
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>
    </>
  );
}

export default App;
