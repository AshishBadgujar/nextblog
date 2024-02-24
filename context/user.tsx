"use client"

import { IUser } from "@/data/interfaces"
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type userContextType = {
    users: IUser[],
    getData: () => any;
    getUser: (id: string) => any;
    getBlogsByUserId: (id: string) => any;
    editUser: (id: string, updatedUser: any) => any;
    deleteUser: (id: string) => any
}

const userContextDefautValues: userContextType = {
    users: [],
    getData: () => { },
    getUser: () => { },
    getBlogsByUserId: () => { },
    editUser: () => { },
    deleteUser: () => { }
}

const UserContext = createContext<userContextType>(userContextDefautValues)

type Props = {
    children: ReactNode;
}

export const UserProvider = ({ children }: Props) => {
    const [users, setUsers] = useState<IUser[]>([])

    async function getData() {
        const res = await fetch('/api/user', { cache: 'no-store' })
        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
        let temp = await res.json()
        setUsers(temp)
        return temp
    }
    useEffect(() => {
        getData()
    }, [])

    const getUser = async (id: string) => {
        const res = await fetch(`/api/user/${id}`, { cache: 'no-store' })
        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
        let temp = await res.json()
        return temp
    }
    const getBlogsByUserId = async (id: string) => {
        const res = await fetch(`/api/user/${id}/blogs`, { cache: 'no-store' })
        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
        let temp = await res.json()
        return temp
    }

    const editUser = async (id: string, updatedUser: any) => {
        try {
            const response = await fetch(`/api/user/${id}`, {
                method: "PATCH",
                body: JSON.stringify(updatedUser)
            })
            if (response.ok) {
                let temp = await response.json()
                setUsers((prevUsers: any[]) => {
                    return prevUsers.map(user => {
                        if (user._id === id) {
                            return { ...user, ...temp };
                        }
                        return user;
                    });
                });
                return temp
            }
        } catch (error) {
            console.log(error)
            return null
        }
    }

    const deleteUser = async (id: string) => {
        try {
            const response = await fetch(`/api/user/${id}`, {
                method: "DELETE",
            })
            if (response.ok) {
                const updatedUsers = users.filter((post: any) => post._id !== id);
                setUsers(updatedUsers);
                return true
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }
    return (
        <UserContext.Provider value={{
            users,
            getData,
            getUser,
            editUser,
            deleteUser,
            getBlogsByUserId
        }}>{children}</UserContext.Provider>
    )

}

export const useUserContext = () => useContext(UserContext)