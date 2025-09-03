'use client';

import { createContext, useState } from "react";

export const UserContext = createContext();

export default function User({children}) {

    const [userData, setUserData] = useState(null);
}