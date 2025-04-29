import { Editor } from "@tinymce/tinymce-react";

const TextareaDescription = ({
  apiKey,
  value,
  onChange,
  ...rest
}: {
  apiKey: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <Editor
      apiKey={apiKey}
      value={value}
      init={{
        height: 300,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "undo redo | formatselect | fontselect fontsizeselect | " +
          "bold italic underline | forecolor backcolor | " +
          "alignleft aligncenter alignright alignjustify | " +
          "bullist numlist outdent indent | removeformat",
      }}
      onEditorChange={onChange}
      {...rest}
    />
  );
};

export default TextareaDescription;
