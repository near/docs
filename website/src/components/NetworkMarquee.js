import React, { useMemo } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import styles from './NetworkMarquee.module.scss';
import Marquee from "react-fast-marquee";

const NetworkMarquee = () => {
    const { colorMode } = useColorMode();
    const isDarkTheme = colorMode === 'dark';

    const evmNetworks = useMemo(() => [
        {
            name: 'Ethereum',
            image: '/img/crypto/eth.png',
        },
        {
            name: 'Avalanche',
            image: '/img/crypto/avax.png',
        },
        {
            name: 'Polygon',
            image: '/img/crypto/pol.png',
        },
        {
            name: 'Arbitrum',
            image: '/img/crypto/arb.png',
        },
        {
            name: 'Base',
            image: '/img/crypto/base.png',
        },
        {
            name: 'BNB Chain',
            image: '/img/crypto/bnb.png',
        }
    ], []);

    const nonEvmNetworks = useMemo(() => [
        {
            name: 'Bitcoin',
            image: '/img/crypto/btc.png',
        },
        {
            name: 'Solana',
            image: '/img/crypto/sol.png',
        },
        {
            name: 'Sui',
            image: '/img/crypto/sui.png',
        },
        {
            name: 'Aptos',
            image: '/img/crypto/apt.png',
        },
        {
            name: 'XRP Ledger',
            image: '/img/crypto/xrp.png',
        }
    ], []);

    const allNetworks = useMemo(() => [...evmNetworks, ...nonEvmNetworks, ...evmNetworks, ...nonEvmNetworks], [evmNetworks, nonEvmNetworks]);

    return (
        <div className={`${styles.networkMarquee} ${isDarkTheme ? styles.darkTheme : styles.lightTheme}`}>
            <div className={styles.carouselHeaderContainer}>
                <p className={styles.carouselHeader}>Supported Networks</p>
                <p className={styles.carouselDescription}>
                    Chain Signatures lets NEAR account sign and execute transactions across multiple blockchains, seamlessly and securely
                </p>
                <Link 
                    to="/chain-abstraction/chain-signatures"
                    className={styles.learnMoreLink}
                >
                    Learn More
                </Link>
            </div>
            <Marquee
                speed={50}
                pauseOnHover={true}
                delay={0}
                direction="left"
                style={{
                    width: '100vw',
                    marginLeft: 'calc(-50vw + 50%)',
                    marginRight: 'calc(-50vw + 50%)',
                    overflow: 'hidden',
                    padding: '8px 0'
                }}
            >
                {allNetworks.map((network, index) => (
                    <div
                        key={`${network.name}-${index}`}
                        className={styles.networkCardInner}
                    >
                        <img
                            src={network.image}
                            alt={`${network.name} logo`}
                            className={styles.networkLogo}
                            loading="lazy"
                            width="48"
                            height="48"
                        />
                        <span className={styles.networkName}>{network.name}</span>
                    </div>
                ))}
            </Marquee>

            <div className={styles.statsContainer}>
                <div className={styles.statItem}>
                    <span className={styles.statNumber}>1</span>
                    <span className={styles.statLabel}>NEAR Account</span>
                    <span className={styles.statDescription}>Unified Access</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statNumber}>{evmNetworks.length}+</span>
                    <span className={styles.statLabel}>EVM Networks</span>
                    <span className={styles.statDescription}>Widely Adopted</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statNumber}>{nonEvmNetworks.length}</span>
                    <span className={styles.statLabel}>Others Networks</span>
                    <span className={styles.statDescription}>Alternative Architectures</span>
                </div>
            </div>
            <div className={styles.featuresSection}>
                <p className={styles.featuresTitle}>Why Choose Chain Signatures?</p>
                <div className={styles.featuresContainer}>
                    <div className={styles.featureItem}>
                        <div className={styles.featureIcon}>🎯</div>
                        <div className={styles.featureContent}>
                            <span className={styles.featureHighlight}>Single Account, Multi-Chain Operations</span>
                            <p className={styles.featureDescription}>
                                Manage interactions with external blockchains from one NEAR account. Simplifies key management and reduces the need for multiple wallets
                            </p>
                        </div>
                    </div>
                    <div className={styles.featureItem}>
                        <div className={styles.featureIcon}>⚡</div>
                        <div className={styles.featureContent}>
                            <span className={styles.featureHighlight}>Reduced Cross-Chain Development Overhead</span>
                            <p className={styles.featureDescription}>
                                Write smart contracts on NEAR that directly sign for cross-chain transactions, cutting down on code redundancy and potential points of failure
                            </p>
                        </div>
                    </div>
                    <div className={styles.featureItem}>
                        <div className={styles.featureIcon}>🔐</div>
                        <div className={styles.featureContent}>
                            <span className={styles.featureHighlight}>Secure Transaction Signing with MPC</span>
                            <p className={styles.featureDescription}>
                                Decentralized signing process using Multi-Party Computation. No single entity controls the signing key, reducing centralized custodianship risks
                            </p>
                        </div>
                    </div>
                    <div className={styles.featureItem}>
                        <div className={styles.featureIcon}>₿</div>
                        <div className={styles.featureContent}>
                            <span className={styles.featureHighlight}>Bitcoin DeFi & Cross-Chain NFTs</span>
                            <p className={styles.featureDescription}>
                                Build DeFi applications leveraging Bitcoin liquidity, atomic swaps, and cross-chain NFT platforms with native cryptocurrency payments
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NetworkMarquee;