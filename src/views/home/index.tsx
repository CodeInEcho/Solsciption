// Next, React
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import https from '../../utils/request';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import { RequestAirdrop } from '../../components/RequestAirdrop';
import pkg from '../../../package.json';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';

export const HomeView: FC = ({ }) => {
    const wallet = useWallet();
    const colletionList = [
        {amt:  "1000", op: "mint", p: "spl-20", tick: "sols", image: "https://cdn.helius-rpc.com/cdn-cgi/image//https://nftstorage.link/ipfs/bafybeibzfinxv3liy3hmexlzr7o6lpfchwlckv25kmvcj6t6bhyavrowse" },
        {amt:  "100000", op: "mint", p: "spl-20", tick: "lamp", image: "https://cdn.helius-rpc.com/cdn-cgi/image//https://nftstorage.link/ipfs/bafybeidnbu3uutb47x4dgx4r6p2ee6xlkv4mfazldqzwbtmbacr636agie" },
        {amt:  "1000", op: "mint", p: "spl-20", tick: "pepe", image: "https://cdn.helius-rpc.com/cdn-cgi/image//https://nftstorage.link/ipfs/bafkreig3amgughvyerlt7az4wzeiwa6fbicwoun22dykuq6jrvzntwnxrm" },
    ]
    const { connection } = useConnection();
    const [ selectTick, setSelectTick ] = useState('');
    const [ assetsSpl20, setAssetsSpl20 ] = useState({});

    const getColletion = async () => {
        let spl20 = {};
        const response = await https.post('', {
            jsonrpc: '2.0',
            method: 'getAssetsByOwner',
            id: '98f58f80-a458-4af1-ad25-981d96098366',
            params: {
                ownerAddress: '5UB9cTdevNdBqAETaLM9bN8uxra3d8gBrPKnJt4zHmFt',
                displayOptions: {  showInscription: true },
            },
        });
        const result = response.data.result;
        result.items.map(item => {
            if (!spl20[item.spl20.tick]) {
                spl20[item.spl20.tick] = [];
                spl20[item.spl20.tick].push(item);
            } else {
                spl20[item.spl20.tick].push(item);
            }
        })
        setAssetsSpl20(spl20);
    }

    const selectCollection = (tick: string) => {
        setSelectTick(tick);
        document.getElementById('my_modal_1').close();
    }

    const balance = useUserSOLBalanceStore((s) => s.balance)
    const { getUserSOLBalance } = useUserSOLBalanceStore()

    useEffect(() => {
        if (wallet.publicKey) {
            getColletion()
            getUserSOLBalance(wallet.publicKey, connection)
        }
    }, [wallet.publicKey, connection, getUserSOLBalance])

    return (
        <div className="mx-auto pt-12 w-[100vw]">
            <div className="swap-contain px-6 py-4 bg-grey-800 w-[590px] rounded-2xl m-auto">
                <div className="swap-use">
                    <h2>You use</h2>
                    { selectTick === '' ? (
                        <div className="flex items-center flex-col py-10">
                            <div onClick={() => document.getElementById('my_modal_1').showModal()} className="w-60 h-60 bg-[#2B2D33E3] rounded-lg cursor-pointer"></div>
                        </div>
                    ) : (
                        <div className="flex items-center flex-col pt-8 pb-6">
                            <Image src="/sols.png" alt="logo icon" className="rounded-lg cursor-pointer" onClick={() => document.getElementById('my_modal_1').showModal()} width={160} height={160} />
                            <p className="font-bold text-xl py-3">Inscription #229394</p>
                            <p className="text-sm text-[#BFC4CA] py-1">Spl-20 (Ticker: <b className="text-[#ff5c28]">SOLS</b>  Amount: <b className="text-[#ff5c28]">1000</b>)</p>
                            <button className="w-36 mt-3 py-2 rounded-lg text-[#ff5c28] bg-[#131314] font-medium">Enable split</button>
                        </div>
                    ) }
                </div>
                <div className="flex justify-center">
                    <Image src="/switch.png" alt="logo icon" className="cursor-pointer" width={40} height={40} />
                </div>
                <div className="swap-receive">
                    <h2>To receive</h2>
                    <div className="p-4 my-4 h-[82px] border border-transparent relative bg-[#131314] dark:bg-v2-background-dark rounded-xl flex flex-col space-y-3 group focus-within:border-v2-primary/50 focus-within:shadow-swap-input-dark">
                        <div className="flex justify-between items-center group/select">
                            <div className="p-[10px] rounded-xl flex space-x-3 items-center bg-[#1D1E21] dark:bg-v2-background border dark:group-hover/select:border-v2-primary/50 dark:group-hover/select:bg-[rgba(199,242,132,0.2)] dark:group-hover/select:shadow-swap-input-dark border-transparent">
                                <Image src="/coin.png" alt="logo icon" className="rounded-lg" width={24} height={24} />
                                <div className="text-base font-semibold">sols</div>
                                <div className="flex items-center bg-[#00000040] px-2.5 py-0.5 space-x-1 rounded cursor-pointer text-white/75">
                                    <div className="text-xxs">so11...1122</div>
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col text-right h-full">
                                <input className="h-full w-full bg-transparent disabled:cursor-not-allowed dark:text-white text-right font-semibold dark:placeholder:text-white/25 text-base md:text-xl outline-noneh-full disabled:opacity-100 disabled:text-white outline-none" />
                            </div>
                        </div>
                    </div>
                </div>
                <button className="w-full my-3 py-3 rounded-lg text-black bg-[#ff5c28] font-medium">Split</button>
            </div>

            <dialog id="my_modal_1" className="modal" role="dialog">
                <div className="modal-box bg-[#1a212a] px-0">
                    <div className="px-6">
                        <h3 className="font-bold text-lg">Select SPL-20 Colletion</h3>
                        <p className="py-2 text-[#768597]">Select network and wallet you want to connect</p>
                    </div>
                    <div className="colletion-list pt-2">
                        {colletionList && colletionList.map(item => 
                            (<div key={item.tick} onClick={ () => selectCollection(item.tick) } className="list-items flex py-4 px-6 space-x-3 items-center hover:bg-[#262f3d] cursor-pointer">
                                <Image src={item.image} alt="logo icon" className="rounded-lg" width={50} height={50} />
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-white leading-5 truncate">{item.tick}</span>
                                    <span className="text-xs text-gray-500 dark:text-white-35 leading-5 truncate">Spl-20 (Ticker: <b className="text-[#ff5c28]">{item.tick}</b>  Amount: <b className="text-[#ff5c28]">{item.amt}</b>)</span>
                                </div>
                            </div>)
                        )}
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop"><button>close</button></form>
            </dialog>
        </div>
    );
};