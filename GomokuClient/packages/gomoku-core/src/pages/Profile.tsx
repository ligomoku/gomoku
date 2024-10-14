import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Activity, ChevronUp, Users } from "lucide-react";
import { t } from "@lingui/macro";

export function Profile() {
  const ratingData = [
    { date: "2019", rating: 1860 },
    { date: "2020", rating: 1920 },
    { date: "2021", rating: 1880 },
    { date: "2022", rating: 1840 },
    { date: "2023", rating: 1900 },
    { date: "2024", rating: 1920 },
  ];

  return (
    <div className="min-h-screen bg-[#161512] text-base text-[#bababa] sm:text-lg">
      <main className="container mx-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          <div className="md:col-span-1">
            <div className="space-y-6">
              <div>
                <h2 className="mb-2 text-xl font-bold">{t`STANDARD`}</h2>
                <div className="flex items-center">
                  <span className="mr-2 text-3xl font-bold">1920</span>
                  <ChevronUp className="text-green-500" />
                  <span className="text-green-500">12</span>
                </div>
                <div className="text-sm">8,721 games</div>
              </div>
              <div>
                <h2 className="mb-2 text-xl font-bold">{t`BLITZ`}</h2>
                <div className="flex items-center">
                  <span className="mr-2 text-3xl font-bold">1885</span>
                  <ChevronUp className="text-green-500" />
                  <span className="text-green-500">5</span>
                </div>
                <div className="text-sm">5,463 games</div>
              </div>
              <div>
                <h2 className="mb-2 text-xl font-bold">{t`LIGHTNING`}</h2>
                <div className="flex items-center">
                  <span className="mr-2 text-3xl font-bold">1750</span>
                  <ChevronUp className="text-green-500" />
                  <span className="text-green-500">8</span>
                </div>
                <div className="text-sm">3,131 games</div>
              </div>
            </div>
          </div>
          <div className="md:col-span-2 lg:col-span-2">
            <div className="mb-4 flex items-center">
              <div className="mr-4 h-12 w-12 rounded-full bg-green-500"></div>
              <h1 className="text-3xl font-bold sm:text-4xl">{t`GomokuMaster`}</h1>
            </div>
            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <div className="text-2xl font-bold">723</div>
                <div className="text-sm">{t`Tournament Points`}</div>
              </div>
              <div>
                <div className="text-2xl font-bold">2</div>
                <div className="text-sm">{t`Study`}</div>
              </div>
              <div>
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm">{t`Forum Posts`}</div>
              </div>
              <div>
                <div className="text-2xl font-bold">1</div>
                <div className="text-sm">{t`Blog Posts`}</div>
              </div>
            </div>
            <div className="mb-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={ratingData}>
                  {/*@ts-expect-error*/}
                  <XAxis dataKey="date" stroke="#bababa" />
                  {/*@ts-expect-error*/}
                  <YAxis stroke="#bababa" />
                  <Line
                    type="monotone"
                    dataKey="rating"
                    stroke="#3B82F6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="rounded-lg bg-[#262421] p-4">
              <h2 className="mb-4 text-xl font-bold">Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Activity className="mr-4 text-blue-500" size={24} />
                  <div>
                    <div className="font-bold">Played 1 Standard game</div>
                    <div className="text-sm">1920 (+8)</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Activity className="mr-4 text-blue-500" size={24} />
                  <div>
                    <div className="font-bold">Played 2 Blitz games</div>
                    <div className="text-sm">1885 (+5)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-3 lg:col-span-1">
            <div className="space-y-6 rounded-lg bg-[#262421] p-4">
              <div>
                <Users className="mb-2" size={24} />
                <h2 className="text-xl font-bold">Japan</h2>
                <div className="text-sm">Member since Sep 26, 2020</div>
              </div>
              <div>
                <div className="font-bold text-green-500">Active right now</div>
              </div>
              <div>
                <div className="mb-1 font-bold">Profile completion: 67%</div>
                <div className="h-2.5 w-full rounded-full bg-[#3a3a3a]">
                  <div
                    className="h-2.5 rounded-full bg-green-500"
                    style={{ width: "67%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="mb-1 font-bold">Time spent playing</div>
                <div className="text-sm">45 days 8 hours 22 minutes</div>
              </div>
              <div>
                <h2 className="mb-2 text-xl font-bold">Teams</h2>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                    Gomoku Japan
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-blue-500"></div>
                    Tokyo Renju Club
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-yellow-500"></div>
                    Asia Gomoku League
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
