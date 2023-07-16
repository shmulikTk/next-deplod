import { atom } from "jotai";

interface user {
    userName: string,
    password: string
}

export const userAtom = atom<user>({userName: '', password: ''});
export const idTokenAtom = atom<string>('');
