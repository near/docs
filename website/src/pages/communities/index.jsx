import Layout from '@theme/Layout';
import styles from './communities.module.scss';

import TelegramIcon from '@site/static/assets/menu/telegram.svg';
import DiscordIcon from '@site/static/assets/menu/discord.svg';
import WeChatIcon from '@site/static/assets/menu/wechat.svg';
import GitHubIcon from '@site/static/assets/menu/github.svg';
import XIcon from '@site/static/assets/menu/x.svg';
import DocsIcon from '@site/static/assets/menu/docs.svg';
import SpeechBubbleIcon from '@site/static/assets/menu/speech-bubble.svg';
import Accordion from '../../components/UI/Accordion';
import Card from '../../components/UI/Card';

const urls = {
    devHub: 'neardevhub.org',
    discord: 'https://near.chat',
    discourse: 'https://gov.near.org',
    docs: 'https://docs.near.org',
    getFunding: 'https://www.near.org/funding',
    github: 'https://github.com/near',
    hackenproof: 'https://hackenproof.com/near',
    helpCenter: 'https://nearhelp.zendesk.com/hc/en-us',
    nearWallet: 'https://wallet.near.org/',
    nearWeek: 'https://subscribe.nearweek.com/',
    supportRequest: 'https://nearhelp.zendesk.com/hc/en-us/requests/new',
    telegram: 'https://t.me/neardev',
    twitter: 'https://twitter.com/nearprotocol',
    wechat: 'https://pages.near.org/wechat',
    withdrawNearFunds:
        'https://nearhelp.zendesk.com/hc/en-us/articles/360060927734-Staking-Unstaking-and-Withdrawing-NEAR',
    youtube: 'https://www.youtube.com/channel/UCuKdIYVN8iE3fv8alyk1aMw',
};

const featuredCommunities = [
    {
        icon: 'https://ipfs.near.social/ipfs/bafkreibysr2mkwhb4j36h2t7mqwhynqdy4vzjfygfkfg65kuspd2bawauu',
        name: 'NEAR Dev',
        summary: 'An open community for developers',
        accountId: 'nearai.community.devhub.near',
        telegram: 'nearaialpha',
    },
    {
        icon: 'https://ipfs.near.social/ipfs/bafkreihgxkxuvj67b7vwys5di2326vx7sdvw5jjswv2xqlyxhelhha52ra',
        name: 'NEAR AI',
        summary: 'A community for AI enthusiasts',
        accountId: 'nearai.community.devhub.near',
        telegram: 'nearaialpha',
    },
    {
        icon: 'https://ipfs.near.social/ipfs/bafkreibi2p7h2jailau6fwt4zf2xdifsqhc4dabsowmngzswpzr7r4ikiq',
        name: 'Chain Abstraction',
        summary: 'Chain and Account Abstraction',
        accountId: 'chain-abstraction.community.devhub.near',
        telegram: 'chain_abstraction',
    },
    {
        icon: 'https://ipfs.near.social/ipfs/bafkreidhehq7za5btjegq5u2rw5jmw2kygef2776d6qcpkopaa3nphg5pm',
        name: 'Tooling',
        summary: 'Supporting our tooling ecosystem',
        accountId: 'tooling.community.devhub.near',
        telegram: 'NEAR_Tools_Community_Group',
    },
    {
        icon: 'https://ipfs.near.social/ipfs/bafkreib45plxkuy6wcefachijuq2dm4jnfs4236yhfleehqboeeljpmxje',
        name: 'Docs',
        summary: 'A space to talk about all NEAR docs',
        accountId: 'docs.community.devhub.near',
        telegram: 'neardocscg',
    },
    {
        icon: 'https://ipfs.near.social/ipfs/bafkreicfcszhhmiw6bq5fvh7ebfqhmodplldxjve7id4mi67iykz67qehi',
        name: 'Build DAO',
        summary: 'The more you ship, the more you level up',
        accountId: 'build.community.devhub.near',
        telegram: '+bQmGfDqcAT9iYTcx',
    },
    {
        icon: 'https://ipfs.near.social/ipfs/bafkreihdu5bsnvxoxi62j24ljd4o5gfebtgtn6gaj3n4ebq23qoprn7tou',
        name: 'Wallet Builders',
        summary: 'Building Wallet infrastructure on NEAR',
        accountId: 'wallet.community.devhub.near',
        telegram: 'wallet-builders',
    },
    {
        icon: 'https://ipfs.near.social/ipfs/bafkreihmospumgywngdgtxpqftry3sykqyljr7xzvtqhlktg36vy4f4djq',
        name: 'Validators',
        summary: 'Ensuring a healthy & efficient ecosystem',
        accountId: 'validators.community.devhub.near',
        telegram: 'near_validators',
    },
    {
        icon: 'https://ipfs.near.social/ipfs/bafkreifydvg7r7e34j5chme633yjhk6lqyhbesmdcd2ninjx6dyl46qyey',
        name: 'Near Ukraine',
        summary: 'Community of Developers, Builders, Founders',
        accountId: 'nearukraine.community.devhub.near',
        telegram: 'nearprotocolua',
    },
];

