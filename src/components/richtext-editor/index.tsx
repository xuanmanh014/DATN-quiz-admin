import { Dispatch, FC, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import QuillResizeImage from 'quill-resize-image';
import "./styles.scss";
import { UploadApis } from "../../apis/upload/index.api";

Quill.register("modules/resize", QuillResizeImage);

interface IRichtextEditorProps {
    value?: string
    setValue: Dispatch<SetStateAction<string>>
}

const RichtextEditor: FC<IRichtextEditorProps> = ({ value, setValue }) => {
    const quillRef = useRef<ReactQuill | null>(null);
    const [editorHtml, setEditorHtml] = useState<string>(value || "");

    const handleImageInsert = async (file: File) => {
        const formData = new FormData()
        formData.append("file", file);
        const image = await UploadApis.uploadFile(formData);
        if (image?.data && quillRef.current) {
            const quill = quillRef.current.getEditor();
            const imageUrl = image.data.filePath;
            const range = quill.getSelection();

            if (range) {
                quill.insertEmbed(range.index, 'image', imageUrl);
                quill.setSelection(range.index + 1, 0);
            }
        }
    };

    useEffect(() => {
        return () => {
            setValue("")
        }
    }, [])

    const modules = useMemo(() => (
        {
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ align: ["right", "center", "justify"] }],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["image"],
                ],
                handlers: {
                    image: function () {
                        const input = document.createElement('input');
                        input.setAttribute('type', 'file');
                        input.setAttribute('accept', `image/`);
                        input.click();
                        input.onchange = () => {
                            const file = input.files?.[0];
                            if (file) {
                                handleImageInsert(file);
                            }
                        };
                    },
                },
            },
            resize: {
                locale: {},
            },
        }
    ), []);

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "color",
        "image",
        "background",
        "align"
    ];

    const handleProcedureContentChange = (content: any) => {
        setValue(content);
        setEditorHtml(content);
    };

    return (
        <>
            <ReactQuill
                ref={quillRef}
                theme="snow"
                modules={modules}
                formats={formats}
                value={editorHtml}
                onChange={handleProcedureContentChange}
            />
        </>
    );
}

export default RichtextEditor;