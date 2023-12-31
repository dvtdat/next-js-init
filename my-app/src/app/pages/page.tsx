"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./components/Button";
import useUserPermission from "./hooks/useUserPermission";
import useStorage from "./hooks/useStorage";
import useDebounce from "./hooks/useDebounce";
import App from "./app";
import Toggle from "./toggle";
import Theme from "./theme";
import Clipboard from "./clipboard";

type UserProfile = {
  name: string;
  age: number;
};

export default function Test() {
  /*
  const [cnt, setCnt] = useState<boolean>(() => true);
  const defaultUserProfile: UserProfile = {
    name: "Dat",
    age: 19,
  };
  const [year, setYear] = useState(2023);
  const [userPermission, setUserPermission] = useUserPermission();
  const { value: userProfile, setValue: setUserProfile } =
    useStorage<UserProfile>("user_profile1");
  const debouncedUserProfile = useDebounce(userProfile, 2000);

  useEffect(() => {
    setYear(2023 - debouncedUserProfile.age);
  }, [debouncedUserProfile]); 
  */

  return (
    <div>
      <Clipboard />
    </div>
  );
}
