"use client"
import { Editor } from "@tiptap/react";
// <button
//     onClick={() => editor.chain().focus().toggleCode().run()}
//     disabled={
//         !editor.can()
//             .chain()
//             .focus()
//             .toggleCode()
//             .run()
//     }
//     className={editor.isActive('code') ? 'is-active' : ''}
// >
//     code
// </button>
// <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
//     clear marks
// </button>
// <button onClick={() => editor.chain().focus().clearNodes().run()}>
//     clear nodes
// </button>
// <button
//     onClick={() => editor.chain().focus().setParagraph().run()}
//     className={editor.isActive('paragraph') ? 'is-active' : ''}
// >
//     paragraph
// </button>
// <button
//     onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//     className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
// >
//     h1
// </button>
// <button
//     onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//     className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
// >
//     h2
// </button>
// <button
//     onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
//     className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
// >
//     h3
// </button>
// <button
//     onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
//     className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
// >
//     h4
// </button>
// <button
//     onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
//     className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
// >
//     h5
// </button>
// <button
//     onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
//     className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
// >
//     h6
// </button>
// <button
//     onClick={() => editor.chain().focus().toggleBulletList().run()}
//     className={editor.isActive('bulletList') ? 'is-active' : ''}
// >
//     bullet list
// </button>
// <button
//     onClick={() => editor.chain().focus().toggleOrderedList().run()}
//     className={editor.isActive('orderedList') ? 'is-active' : ''}
// >
//     ordered list
// </button>
// <button
//     onClick={() => editor.chain().focus().toggleCodeBlock().run()}
//     className={editor.isActive('codeBlock') ? 'is-active' : ''}
// >
//     code block
// </button>
// <button
//     onClick={() => editor.chain().focus().toggleBlockquote().run()}
//     className={editor.isActive('blockquote') ? 'is-active' : ''}
// >
//     blockquote
// </button>
// <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
//     horizontal rule
// </button>
// <button onClick={() => editor.chain().focus().setHardBreak().run()}>
//     hard break
// </button>
// <button
//     onClick={() => editor.chain().focus().undo().run()}
//     disabled={
//         !editor.can()
//             .chain()
//             .focus()
//             .undo()
//             .run()
//     }
// >
//     undo
// </button>
// <button
//     onClick={() => editor.chain().focus().redo().run()}
//     disabled={
//         !editor.can()
//             .chain()
//             .focus()
//             .redo()
//             .run()
//     }
// >
//     redo
// </button>
// <button
//     onClick={() => editor.chain().focus().setColor('#958DF1').run()}
//     className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
// >
//     purple
// </button>

type Props = {
    editor: Editor | null;
};


export function Toolbar({ editor }: Props) {
    if (!editor) {
        return null;
    }
    const toolbarArray = [
        {
            key: 'bold',
            icon: 'ri-bold',
            onclick: () => editor.chain().focus().toggleBold().run(),
        },
        {
            key: 'italic',
            icon: 'ri-italic',
            onclick: () => editor.chain().focus().toggleItalic().run(),
        },
        {
            key: 'strike',
            icon: 'ri-strikethrough',
            onclick: () => editor.chain().focus().toggleStrike().run(),
        },
        {
            key: 'underline',
            icon: 'ri-underline',
            onclick: () => editor.chain().focus().toggleUnderline().run(),
        },
        {
            key: 'blockquote',
            icon: 'ri-double-quotes-l',
            onclick: () => editor.chain().focus().toggleBlockquote().run(),
        },
        {
            key: { heading: { level: 1 } },
            icon: 'ri-h-1',
            onclick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        },
        {
            key: { heading: { level: 2 } },
            icon: 'ri-h-2',
            onclick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        },
        {
            key: { heading: { level: 3 } },
            icon: 'ri-h-3',
            onclick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        },
        {
            key: 'orderedList',
            icon: 'ri-list-ordered',
            onclick: () => editor.chain().focus().toggleOrderedList().run(),
        },
        {
            key: 'bulletList',
            icon: 'ri-list-unordered',
            onclick: () => editor.chain().focus().toggleBulletList().run(),
        },
        {
            key: 'code',
            icon: 'ri-code-line',
            onclick: () => editor.chain().focus().toggleCode().run(),
        },
        {
            key: 'codeBlock',
            icon: 'ri-terminal-box-line',
            onclick: () => editor.chain().focus().toggleCodeBlock().run(),
        },
        {
            key: { textAlign: 'left' },
            icon: 'ri-align-left',
            onclick: () => editor.chain().focus().setTextAlign('left').run(),
        },
        {
            key: { textAlign: 'center' },
            icon: 'ri-align-center',
            onclick: () => editor.chain().focus().setTextAlign('center').run(),
        },
        {
            key: { textAlign: 'right' },
            icon: 'ri-align-right',
            onclick: () => editor.chain().focus().setTextAlign('right').run(),
        },
        {
            key: { textAlign: 'justify' },
            icon: 'ri-align-justify',
            onclick: () => editor.chain().focus().setTextAlign('justify').run(),
        },
        {
            key: 'saperator',
            icon: 'ri-separator',
            onclick: () => editor.chain().focus().setHorizontalRule().run(),
        },
        {
            key: { textAlign: 'justify' },
            icon: 'ri-image-add-line',
            onclick: () => {
                const url = window.prompt('URL')
                if (url) {
                    editor.chain().focus().setImage({ src: url }).run()
                } else {
                    return
                }
            },
        },
        {
            key: 'link',
            icon: 'ri-link',
            onclick: () => {
                const previousUrl = editor.getAttributes('link').href
                const url = window.prompt('URL', previousUrl)

                // cancelled
                if (url === null) {
                    return
                }

                // empty
                if (url === '') {
                    editor.chain().focus().extendMarkRange('link').unsetLink()
                        .run()

                    return
                }

                // update link
                editor.chain().focus().extendMarkRange('link').setLink({ href: url })
                    .run()
            },
        },
        {
            key: 'youtube',
            icon: 'ri-youtube-fill',
            onclick: () => {
                const url = prompt('Enter YouTube URL')
                if (url) {
                    editor.commands.setYoutubeVideo({
                        src: url,
                        width: 465,
                        height: 260,
                    })
                }
            }
        },


    ]

    return (
        <div className="p-2 flex flex-wrap gap-1">
            {toolbarArray.map((item, index) =>
                <button
                    key={index}
                    onClick={item.onclick}
                    className={editor.isActive(item.key) ? "btn btn-ghost btn-sm btn-active" : 'btn btn-ghost btn-sm'}
                    aria-label={`${item.key}`}
                >
                    <i className={`${item.icon}`}></i>
                </button>
            )}
        </div>
    );
}