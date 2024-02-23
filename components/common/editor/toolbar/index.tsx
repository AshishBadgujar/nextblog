import { Editor } from "@tiptap/react";
import styles from "./Toolbar.module.css";

type Props = {
    editor: Editor | null;
};

export function Toolbar({ editor }: Props) {
    if (!editor) {
        return null;
    }

    return (
        <div className="p-2 flex flex-wrap">
            <button
                className="btn btn-ghost btn-sm"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                data-active={editor.isActive("bold") ? "is-active" : undefined}
                aria-label="bold"
            >
                B
            </button>
            <button
                className="btn btn-ghost btn-sm"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                data-active={editor.isActive("italic") ? "is-active" : undefined}
                aria-label="italic"
            >
                i
            </button>
            <button
                className="btn btn-ghost btn-sm"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                data-active={editor.isActive("strike") ? "is-active" : undefined}
                aria-label="strikethrough"
            >
                S
            </button>
        </div>
    );
}