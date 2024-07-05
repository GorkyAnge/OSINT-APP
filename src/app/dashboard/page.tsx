'use client'
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (!searchQuery) return;

    // Mostrar la alerta de "Cargando"
    Swal.fire({
      title: "Cargando",
      html: "Estamos buscando la información...",
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch(`/api/domains/search?domain=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data.domains || []);

      // Cerrar la alerta de "Cargando" y mostrar la alerta de "Éxito"
      Swal.fire({
        icon: "success",
        title: "¡Búsqueda exitosa!",
        text: "Los datos han sido cargados correctamente.",
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      // En caso de error, mostrar una alerta de error
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Hubo un error al cargar los datos.",
      });
    }
  };

  // @ts-ignore
  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-900">Dashboard ChismOSINT</h1>
          <p className="text-gray-700 text-center">
            Ingresa el dominio principal de la empresa que deseas investigar.
          </p>
          <div className="relative">
            <label htmlFor="Search" className="sr-only"> Search </label>
            <input
                type="text"
                id="Search"
                placeholder="Buscar empresa..."
                className="pl-4 w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
            <button
                type="button"
                className="text-gray-600 hover:text-gray-700"
                onClick={handleSearch}
            >
              <span className="sr-only">Search</span>
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
              >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </span>
          </div>
          <div className="mt-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"># Activo</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo Activo</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subcategoría</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre Activo</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción Activo</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valoración</th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {searchResults.map((result, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Servicios</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Dominio</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.domain}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.create_date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">N/A</td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}
