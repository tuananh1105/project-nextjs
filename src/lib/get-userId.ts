export const getUserId = (): string => {
    if (typeof window === "undefined") {
      return ""; 
    }
  
    try {
      const storedUser = localStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : {};
      return user?.user?._id || "";
    } catch (error) {
      console.error("Lỗi khi parse dữ liệu user:", error);
      return "";
    }
  };