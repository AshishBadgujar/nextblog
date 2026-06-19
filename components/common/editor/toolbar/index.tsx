'use client'
import type { Editor } from '@tiptap/react'

type ToolbarItem = {
   key: string | Record<string, unknown>
   icon: string
   label: string
   onClick: () => void
}

export function Toolbar({ editor }: { editor: Editor | null }) {
   if (!editor) return null

   const items: ToolbarItem[] = [
      { key: 'bold', icon: 'ri-bold', label: 'Bold', onClick: () => editor.chain().focus().toggleBold().run() },
      { key: 'italic', icon: 'ri-italic', label: 'Italic', onClick: () => editor.chain().focus().toggleItalic().run() },
      { key: 'strike', icon: 'ri-strikethrough', label: 'Strikethrough', onClick: () => editor.chain().focus().toggleStrike().run() },
      { key: 'underline', icon: 'ri-underline', label: 'Underline', onClick: () => editor.chain().focus().toggleUnderline().run() },
      { key: 'blockquote', icon: 'ri-double-quotes-l', label: 'Quote', onClick: () => editor.chain().focus().toggleBlockquote().run() },
      { key: { heading: { level: 1 } }, icon: 'ri-h-1', label: 'Heading 1', onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
      { key: { heading: { level: 2 } }, icon: 'ri-h-2', label: 'Heading 2', onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
      { key: { heading: { level: 3 } }, icon: 'ri-h-3', label: 'Heading 3', onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
      { key: 'orderedList', icon: 'ri-list-ordered', label: 'Ordered list', onClick: () => editor.chain().focus().toggleOrderedList().run() },
      { key: 'bulletList', icon: 'ri-list-unordered', label: 'Bullet list', onClick: () => editor.chain().focus().toggleBulletList().run() },
      { key: 'code', icon: 'ri-code-line', label: 'Inline code', onClick: () => editor.chain().focus().toggleCode().run() },
      { key: 'codeBlock', icon: 'ri-terminal-box-line', label: 'Code block', onClick: () => editor.chain().focus().toggleCodeBlock().run() },
      { key: { textAlign: 'left' }, icon: 'ri-align-left', label: 'Align left', onClick: () => editor.chain().focus().setTextAlign('left').run() },
      { key: { textAlign: 'center' }, icon: 'ri-align-center', label: 'Align center', onClick: () => editor.chain().focus().setTextAlign('center').run() },
      { key: { textAlign: 'right' }, icon: 'ri-align-right', label: 'Align right', onClick: () => editor.chain().focus().setTextAlign('right').run() },
      { key: 'separator', icon: 'ri-separator', label: 'Divider', onClick: () => editor.chain().focus().setHorizontalRule().run() },
      {
         key: 'link',
         icon: 'ri-link',
         label: 'Insert link',
         onClick: () => {
            const previous = editor.getAttributes('link').href
            const url = window.prompt('URL', previous)
            if (url === null) return
            if (url === '') {
               editor.chain().focus().extendMarkRange('link').unsetLink().run()
               return
            }
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
         },
      },
      {
         key: 'youtube',
         icon: 'ri-youtube-fill',
         label: 'Embed YouTube',
         onClick: () => {
            const url = window.prompt('YouTube URL')
            if (url) editor.commands.setYoutubeVideo({ src: url, width: 465, height: 260 })
         },
      },
   ]

   return (
      <div className="editor__toolbar">
         {items.map((item, index) => (
            <button
               key={index}
               type="button"
               onClick={item.onClick}
               aria-label={item.label}
               className={`tool-btn${editor.isActive(item.key as never) ? ' is-active' : ''}`}
            >
               <i className={item.icon} />
            </button>
         ))}
      </div>
   )
}
