const contributors = [
  { id: 0, name: "rotimi" },
  { id: 1, name: "@debanjo_israel" },
  { id: 2, name: "ezekiel" },
  { id: 3, name: "Himesan" },
  { id: 4, name: "chukwus618" },
  { id: 5, name: "Ren" },
  { id: 6, name: "Damola" },
  { id: 7, name: "Adegbola" },
  { id: 8, name: "meklitseife86" },
  { id: 9, name: "emeka iwegbu" },
  { id: 10, name: "IheanachoVictory" },
  { id: 11, name: "Chinwendu Enyinnah" },
  { id: 12, name: "Chinwendu Enyinnah" },
  { id: 13, name: "Ahurika" },
  { id: 14, name: "Toria" },
  { id: 15, name: "Habeeb" },
  { id: 16, name: "Diara" },
  { id: 17, name: "Winner" },
  { id: 18, name: "rugue" },
  { id: 19, name: "AdeneeyDev" },
  { id: 20, name: "Roy Ibemgbo" },
  { id: 21, name: "Gadus" },
  { id: 22, name: "@Agad$" },
  { id: 23, name: "Katsayal" },
  { id: 24, name: "mariam" },
  { id: 25, name: "Michael" },
  { id: 26, name: "oladapo.jacob" },
  { id: 27, name: "@Bee" },
  { id: 28, name: "Leke" },
  { id: 29, name: "abdillah issa" },
  { id: 30, name: "Richard oduh" },
  { id: 31, name: "andybundy" },
  { id: 32, name: "rhema omerah" },
  { id: 33, name: "Adebimpe" },
  { id: 34, name: "@sophie" },
  { id: 35, name: "eshiet_inyang" },
  { id: 36, name: "@adeniyi_peter" },
  { id: 37, name: "Adegoke Samuel Bamidele" },
  { id: 38, name: "@adeniyi_peter" },
  { id: 39, name: "Priest" },
  { id: 40, name: "ibironkeibikunlef" },
  { id: 41, name: "Inioluwa Oguntobi" },
  { id: 42, name: "Toria" },
  { id: 43, name: "Roland" },
  { id: 44, name: "clement" },
];

export default function IbisContributorsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-blue-600">
            HNG Internship
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Team Ibis Contributors
          </h1>

          <p className="mt-4 text-base leading-7 text-gray-600">
            Meet the members of Team Ibis who contributed to the Zedu platform.
          </p>

          <p className="mt-2 text-sm text-gray-500">
            {contributors.length} contributors
          </p>
        </div>

        {/* Contributors */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contributors.map((contributor) => (
            <article
              key={contributor.id}
              className="rounded-xl border border-gray-200 bg-white p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700">
                {getInitials(contributor.name)}
              </div>

              <h2 className="break-words text-base font-semibold text-gray-900">
                {contributor.name}
              </h2>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function getInitials(name: string) {
  return name
    .replace("@", "")
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
