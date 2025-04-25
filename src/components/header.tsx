"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useLogicCart from "@/hooks/useLogicCart";
import { useFetchCart } from "@/data/cart/useFetchCart";
import { Cart } from "./ui/icon";

export default function Header() {
  const [token, setToken] = useState(false);

  const { userId } = useLogicCart();

  const { data: cart } = useFetchCart(userId);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(true);
    }
  }, []);
  return (
    <header className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link href={"/website"}>
              <Image
                src="/images/fasion-zone.png"
                alt="Fashion Zone"
                className="bg-white"
                width={150}
                height={100}
              />
            </Link>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href={"/website/about"}
                  >
                    About
                  </Link>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    Careers
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    History
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    Services
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    Projects
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                {token ? (
                  <div className="flex gap-4">
                    <div className="mt-3 relative">
                      <Link href={"/website/cart"}>
                        <Cart />
                      </Link>
                      <span className="absolute top-[-5px] left-3 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center text-xs">
                        {cart?.products.length}
                      </span>
                    </div>
                    <div className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-black dark:bg-gray-800 dark:text-white dark:hover:text-white/75 cursor-pointer">
                      Đăng xuất
                    </div>
                  </div>
                ) : (
                  <>
                    <Link
                      className="rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white shadow-sm dark:hover:bg-gray-500"
                      href="/website/login"
                    >
                      Login
                    </Link>

                    <div className="hidden sm:flex">
                      <Link
                        className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-black dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                        href="/website/register"
                      >
                        Register
                      </Link>
                    </div>
                  </>
                )}
              </div>

              <div className="block md:hidden">
                <button className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
