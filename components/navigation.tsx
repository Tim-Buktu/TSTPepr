"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { MobileMenu } from "./mobile-menu";
import { useSession, signOut } from "next-auth/react";

export function Navigation() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const getProfileImage = () => {
    if (session?.user?.image && session.user.image.startsWith("https://")) {
      return session.user.image;
    }
    return "/beared.png";
  };

  const handleProfileClick = async () => {
    if (session) {
      router.push("/profile");
    }
  };

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Pe-Pr Logo" width={50} height={40} />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/products"
              className={`hover:text-gray-900 transition-colors ${
                pathname.startsWith("/products")
                  ? "text-burgundy-600"
                  : "text-gray-700"
              }`}
            >
              Products
            </Link>
            <Link
              href="/upcycle"
              className={`hover:text-gray-900 transition-colors ${
                pathname === "/upcycle" ? "text-burgundy-600" : "text-gray-700"
              }`}
            >
              Upcycle
            </Link>
            <Link
              href="/"
              className={`hover:text-gray-900 transition-colors ${
                pathname === "/" ? "text-burgundy-600" : "text-gray-700"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`hover:text-gray-900 transition-colors ${
                pathname === "/contact" ? "text-burgundy-600" : "text-gray-700"
              }`}
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/custom"
              className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors hidden md:block"
            >
              Custom Now!
            </Link>
            {status === "loading" ? (
              <div className="w-6 h-6 animate-pulse bg-gray-200 rounded-full" />
            ) : session ? (
              <div className="relative group">
                <button
                  onClick={handleProfileClick}
                  className="text-gray-700 hover:text-gray-900 hidden md:block"
                >
                  <div className="w-[30px] h-[30px] relative">
                    <Image
                      src={getProfileImage()}
                      alt="Profile"
                      fill
                      sizes="30px"
                      className="rounded-full object-cover transition-transform hover:scale-110"
                      onError={() => {
                        const imgElement = document.querySelector(
                          '[alt="Profile"]'
                        ) as HTMLImageElement;
                        if (imgElement) imgElement.src = "/beared.png";
                      }}
                    />
                  </div>
                </button>
                <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <button
                    onClick={handleProfileClick}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-gray-700 hover:text-gray-900 hidden md:block"
              >
                <Image
                  src="/user.png"
                  alt="Sign In"
                  width={24}
                  height={24}
                  className="transition-transform hover:scale-110"
                />
              </Link>
            )}
            <MobileMenu />
          </div>
        </div>
      </div>
      {pathname.startsWith("/products") && (
        <div className="container mx-auto px-4 py-2 hidden md:flex space-x-4 border-t border-gray-100">
          <Link
            href="/products/men"
            className={`hover:text-gray-900 transition-colors ${
              pathname === "/products/men" ? "font-bold" : "text-gray-700"
            }`}
          >
            Men
          </Link>
          <Link
            href="/products/women"
            className={`hover:text-gray-900 transition-colors ${
              pathname === "/products/women" ? "font-bold" : "text-gray-700"
            }`}
          >
            Women
          </Link>
        </div>
      )}
    </nav>
  );
}
