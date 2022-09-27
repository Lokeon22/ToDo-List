import { Link } from "react-router-dom";

export function CreateAccount() {
  return (
    <form className="w-80 bg-white flex flex-col p-5 rounded">
      <h1 className="mb-3 text-black font-semibold">Crie sua conta</h1>
      <input type="text" placeholder="Email" className="py-2 px-2" />
      <input type="password" placeholder="Senha" className="py-2 px-2 mt-2" />
      <button
        type="submit"
        className="bg-indigo-700 text-white py-2 rounded mt-4 hover:bg-indigo-900"
      >
        Cadastrar
      </button>
      <Link
        to="/"
        className="mt-2 text-sm text-indigo-900 cursor-pointer w-full"
      >
        Voltar para o login
      </Link>
    </form>
  );
}
