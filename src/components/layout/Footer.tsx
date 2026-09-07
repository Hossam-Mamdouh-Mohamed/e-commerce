import Link from "next/link";
import Image from "next/image";
import logo from '@/assets/images/freshcart-logo.svg'
import {
    Mail,
    MapPin,
    Phone,
} from "lucide-react";

import {
    FaEnvelope,
    FaFacebookF,
    FaGithub,
    FaInstagram,
    FaLinkedinIn,
    FaPhone,
    FaTwitter,
    FaYoutube,
} from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaLocationDot } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="border-t bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Main Footer */}
                <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-6">

                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="w-full">
                            <Image src={logo} alt="Freshcart" width={150} height={40} className="brightness-0 invert" />
                        </Link>

                        <p className="mt-5 max-w-sm text-sm leading-7 text-gray-400">
                            FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.
                        </p>

                        {/* Social */}
                        <div className="my-3">
                            <div className="flex gap-4 my-3">
                                <a href="tel:+18001234567"><FaPhone className="text-xl text-green-600" /></a>
                                <a href="tel:+18001234567" className="text-gray-400  hover:text-green-600">+1 (800) 123-4567</a>
                            </div>
                            <div className="flex gap-4 my-3">
                                <a href="mailto:support@freshcart.com"><FaEnvelope className="text-xl text-green-600" /></a>
                                <a href="mailto:support@freshcart.com" className="text-gray-400  hover:text-green-600">support@freshcart.com</a>
                            </div>
                            <div className="flex gap-4 my-3">
                                <span><FaLocationDot className="text-xl text-green-600" /></span>
                                <p className="text-gray-400  hover:text-green-600">123 Commerce Street, New York, NY 10001</p>
                            </div>
                        </div>
                        <div className="mt-6 flex gap-2">
                            <Link
                                href="#"
                                aria-label="Facebook"
                                className="inline-flex size-10 items-center justify-center rounded-full  border-input bg-gray-800 text-foreground transition-colors hover:bg-green-400">
                                <FaFacebookF className="text-xl text-gray-100" />
                            </Link>

                            <Link
                                href="#"
                                aria-label="Twitter"
                                className="inline-flex size-10 items-center justify-center rounded-full border-input bg-gray-800 text-foreground transition-colors hover:bg-green-400"
                            >
                                <FaTwitter className="text-xl text-gray-100" />
                            </Link>

                            <Link
                                href="#"
                                aria-label="Instagram"
                                className="inline-flex size-10 items-center justify-center rounded-full border-input bg-gray-800 text-foreground transition-colors hover:bg-green-400"
                            >
                                <FaInstagram className="text-xl text-gray-100" />
                            </Link>
                            <Link
                                href="#"
                                aria-label="Youtube"
                                className="inline-flex size-10 items-center justify-center rounded-full border-input bg-gray-800 text-foreground transition-colors hover:bg-green-400 "
                            >
                                <FaYoutube className="text-xl text-gray-100" />                            </Link>
                        </div>
                    </div>

                    {/* Platform */}
                    <div>
                        <h3 className="text-sm font-semibold text-white">
                            Shop
                        </h3>

                        <ul className="mt-5 space-y-3">
                            <li>
                                <Link
                                    href="/products"
                                    className="text-sm text-gray-400 hover:text-green-600"
                                >
                                    All Products
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/categories"
                                    className="text-sm text-gray-400 hover:text-green-600"
                                >
                                    Categories
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/brands"
                                    className="text-sm text-gray-400 hover:text-green-600"
                                >
                                    Brands
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/products?category=6439d58a0049ad0b52b9003f"
                                    className="text-sm text-gray-400 hover:text-green-600"
                                >
                                    Electronics
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/products?category=6439d2d167d9aa4ca970649f"
                                    className="text-sm text-gray-400 hover:text-green-600"
                                >
                                    Men's Fashion
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/products?category=6439d5b90049ad0b52b90048"
                                    className="text-sm text-gray-400 hover:text-green-600"
                                >
                                    Women's Fashion
                                </Link>
                            </li>

                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-sm font-semibold text-white">
                            Account
                        </h3>

                        <ul className="mt-5 space-y-3">
                            <li>
                                <Link
                                    href="/profile"
                                    className="text-sm text-gray-400 hover:text-green-600"
                                >
                                    My Account
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/profile/orders"
                                    className="text-sm text-gray-400 hover:text-green-600"
                                >
                                    Order History
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/wishlist"
                                    className="text-sm text-gray-400 hover:text-green-600"
                                >
                                    Wishlist
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/cart"
                                    className="text-sm text-gray-400 hover:text-green-600"
                                >
                                    Shopping Cart
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/login"
                                    className="text-sm text-gray-400 hover:text-green-600"
                                >
                                    Sign In
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/register"
                                    className="text-sm text-gray-400 hover:text-green-600"
                                >
                                    Create Account
                                </Link>
                            </li>

                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white">
                            Support
                        </h3>

                        <ul className="mt-5 space-y-3">
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-sm text-gray-400 hover:text-green-600"
                                >
                                    Contact Us
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/help"
                                    className="text-sm text-gray-400 hover:text-green-600"
                                >
                                    Help Center
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/shipping"
                                    className="text-sm text-gray-400 hover:text-green-600"
                                >
                                    Shipping Info
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/returns"
                                    className="text-sm text-gray-400 hover:text-green-600"
                                >
                                    Returns & Refunds
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/track-order"
                                    className="text-sm text-gray-400 hover:text-green-600"
                                >
                                    Track Order
                                </Link>
                            </li>

                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white">
                            Legal
                        </h3>

                        <ul className="mt-5 space-y-3">
                            <li>
                                <Link
                                    href="/privacy"
                                    className="text-sm text-gray-400 hover:text-green-600"
                                >
                                    Privacy Policy
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/terms"
                                    className="text-sm text-gray-400 hover:text-green-600"
                                >
                                    Terms of Service
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/cookies"
                                    className="text-sm text-gray-400 hover:text-green-600"
                                >
                                    Cookie Policy
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>

                <Separator />

                {/* Bottom */}
                <div className="flex flex-col gap-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">

                    <p>
                        © {new Date().getFullYear()} FreshCart. All rights reserved.
                    </p>

                    <div className="flex gap-6">
                        <Link
                            href="/privacy"
                            className="hover:text-foreground"
                        >
                            Privacy
                        </Link>

                        <Link
                            href="/terms"
                            className="hover:text-foreground"
                        >
                            Terms
                        </Link>
                    </div>

                </div>
            </div>
        </footer>
    );
}