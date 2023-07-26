"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./components/Button";
import useUserPermission from "./hooks/useUserPermission";
import useStorage from "./hooks/useStorage";
import useDebounce from "./hooks/useDebounce";

type UserProfile = {
  name: string;
  age: number;
};

export default function Test() {
  const [cnt, setCnt] = useState<boolean>(() => true);
  const defaultUserProfile: UserProfile = {
    name: "DVTD",
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

  return (
    <div>
      <Button />
      <p>{year}</p>
      <input
        style={{ color: "black" }}
        value={userProfile.age}
        onChange={(event) =>
          setUserProfile((prev) => {
            return { ...prev, age: Number(event.target.value) };
          })
        }
      ></input>
      <p>
        {userProfile?.name} / {userProfile?.age}
      </p>
    </div>
  );
}
