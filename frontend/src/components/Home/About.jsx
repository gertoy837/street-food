import { ShoppingCartIcon, UserGroupIcon } from "@heroicons/react/20/solid";
import { BanknotesIcon } from "@heroicons/react/24/outline";

const features = [
  {
    name: "Pesan Online",
    description:
      "Pesan makanan favorit Anda secara online dengan mudah dan cepat.",
    icon: ShoppingCartIcon,
  },
  {
    name: "Harga Terjangkau",
    description:
      "Nikmati makanan jalanan berkualitas dengan harga yang terjangkau.",
    icon: BanknotesIcon,
  },
  {
    name: "Komunitas Kuliner",
    description:
      "Bergabunglah dengan komunitas pecinta kuliner jalanan untuk berbagi pengalaman dan rekomendasi.",
    icon: UserGroupIcon,
  },
];

export default function About() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-orange-600">
                Pengalaman Aplikasi Street Food
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Pesan Makanan Jalanan Lezat Anda Secara Online
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Temukan sensasi baru dalam pesan makanan jalanan favorit Anda
                secara online dengan aplikasi kami.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-orange-600"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            src="https://source.unsplash.com/800x600/?street-food"
            alt="Makanan Jalanan"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  );
}
