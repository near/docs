import Layout from '@theme/Layout'
import Card from '@site/src/components/UI/Card'


// Are you a developer building on NEAR? Do you have questions about the NEAR protocol, tools, or best practices? Join our weekly office hours to connect with technical experts and get your questions answered.
// Building a Smart Contract? A general question about the NEAR protocol? Book a session with Guille: https://calendar.app.google/6q2ssGUmvFcMoJk97


export default function OfficeHours() {

  return <>
    <Layout title="Office Hours" description="Book a session with our developer advocates">
      <main className="container--lg margin-vert--xl">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <h1>Office Hours</h1>
            <p>Are you a developer building on NEAR? Do you have questions about the NEAR protocol, tools, or best practices? Join our weekly office hours to connect with technical experts and get your questions answered.</p>
            <br />
            <h2 className="text--center padding-bottom--md"> What are you Building? </h2>
            <div className="row">
              <div className="col col--4 text--center">
                <Card title="Multi-chain">
                  <a href="https://calendly.com/owen-proximity/office-hours" className="button button--primary margin-bottom--sm">Book Support</a>
                </Card>
              </div>
              <div className="col col--4 text--center">
                <Card title="Smart Contracts">
                  <a href="https://calendar.app.google/6q2ssGUmvFcMoJk97" className="button button--primary margin-bottom--sm">Book Support</a>
                </Card>
              </div>
              <div className="col col--4 text--center">
                <Card title="Web3 App">
                  <a href="https://calendar.app.google/6q2ssGUmvFcMoJk97" className="button button--primary margin-bottom--sm">Book Support</a>
                </Card>
              </div>
            </div>
            <div className="row margin-top--lg" style={{ justifyContent: 'center' }}>
              <div className="col col--4 text--center">
                <Card title="Data Infra">
                  <a href="https://calendar.app.google/6q2ssGUmvFcMoJk97" className="button button--primary margin-bottom--sm">Book Support</a>
                </Card>
              </div>
              <div className="col col--4 text--center">
                <Card title="Tooling">
                  <a href="https://calendar.app.google/6q2ssGUmvFcMoJk97" className="button button--primary margin-bottom--sm">Book Support</a>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  </>
}