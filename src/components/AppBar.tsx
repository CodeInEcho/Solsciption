import { FC } from 'react';
import Link from "next/link";
import Image from 'next/image';
import dynamic from 'next/dynamic';
import React, { useState } from "react";
import { useAutoConnect } from '../contexts/AutoConnectProvider';
import NetworkSwitcher from './NetworkSwitcher';
import NavElement from './nav-element';

const WalletMultiButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);

export const AppBar: React.FC = () => {
    const { autoConnect, setAutoConnect } = useAutoConnect();
    const [isNavOpen, setIsNavOpen] = useState(false);
    return (
        <div>
            <div className="navbar flex h-[48px] lg:h-[60px] flex-row text-neutral-content bg-grey-700 border-grey-300 border-b">
                <div className="navbar-start items-center">
                    <div className="md:inline-flex items-center justify-items h-22 md:p-2 ml-10 gap-6">
                        <Link href="https://solana.com" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                            <Image src="/logo.png"  alt="logo icon" width={156} height={96} />
                        </Link>
                        <NavElement
                            label="Swap"
                            href="/"
                            navigationStarts={() => setIsNavOpen(false)}
                        />
                        <NavElement
                            label="White paper"
                            href="/basics"
                            navigationStarts={() => setIsNavOpen(false)}
                        />
                        <NavElement
                            label="Stake"
                            href="/basics"
                            navigationStarts={() => setIsNavOpen(false)}
                        />
                        <NavElement
                            label="sNFT"
                            href="/basics"
                            navigationStarts={() => setIsNavOpen(false)}
                        />
                        <div className="text-xs bg-primary-sols py-[2px] px-[4px] rounded-md text-black font-bold">Coming soon</div>
                    </div>
                </div>
                <div className="navbar-end">
                    <div className="hidden md:inline-flex align-items-center justify-items gap-6">
                        <WalletMultiButtonDynamic className="btn-ghost btn-sm text-sm rounded-lg mr-6 bg-primary-sols text-black transition" />
                    </div>
                    {/* <label
                        htmlFor="my-drawer"
                        className="btn-gh items-center justify-between md:hidden mr-6"
                        onClick={() => setIsNavOpen(!isNavOpen)}>
                        <div className="HAMBURGER-ICON space-y-2.5 ml-5">
                            <div className={`h-0.5 w-8 bg-purple-600 ${isNavOpen ? 'hidden' : ''}`} />
                            <div className={`h-0.5 w-8 bg-purple-600 ${isNavOpen ? 'hidden' : ''}`} />
                            <div className={`h-0.5 w-8 bg-purple-600 ${isNavOpen ? 'hidden' : ''}`} />
                        </div>
                        <div className={`absolute block h-0.5 w-8 animate-pulse bg-purple-600 ${isNavOpen ? "" : "hidden"}`}
                            style={{ transform: "rotate(45deg)" }}>
                        </div>
                        <div className={`absolute block h-0.5 w-8 animate-pulse bg-purple-600 ${isNavOpen ? "" : "hidden"}`}
                            style={{ transform: "rotate(135deg)" }}>
                        </div>
                    </label> */}
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} className="btn btn-square btn-ghost text-right mr-4">
                            <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="p-2 shadow menu dropdown-content bg-base-100 rounded-box sm:w-52">
                            <li>
                                <div className="form-control bg-opacity-100">
                                    <label className="cursor-pointer label">
                                        <a>Autoconnect</a>
                                        <input type="checkbox" checked={autoConnect} onChange={(e) => setAutoConnect(e.target.checked)} className="toggle" />
                                    </label>
                                    <NetworkSwitcher />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
