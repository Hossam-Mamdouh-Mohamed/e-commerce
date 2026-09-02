import Link from "next/link";
import {
    Mail,
    MapPin,
    Phone,
} from "lucide-react";

import {
    FaFacebookF,
    FaGithub,
    FaLinkedinIn,
} from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Main Footer */}
                <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-6">

                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-3"
                        >
                            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold">
                                O
                            </div>

                            <span className="text-xl font-bold">
                                Ostoli
                            </span>
                        </Link>

                        <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
                            A complete platform for managing vehicles,
                            maintenance, operations, and reports efficiently.
                        </p>

                        {/* Social */}
                        <div className="mt-6 flex gap-2">
                            <Link
                                href="#"
                                aria-label="LinkedIn"
                                className="inline-flex size-10 items-center justify-center rounded-full border border-input bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                                <FaLinkedinIn className="size-4" />
                            </Link>

                            <Link
                                href="#"
                                aria-label="Facebook"
                                className="inline-flex size-10 items-center justify-center rounded-full border border-input bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                                <FaFacebookF className="size-4" />
                            </Link>

                            <Link
                                href="#"
                                aria-label="GitHub"
                                className="inline-flex size-10 items-center justify-center rounded-full border border-input bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                                <FaGithub className="size-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Platform */}
                    <div>
                        <h3 className="text-sm font-semibold">
                            Platform
                        </h3>

                        <ul className="mt-5 space-y-3">
                            <li>
                                <Link
                                    href="/dashboard"
                                    className="text-sm text-muted-foreground hover:text-foreground"
                                >
                                    Dashboard
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/vehicles"
                                    className="text-sm text-muted-foreground hover:text-foreground"
                                >
                                    Vehicles
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/maintenance"
                                    className="text-sm text-muted-foreground hover:text-foreground"
                                >
                                    Maintenance
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/reports"
                                    className="text-sm text-muted-foreground hover:text-foreground"
                                >
                                    Reports
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-sm font-semibold">
                            Company
                        </h3>

                        <ul className="mt-5 space-y-3">
                            <li>
                                <Link
                                    href="/about"
                                    className="text-sm text-muted-foreground hover:text-foreground"
                                >
                                    About
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/contact"
                                    className="text-sm text-muted-foreground hover:text-foreground"
                                >
                                    Contact
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/support"
                                    className="text-sm text-muted-foreground hover:text-foreground"
                                >
                                    Support
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/faq"
                                    className="text-sm text-muted-foreground hover:text-foreground"
                                >
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-sm font-semibold">
                            Legal
                        </h3>

                        <ul className="mt-5 space-y-3">
                            <li>
                                <Link
                                    href="/privacy"
                                    className="text-sm text-muted-foreground hover:text-foreground"
                                >
                                    Privacy Policy
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/terms"
                                    className="text-sm text-muted-foreground hover:text-foreground"
                                >
                                    Terms & Conditions
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/security"
                                    className="text-sm text-muted-foreground hover:text-foreground"
                                >
                                    Security
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold">
                            Contact
                        </h3>

                        <div className="mt-5 space-y-4 text-sm text-muted-foreground">

                            <a
                                href="mailto:support@example.com"
                                className="flex items-center gap-3 hover:text-foreground"
                            >
                                <Mail className="size-4 shrink-0" />
                                support@example.com
                            </a>

                            <a
                                href="tel:+201000000000"
                                className="flex items-center gap-3 hover:text-foreground"
                            >
                                <Phone className="size-4 shrink-0" />
                                +20 100 000 0000
                            </a>

                            <div className="flex items-center gap-3">
                                <MapPin className="size-4 shrink-0" />
                                Egypt
                            </div>

                        </div>
                    </div>
                </div>

                <Separator />

                {/* Bottom */}
                <div className="flex flex-col gap-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">

                    <p>
                        © {new Date().getFullYear()} Ostoli. All rights reserved.
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