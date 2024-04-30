import React from 'react';

const testimonials = [
  {
    quote:
      'Aplikasi ini benar-benar memudahkan saya dalam menemukan makanan jalanan terbaik di sekitar. Antarmukanya sangat intuitif dan mudah digunakan.',
    name: 'John Doe',
    role: 'Pengguna Aplikasi',
  },
  {
    quote:
      'Saya suka fitur rekomendasi personalnya yang membantu saya menemukan tempat-tempat kuliner jalanan baru yang sesuai dengan preferensi saya.',
    name: 'Jane Smith',
    role: 'Food Blogger',
  },
  {
    quote:
      'Proses pemesanan dan pembayaran sangat lancar melalui aplikasi ini. Saya dapat menikmati makanan jalanan favorit saya dengan cepat dan mudah.',
    name: 'Michael Johnson',
    role: 'Pengguna Aplikasi',
  },
];

const TestimonialSection = () => {
  return (
    <div className="bg-gray-100 py-16 pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            Apa yang Mereka Katakan?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-gray-500">
            Lihat testimoni dari pengguna aplikasi website <span className='fontH1'>street food</span> kami.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6">
              <blockquote>
                <p className="text-gray-800">{testimonial.quote}</p>
              </blockquote>
              <div className="mt-4 flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}`}
                    alt=""
                  />
                </div>
                <div className="ml-4">
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;