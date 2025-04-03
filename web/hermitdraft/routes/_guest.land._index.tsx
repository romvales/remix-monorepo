import { Button } from '@components/ui/button'

import { content } from '@hermitdraft/content'

import { Link } from '@remix-run/react'

export default function Home() {

  return (
    <main className='container mx-auto'>
      
      <header>
        <h1>{content.name}</h1>
        <p>{content.tagline}</p>

        <nav>
          {content.nav.map((nav, i) => (
            <Button key={i} asChild>
              <Link to={nav.to}>
                {nav.label}
              </Link>
            </Button>
          ))}
        </nav>
      </header>

      <section>
        <p>{content.hero.main}</p>

        <ul>
          {content.benefits.map((benefit, i) => (
            <li key={i}>
              <div>
                <h3>{benefit.title}</h3>
                <p>{benefit.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Features</h2>
        <p>
          Hermitdraft uses modern browser features to store 
          your drafts and files directly on your device:
        </p>

        <ul>
          {content.features.map((feature, i) => (
            <li key={i}>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{content.convo.title}</h2>
        {content.convo.desc.map((desc, i) => (
          <p key={i}>{desc}</p>
        ))}
      </section>

      <section>
        <h2>{content.faqs.title}</h2>
        <p>{content.faqs.desc}</p>

        <ul>
          {content.faqs.items.map((item, i) => (
            <li>
              <div>
                <h3>{item.text}</h3>
                <p>{item.ans}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{content.cta.title}</h2>

        <nav>
          {content.cta.actions.map((nav, i) => (
            <Button key={i} asChild>
              <Link to={nav.to}>
                {nav.label}
              </Link>
            </Button>
          ))}
        </nav>
      </section>

    </main>
  )
}