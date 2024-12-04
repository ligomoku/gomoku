import { Search } from "lucide-react";

export const PlayerList = () => {
  return (
    <main className="min-h-screen bg-[#1e1e1e] p-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl text-gray-300">FIDE players</h1>
          <div className="flex">
            <input
              type="text"
              placeholder="Search for players"
              className="rounded-l bg-[#2a2a2a] px-4 py-2 text-gray-300 focus:outline-none"
            />
            <button className="rounded-r bg-[#4a9eed] px-4 py-2">
              <Search className="h-5 w-5 text-white" />
            </button>
          </div>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#2a2a2a]">
                <th className="px-4 py-3 font-medium text-gray-300">Name</th>
                <th className="px-4 py-3 text-right font-medium text-gray-300">
                  Classical
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-300">
                  Rapid
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-300">
                  Blitz
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-300">
                  Age this year
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#2a2a2a]">
                <td className="px-4 py-3">
                  <span className="font-medium text-[#ffa500]">GM </span>
                  <span className="text-[#4a9eed]">
                    <img
                      src="https://flagcdn.com/16x12/no.png"
                      className="mr-2 inline"
                      alt="Norway flag"
                    />
                    Carlsen, Magnus
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-gray-300">2831</td>
                <td className="px-4 py-3 text-right text-gray-300">2838</td>
                <td className="px-4 py-3 text-right text-gray-300">2890</td>
                <td className="px-4 py-3 text-right text-gray-300">34</td>
              </tr>
              <tr className="border-b border-[#2a2a2a] bg-[#252525]">
                <td className="px-4 py-3">
                  <span className="font-medium text-[#ffa500]">GM </span>
                  <span className="text-[#4a9eed]">
                    <img
                      src="https://flagcdn.com/16x12/us.png"
                      className="mr-2 inline"
                      alt="USA flag"
                    />
                    Caruana, Fabiano
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-gray-300">2805</td>
                <td className="px-4 py-3 text-right text-gray-300">2766</td>
                <td className="px-4 py-3 text-right text-gray-300">2796</td>
                <td className="px-4 py-3 text-right text-gray-300">32</td>
              </tr>
              <tr className="border-b border-[#2a2a2a]">
                <td className="px-4 py-3">
                  <span className="font-medium text-[#ffa500]">GM </span>
                  <span className="text-[#4a9eed]">
                    <img
                      src="https://flagcdn.com/16x12/us.png"
                      className="mr-2 inline"
                      alt="USA flag"
                    />
                    Nakamura, Hikaru
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-gray-300">2802</td>
                <td className="px-4 py-3 text-right text-gray-300">2755</td>
                <td className="px-4 py-3 text-right text-gray-300">2860</td>
                <td className="px-4 py-3 text-right text-gray-300">37</td>
              </tr>
              <tr className="border-b border-[#2a2a2a] bg-[#252525]">
                <td className="px-4 py-3">
                  <span className="font-medium text-[#ffa500]">GM </span>
                  <span className="text-[#4a9eed]">
                    <img
                      src="https://flagcdn.com/16x12/in.png"
                      className="mr-2 inline"
                      alt="India flag"
                    />
                    Erigaisi Arjun
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-gray-300">2801</td>
                <td className="px-4 py-3 text-right text-gray-300">2694</td>
                <td className="px-4 py-3 text-right text-gray-300">2749</td>
                <td className="px-4 py-3 text-right text-gray-300">21</td>
              </tr>
              <tr className="border-b border-[#2a2a2a]">
                <td className="px-4 py-3">
                  <span className="font-medium text-[#ffa500]">GM </span>
                  <span className="text-[#4a9eed]">
                    <img
                      src="https://flagcdn.com/16x12/in.png"
                      className="mr-2 inline"
                      alt="India flag"
                    />
                    Gukesh D
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-gray-300">2783</td>
                <td className="px-4 py-3 text-right text-gray-300">2654</td>
                <td className="px-4 py-3 text-right text-gray-300">2615</td>
                <td className="px-4 py-3 text-right text-gray-300">18</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};