const faqs = [
    {
        question: 'What is the expectation for a support resolution?',
        answer: `Upon submitting a support ticket, you can expect to receive an initial response from our team within 72 hours
          during our business hours. Our business hours are on weekdays in the PST timezone, excluding US holidays.`,
    },
    {
        question: 'Where can I find help to troubleshoot a development issue?',
        answer: (
            <>
                Social channels such as <a href={urls.telegram}>Telegram</a> and{' '}
                <a href={urls.discord}>Discord</a> are a great resource to tap into for community support on development
                issues. If you can&apos;t find a solution, please submit a{' '}
                <a href={urls.supportRequest}>support request</a> to our Customer Care team.
            </>
        ),
    },
    {
        question: 'Where can I find funding for my project?',
        answer: (
            <>
                You can find information on grants and funding opportunities on the{' '}
                <a href={'https://www.near.org/funding'}> main NEAR portal </a>.
            </>
        ),
    },
    {
        question: 'How can I find out about the latest product developments?',
        answer: (
            <>
                Follow <a href={urls.twitter}>NEAR on X</a> for our latest product announcements or subscribe to{' '}
                <a href={urls.nearWeek}>NEAR Week</a> to receive their weekly newsletter on ecosystem announcements.
            </>
        ),
    },
    {
        question: 'I found a bug — where can I flag this?',
        answer: (
            <>
                For any issues or concerns you&apos;ve encountered, please feel free to provide us with detailed information
                through our{' '}
                <a href={urls.hackenproof} target="_blank">
                    Bug Bounty Program
                </a>
                . Your cooperation and additional details will assist us in addressing and resolving any potential
                vulnerabilities effectively. We appreciate your proactive approach in helping us maintain the security and
                integrity of the NEAR ecosystem. If you have any further questions or need assistance, don&apos;t hesitate to
                reach out to us.
            </>
        ),
    },
    {
        question: 'What happened to Near Wallet?',
        answer: (
            <>
                As we embrace a more decentralized future, wallet.near.org will be discontinued. This change invites you to
                discover a variety of new and secure wallet options within our ecosystem. Your funds are safe! Accounts exist
                on the blockchain, not in a wallet. Wallets are just an interface into using the blockchain with your account.{' '}
                <a href={urls.nearWallet} target="_blank">
                    Learn more
                </a>{' '}
            </>
        ),
    },
    {
        question: 'Question about Transfer Exchange?',
        answer:
            "For issues relating to a third-party exchange, such as Binance or Coinbase we're unable to investigate issues on external platforms like these. To address your concern effectively, we recommend contacting the customer support team of the specific exchange where you're experiencing issues. They are most equipped to assist you in resolving the matter.",
    },
    {
        question: 'How do I withdraw NEAR funds?',
        answer: (
            <>
                Your NEAR funds are managed within your chosen wallet. To best address your question we suggest you visit the
                support site for your wallet that holds your NEAR funds. For generalized steps see{' '}
                <a href={urls.withdrawNearFunds}>this article</a>.
            </>
        ),
    },
];

