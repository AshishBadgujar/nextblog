"use client"

import { IComment } from "@/data/interfaces"
import { ReactNode, createContext, useContext, useState } from "react";

type commentContextType = {
    addComment: (newComment: any) => any;
    editComment: (id: string, updatedComment: any) => any;
    deleteComment: (id: string) => any;
}

const commentContextDefaultValues: commentContextType = {
    addComment: () => { },
    editComment: () => { },
    deleteComment: () => { },
}

const CommentContext = createContext<commentContextType>(commentContextDefaultValues)

type Props = {
    children: ReactNode
}

export const CommentProvider = ({ children }: Props) => {
    const addComment = async (newComment: any) => {
        try {
            const response = await fetch("/api/comment/new", {
                method: "POST",
                body: JSON.stringify(newComment)
            })
            let temp = await response.json()
            return temp
        } catch (error) {
            console.log(error)
            return null
        }
    }
    const editComment = async (id: string, updatedComment: any) => {
        try {
            const response = await fetch(`/api/comment/${id}`, {
                method: "PATCH",
                body: JSON.stringify(updatedComment)
            })
            if (response.ok) {
                let temp = await response.json()
                return temp
            }
        } catch (error) {
            console.log(error)
            return null
        }
    }
    const deleteComment = async (id: string) => {
        try {
            const response = await fetch(`/api/comment/${id}`, {
                method: "DELETE",
            })
            if (response.ok) {
                return true
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }
    return <CommentContext.Provider value={{
        addComment,
        editComment,
        deleteComment
    }}>{children}</CommentContext.Provider>
}

export const useCommentContext = () => useContext(CommentContext)