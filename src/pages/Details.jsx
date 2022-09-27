import { api } from "../services/api";
import { PlusCircle, XSquare, Check, SmileySad } from "phosphor-react";
import { useState, useEffect } from "react";

import moon from "../assets/moon.svg";
import light from "../assets/light.svg";

import wolf from "../assets/witcher-logo.svg";

export function Details() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    async function fetchNote() {
      const response = await api.get("/note/1");
      setNotes(response.data);
    }

    fetchNote();
  }, []);

  async function createNote() {
    if (!title) {
      alert("Insira alguma nota");
      return;
    }

    await api.post("/note/1", { title });

    location.reload();
  }

  async function deleteNote(note) {
    const confirm = window.confirm("Deseja excluir nota?");

    if (confirm) {
      await api.delete(`/note/${note}`);
      location.reload();
    } else {
      return;
    }
  }

  function type(id) {
    const confirm = document.getElementById(`${id}`);
    confirm.classList.toggle("text-green-600");
    confirm.classList.toggle("line-through");
  }

  const moonIcon = document.getElementById("moon");
  const lightIcon = document.getElementById("light");

  const userTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

  function iconToggle() {
    moonIcon.classList.toggle("hidden");
    lightIcon.classList.toggle("hidden");
  }

  useEffect(() => {
    const themeCheck = () => {
      const moonIcon = document.getElementById("moon");
      const lightIcon = document.getElementById("light");

      if (userTheme === "dark" || (!userTheme && systemTheme)) {
        document.documentElement.classList.add("dark");
        moonIcon.classList.add("hidden");
        return;
      }
      lightIcon.classList.add("hidden");
    };

    themeCheck();
  }, []);

  function themeSwitch() {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      iconToggle();
      return;
    }
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    iconToggle();
  }

  return (
    <section className="max-w-full flex flex-col justify-center items-center pt-40 relative">
      <img
        src={wolf}
        className="absolute w-[350px] top-[-130px] left-0 sm:top-0 sm:left-[-370px] contrast-50 opacity-80"
      />
      <h2 className="text-white uppercase text-3xl  mb-8 text-center md:text-start">
        Lista de tarefas diárias
        <img
          src={moon}
          className="w-8 contrast-0 cursor-pointer"
          id="moon"
          onClick={themeSwitch}
        />
        <img
          src={light}
          className="w-8 contrast-0 cursor-pointer"
          id="light"
          onClick={themeSwitch}
        />
      </h2>
      <section className="flex justify-center items-center gap-2">
        <input
          className="text-white w-full sm:w-72 py-1 px-1 flex justify-center items-center bg-transparent outline-0 border-b-2"
          placeholder="Crie sua meta"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          type="button"
          className="text-white flex justify-center items-center hover:text-yellow-400"
          onClick={createNote}
        >
          <PlusCircle size={25} />
        </button>
      </section>
      <label className="text-white text-2xl mt-4">
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <div
              key={index}
              className="flex gap-2 bg-black mt-5 py-2 px-2 rounded w-full sm:w-[600px] shadow-lg shadow-white/20"
            >
              <button
                className="flex items-center py-1 px-1 text-xl gap-1.5"
                onClick={() => type(note.id)}
                key={index}
                id={note.id}
              >
                <Check size={22} />
                {note.title}
              </button>
              <button
                className="flex items-center text-red-600 hover:text-red-800 ml-auto"
                type="button"
                value={note.id}
                onClick={() => deleteNote(note.id)}
              >
                <XSquare size={22} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-8">
            Sem tarefas por aqui
            <SmileySad size={37} className="my-2 mx-auto" />
          </p>
        )}
      </label>
    </section>
  );
}
