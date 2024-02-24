"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import { Toolbar } from "./toolbar";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Document from "@tiptap/extension-document";
import CodeBlock from "@tiptap/extension-code-block";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import Heading from "@tiptap/extension-heading";
import Code from "@tiptap/extension-code";
import Strike from '@tiptap/extension-strike'
import Blockquote from '@tiptap/extension-blockquote'
import Link from '@tiptap/extension-link'
import Typography from '@tiptap/extension-typography'
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Youtube from '@tiptap/extension-youtube'

export default function TiptapEditor({ content, setContent }: any) {
    // Set up editor with plugins
    const editor = useEditor({
        editorProps: {},
        content: content,
        onUpdate({ editor }) {
            setContent(editor.getHTML());
        },
        extensions: [Document, Typography, Paragraph, Youtube, HorizontalRule, Image, Text, Underline, Bold, Strike, Code, CodeBlock, Blockquote, OrderedList, BulletList, ListItem, Link.configure({
            openOnClick: false,
            autolink: true,
        }), Heading.configure({
            levels: [1, 2, 3],
        }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Placeholder.configure({
                placeholder: 'Write something …',
            })
        ],
    });

    return (
        <div className="border border-base-content/10 rounded-xl font-work">
            <div>
                <Toolbar editor={editor} />
            </div>
            <EditorContent editor={editor} className="p-4" />
        </div>
    );
}







