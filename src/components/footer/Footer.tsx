const features = [
  {
    icon: "W",
    title: "Segurança da carteira",
    text: "Proteja sua carteira e colecione arte digital verificada com confiança.",
  },
  {
    icon: "C",
    title: "Criadores em destaque",
    text: "Conheça artistas, estúdios e comunidades que moldam a cultura digital na rede.",
  },
  {
    icon: "D",
    title: "Alertas de lançamentos",
    text: "Receba calendários de cunhagem, novidades de listas de acesso e análises do mercado.",
  },
];

const linkColumns = [
  {
    title: "Meu perfil",
    links: [
      "Meu perfil",
      "Minha coleção",
      "Atividade",
      "Estúdio do criador",
      "Lista de interesse",
    ],
  },
  {
    title: "Central de ajuda",
    links: [
      "Central de ajuda",
      "Como comprar NFTs",
      "Carteira e segurança",
      "Política do mercado",
      "Denunciar item",
    ],
  },
  {
    title: "Coleções",
    links: ["Arte digital", "Fotografia", "Música", "Arte 3D", "Utilidade"],
  },
];

const socials = [
  {
    label: "Facebook",
    d: "M14 8h2V5h-2.5C11.6 5 10.5 6.2 10.5 8v2h-2v3h2v6h3v-6H16l.5-3h-3V8.5c0-.3.2-.5.5-.5Z",
  },
  {
    label: "Instagram",
    d: "M8 4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Zm4 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm4.7-2.2a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6Z",
  },
  {
    label: "Twitter",
    d: "M20 7.2c-.6.3-1.2.5-1.9.6.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8a3.3 3.3 0 0 0-5.6 3A9.4 9.4 0 0 1 5 6.3a3.3 3.3 0 0 0 1 4.4c-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.5.1-1 .2-1.5.1.4 1.3 1.6 2.3 3.1 2.3A6.6 6.6 0 0 1 4 17.2 9.3 9.3 0 0 0 9 18.7c6 0 9.4-5 9.4-9.4v-.4c.6-.5 1.2-1 1.6-1.7Z",
  },
  {
    label: "LinkedIn",
    d: "M6.5 9.5h2.7V18H6.5V9.5ZM7.8 5.5a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2ZM11 9.5h2.6v1.2c.4-.7 1.3-1.4 2.7-1.4 2.8 0 3.3 1.8 3.3 4.2V18h-2.7v-4c0-1 0-2.2-1.4-2.2s-1.6 1-1.6 2.1V18H11V9.5Z",
  },
  {
    label: "YouTube",
    d: "M20.5 8.2a2.2 2.2 0 0 0-1.5-1.5C17.7 6.4 12 6.4 12 6.4s-5.7 0-7 .3A2.2 2.2 0 0 0 3.5 8.2C3.2 9.5 3.2 12 3.2 12s0 2.5.3 3.8A2.2 2.2 0 0 0 5 17.3c1.3.3 7 .3 7 .3s5.7 0 7-.3a2.2 2.2 0 0 0 1.5-1.5c.3-1.3.3-3.8.3-3.8s0-2.5-.3-3.8ZM10.2 14.2V9.8l3.8 2.2-3.8 2.2Z",
  },
];

const wallets = ["MetaMask", "WalletConnect", "Coinbase"];

const link =
  "transition-colors hover:text-[#d4894a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4894a]";

export default function Footer() {
  return (
    <footer className="bg-kurio-card text-[13px] mt-14">
      {/* Destaques + newsletter */}
      <section className="py-7">
        <div className="mx-auto grid max-w-300 gap-y-8 px-7 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <article
              key={f.title}
              className={`px-3 ${i === 0 ? "lg:border-l-0 lg:pl-0" : ""} ${
                i === 2 ? "sm:border-l-0 sm:pl-0 lg:border-l lg:pl-3" : ""
              } ${i === 1 ? "sm:border-l sm:border-[#d4894a]/55" : "lg:border-l lg:border-[#d4894a]/55"}`}
            >
              <span
                aria-hidden="true"
                className="mb-4 grid size-14 place-items-center rounded-full bg-[#d4894a] text-lg font-bold text-[#2a1a10]"
              >
                {f.icon}
              </span>
              <h3 className="mb-2.5 text-[15px] font-bold">{f.title}</h3>
              <p className="max-w-42.5 text-[#c99f78]">{f.text}</p>
            </article>
          ))}

          <div className="px-3 sm:border-l sm:border-[#d4894a]">
            <h3 className="mb-3.5 text-[15px] font-bold leading-tight">
              Antecipe-se ao próximo lançamento
            </h3>
            <section className="mb-3.5 flex">
              <label htmlFor="kurio-email" className="sr-only">
                E-mail
              </label>
              <input
                id="kurio-email"
                type="email"
                required
                placeholder="digite seu e-mail..."
                className="h-8 min-w-0 flex-1 rounded-l bg-[#3b2a24] px-3 text-[#f1e4d6] placeholder:text-[#c99f78] focus-visible:outline focus-visible:outline-[#d4894a]"
              />
              <button
                type="submit"
                className="h-8 rounded-r bg-[#d4894a] px-3 text-[15px] font-bold text-[#2a1a10] hover:brightness-110 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#d4894a]"
              >
                Enviar
              </button>
            </section>
            <p className="text-xs text-[#c99f78]">
              Receba lançamentos selecionados, histórias de criadores e
              novidades do mercado.
            </p>
          </div>
        </div>
      </section>

      {/* Faixa de contato */}
      <section className="bg-[#38230f] py-5">
        <div className="mx-auto grid max-w-300 items-center gap-3 px-7 sm:grid-cols-2 lg:grid-cols-4">
          <strong className="text-xs tracking-[0.08em]">KURIO</strong>
          <span className="max-w-47.5 pr-4">
            Feito para colecionadores, criadores e cultura
          </span>
          <a href="mailto:contato@email.com" className={link}>
            contato@email.com
          </a>
          <a href="tel:+551140028922" className={link}>
            +55 11 4002 8922
          </a>
        </div>
      </section>

      {/* Links */}
      <section className="pb-7 pt-5">
        <div className="mx-auto grid max-w-300 gap-y-7 px-7 sm:grid-cols-2 lg:grid-cols-4">
          {linkColumns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h4 className="mb-2 text-base font-medium">{col.title}</h4>
              <ul className="space-y-1">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className={link}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h4 className="mb-2 text-base font-medium">Redes sociais</h4>
            <ul className="mb-5 flex gap-1.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href="#"
                    aria-label={s.label}
                    className="grid size-6 place-items-center rounded-[5px] border border-[#d4894a] text-[#d4894a] transition-colors hover:bg-[#d4894a] hover:text-kurio-card focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#d4894a]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="size-3.5"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d={s.d} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="mb-2.5 text-base font-medium">
              Carteiras compatíveis
            </h4>
            <p className="inline-block rounded-sm bg-[#3b2a24] px-2 py-1 text-[8px] font-bold uppercase tracking-wide text-[#d4894a]">
              {wallets.join(" · ")}
            </p>
          </div>
        </div>
      </section>

      <div className="bg-[#130d0c] px-4 py-2 text-center text-xs">
        © 2026 Kurio. Propriedade digital para todos.
      </div>
    </footer>
  );
}
