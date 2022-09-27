import { Link } from "react-router-dom";

export function Login() {
  return (
    <form className="w-80 bg-white flex flex-col p-5 rounded">
      <h1 className="mb-3 text-black font-semibold">Faça seu login</h1>
      <input type="text" placeholder="Email" className="py-2 px-2" />
      <input type="password" placeholder="Senha" className="py-2 px-2 mt-2" />
      <button
        type="submit"
        className="bg-indigo-700 text-white py-2 rounded mt-4 hover:bg-indigo-900"
      >
        Entrar
      </button>
      <Link
        to="/register"
        className="mt-2 text-sm text-gray-800 cursor-pointer hover:text-indigo-900"
      >
        Não possui uma conta?
      </Link>
    </form>
  );
}
