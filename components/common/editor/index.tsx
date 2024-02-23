"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import styles from "./Editor.module.css";
import { Toolbar } from "./toolbar";


export default function TiptapEditor({ doc, provider }: any) {
    // Set up editor with plugins
    const editor = useEditor({
        editorProps: {
            attributes: {
                // Add styles to editor element

            },
        },
        extensions: [
            StarterKit.configure({
                history: false,
            }),
        ],
        content: '<p>Hello World! 🌎️</p>',
    });

    return (
        <div className="border border-base-content/10 rounded-xl font-work">
            <div >
                <Toolbar editor={editor} />
            </div>
            <EditorContent editor={editor} />
        </div>
    );
}