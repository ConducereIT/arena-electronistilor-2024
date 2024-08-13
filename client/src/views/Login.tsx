import Navbar from "../components/Navbar";

export default function Login() {
  return (
    <>
      <Navbar />
      <div>Login</div>
      <div>{import.meta.env.VITE_API_URL}</div>
    </>
  );
}
