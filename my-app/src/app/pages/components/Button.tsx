import { useEffect } from "react";
import useStorage from "../hooks/useStorage";

export type ButtonProps = {
  toggle?: string;
  onToggle?: () => void;
};

type UserProfile = {
  name: string;
  age: number;
};

export const Button = ({ toggle, onToggle }: ButtonProps) => {
  const { value: userProfile, setValue: setUserProfile } =
    useStorage<UserProfile>("user_profile1");

  useEffect(() => {
    console.log("Updating...");
  }, [toggle]);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setUserProfile((prev) => {
            if (prev.age === 23) return { ...prev, name: "DVTD", age: 19 };
            return { ...prev, age: 23, name: "An" };
          });
        }}
      >
        Button
      </button>
    </div>
  );
};
