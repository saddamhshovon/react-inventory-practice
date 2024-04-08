const useAuth = () => {
  const token = window.localStorage.getItem("token");
  const authenticated = token ? true : false;
  return authenticated;
};

export default useAuth;