const CommunitiesPage = () => {


    const handleCommunityClick = (community) => window.open(`https://t.me/${community.telegram}`, '_blank');

    return (
        <Layout
            title="Communities"
            description="Connect with the NEAR community through various channels and join specialized communities."
        >
            <section className={styles['container-communities']}>
                <Card
                    color="mint"
                    title="Have a question? Ask our experts"
                    description="NEAR is a global community of Web3 enthusiasts and innovators. Dive into one of our social channels to engage in discussion with our lively community."
                    className={styles['main-card']}
                >
                    <h4>CHANNELS</h4>
                    <div className={styles['channels-grid']}>
                        <a href={urls.telegram} className={styles['channel-item']}>
                            <TelegramIcon className={styles['channel-item__icon']} />
                            <span className={styles['channel-item__text']}>Telegram</span>
                            <span className={styles['channel-item__arrow']}>›</span>
                        </a>
                        <a href={urls.discord} className={styles['channel-item']}>
                            <DiscordIcon className={styles['channel-item__icon']} />
                            <span className={styles['channel-item__text']}>Discord</span>
                            <span className={styles['channel-item__arrow']}>›</span>
                        </a>
                        <a href={urls.github} className={styles['channel-item']}>
                            <GitHubIcon className={styles['channel-item__icon']} />
                            <span className={styles['channel-item__text']}>GitHub</span>
                            <span className={styles['channel-item__arrow']}>›</span>
                        </a>
                        <a href={urls.docs} className={styles['channel-item']}>
                            <DocsIcon className={styles['channel-item__icon']} />
                            <span className={styles['channel-item__text']}>Docs</span>
                            <span className={styles['channel-item__arrow']}>›</span>
                        </a>
                        <a href={urls.wechat} className={styles['channel-item']}>
                            <WeChatIcon className={styles['channel-item__icon']} />
                            <span className={styles['channel-item__text']}>WeChat</span>
                            <span className={styles['channel-item__arrow']}>›</span>
                        </a>
                        <a href={urls.twitter} className={styles['channel-item']}>
                            <XIcon className={styles['channel-item__icon']} />
                            <span className={styles['channel-item__text']}>X</span>
                            <span className={styles['channel-item__arrow']}>›</span>
                        </a>
                    </div>
                </Card>

                <div className={styles.sidebar}>
                    <Card
                        color="purple"
                        title="Office Hours:"
                        description="Jump in a voice call with our developers"
                        className={styles['sidebar-card']}
                    >
                        <p className={styles['sidebar-card__info']}>
                            <strong>Thursdays: 11:00hs & 18:00hs GMT</strong>
                        </p>
                        <div style={{ marginTop: '16px' }}>
                            <button className={styles['sidebar-card__button']}>
                                <DiscordIcon className={styles['sidebar-card__button-icon']} />
                                Join our Discord
                            </button>
                        </div>
                    </Card>

                    <Card
                        color="orange"
                        title="Resolve an issue"
                        description="Get in touch with our customer care team"
                        className={styles['sidebar-card']}
                    >
                        <div style={{ marginTop: '16px' }}>
                            <button className={styles['sidebar-card__button']}>
                                <SpeechBubbleIcon className={styles['sidebar-card__button-icon']} />
                                Launch support form
                            </button>
                        </div>
                    </Card>
                </div>
            </section>
            <section className={styles['communities-section']}>
                <div className={styles['communities-container']}>
                    <h2 className={styles['communities-title']}>Join a Community</h2>

                    <div className={styles['communities-grid']}>
                        {featuredCommunities.map((community, index) => (
                            <Card
                                key={index}
                                onClick={() => handleCommunityClick(community)}
                                className={styles['community-card']}
                            >
                                <div className={styles['community-content']}>
                                    <img
                                        src={community.icon}
                                        alt={`${community.name} icon`}
                                        className={styles['community-icon']}
                                    />
                                    <div className={styles['community-info']}>
                                        <h3 className={styles['community-name']}>{community.name}</h3>
                                        <p className={styles['community-summary']}>{community.summary}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            <section className={styles['communities-section']}>
                <div className={styles['communities-container']}>
                    <h2 className={styles['communities-title']}>Frequent Asked Questions</h2>
                    {faqs.map((faq, index) =>
                        <Accordion title={faq.question} detail={faq.answer} key={index} />
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default CommunitiesPage;