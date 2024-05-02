import React from "react";

const Checkout = () => {
  return (
    <div>
      <div class="min-w-0 flex-1 space-y-8">
        <div class="space-y-4">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            Alamat
          </h2>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                for="your_name"
                class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                {" "}
                Nama Penerima{" "}
              </label>
              <input
                type="text"
                id="your_name"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                placeholder="Masukkan Nama Penerima"
                required
              />
            </div>

            <div>
              <label
                for="phone-input-3"
                class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                {" "}
                Phone Number<span className="text-red-600">*</span>{" "}
              </label>
              <div class="flex items-center">
                <button
                  id="dropdown-phone-button-3"
                  data-dropdown-toggle="dropdown-phone-3"
                  class="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                  type="button"
                >
                  +62
                </button>
                <div class="relative w-full">
                  <input
                    type="text"
                    id="phone-input"
                    class="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    placeholder="123-456-7890"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <div class="mb-2 flex items-center gap-2">
                <label
                  for="select-country-input-3"
                  class="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  {" "}
                  Alamat<span className="text-red-600">*</span>{" "}
                </label>
              </div>
              <textarea className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" name="" id="" cols="30" rows="10"></textarea>
            </div>

            {/* <div class="sm:col-span-2">
              <button
                type="submit"
                class="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                <svg
                  class="h-5 w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 12h14m-7 7V5"
                  />
                </svg>
                Add new address
              </button>
            </div> */}
          </div>
        </div>
      </div>

      {/* <div class="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
        <div class="flow-root">
          <div class="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
            <dl class="flex items-center justify-between gap-4 py-3">
              <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
                Subtotal
              </dt>
              <dd class="text-base font-medium text-gray-900 dark:text-white">
                $8,094.00
              </dd>
            </dl>

            <dl class="flex items-center justify-between gap-4 py-3">
              <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
                Savings
              </dt>
              <dd class="text-base font-medium text-green-500">0</dd>
            </dl>

            <dl class="flex items-center justify-between gap-4 py-3">
              <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
                Store Pickup
              </dt>
              <dd class="text-base font-medium text-gray-900 dark:text-white">
                $99
              </dd>
            </dl>

            <dl class="flex items-center justify-between gap-4 py-3">
              <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
                Tax
              </dt>
              <dd class="text-base font-medium text-gray-900 dark:text-white">
                $199
              </dd>
            </dl>

            <dl class="flex items-center justify-between gap-4 py-3">
              <dt class="text-base font-bold text-gray-900 dark:text-white">
                Total
              </dt>
              <dd class="text-base font-bold text-gray-900 dark:text-white">
                $8,392.00
              </dd>
            </dl>
          </div>
        </div>

        <div class="space-y-3">
          <button
            type="submit"
            class="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Proceed to Payment
          </button>

          <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
            One or more items in your cart require an account.{" "}
            <a
              href="#"
              title=""
              class="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
            >
              Sign in or create an account now.
            </a>
            .
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default Checkout;
