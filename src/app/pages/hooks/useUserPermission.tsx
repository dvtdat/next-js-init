import { useEffect, useState } from "react";

//{value: token, setStorageValue} = useStorage(key, defaultvalue) key -> required, defaultValue: optional 
// {value: token} = useStorage('token');
// token
export default function useUserPermission() {
    const [permission, setPermission] = useState<string>("User");

    const getUserPermission = () => {
      // ... TO DO 
      setPermission(localStorage.getItem("permission") ?? '');
    }

    useEffect(()=> {
      getUserPermission();
    }, [])

    const setUserPermission = (newPermission: string) => {
        localStorage.setItem("permission", newPermission);
        setPermission(newPermission);
        return;
    }
    const isLocalUser = () => {
        return true;
        // TO DO
    }
    const isLocal = isLocalUser();
    const userPermission = permission && isLocal;

    return [userPermission, setUserPermission]
  }
  