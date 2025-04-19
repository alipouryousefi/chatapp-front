import { API_URL } from "../constants/url";

const useLogout = () => {
  const logout = async () => {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if(!res.ok){
      throw new Error("Logout failed");
    }
  };

  return { logout };
};

export { useLogout };
