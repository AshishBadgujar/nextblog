'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import Strike from '@tiptap/extension-strike'
import Code from '@tiptap/extension-code'
import CodeBlock from '@tiptap/extension-code-block'
import Blockquote from '@tiptap/extension-blockquote'
import Heading from '@tiptap/extension-heading'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Link from '@tiptap/extension-link'
import Typography from '@tiptap/extension-typography'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import Youtube from '@tiptap/extension-youtube'
import { Toolbar } from './toolbar'

interface Props {
   content: string
   setContent: (value: string) => void
}

export default function TiptapEditor({ content, setContent }: Props) {
   const editor = useEditor({
      immediatelyRender: false,
      content,
      onUpdate: ({ editor }) => setContent(editor.getHTML()),
      editorProps: { attributes: { class: 'tiptap' } },
      extensions: [
         Document,
         Paragraph,
         Text,
         Typography,
         Bold,
         Italic,
         Underline,
         Strike,
         Code,
         CodeBlock,
         Blockquote,
         OrderedList,
         BulletList,
         ListItem,
         HorizontalRule,
         Youtube,
         Link.configure({ openOnClick: false, autolink: true }),
         Heading.configure({ levels: [1, 2, 3] }),
         TextAlign.configure({ types: ['heading', 'paragraph'] }),
         Placeholder.configure({ placeholder: 'Write something …' }),
      ],
   })

   return (
      <div className="editor glass">
         <Toolbar editor={editor} />
         <EditorContent editor={editor} className="editor__content" />
      </div>
   )
}
