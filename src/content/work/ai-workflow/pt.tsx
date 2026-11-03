import type { WorkMeta } from "@/lib/work/meta";

export const meta = {
  slug: "ai-workflow",
  order: 1,
  title: "Reconstruindo um fluxo de desenvolvimento com IA",
  areas: ["backend", "ai"],
  stack: ["Agentes de IA", "TDD", ".NET"],
  featured: true,
  highlight: {
    type: "metric",
    value: "-60%",
    caption: "Instruções do agente · TDD · SDD",
  },
  role: "Estagiário de Desenvolvimento de Software, dti digital",
  period: "2026",
  draft: false,
} satisfies WorkMeta;

export default function Content() {
  return (
    <>
      <h2>O problema</h2>
      <p>
        Um fluxo de IA guiado por especificações tinha crescido para cerca de
        500 linhas de regras, lógica fixa no código e nenhuma disciplina de
        testes. O fluxo principal era pequeno; todo o resto atrapalhava.
      </p>

      <h2>Onde começou</h2>
      <p>
        Num time anterior, criei verificações de qualidade (pre-commit,
        pre-push) e uma etapa de “sabatina” que conferia cada especificação
        contra o código atual antes da implementação. Sem saber por que um
        ticket tinha sido bloqueado, ela apontou a mesma falta de dados do
        backend que o time tinha encontrado.
      </p>

      <h2>O que eu fiz</h2>
      <p>
        Comparei o fluxo com duas implementações de referência, tirei o que não
        se pagava e introduzi o ciclo red/green/refactor:
      </p>
      <ol>
        <li>
          <strong>Red:</strong> critérios de aceite viram comportamentos e
          testes que falham.
        </li>
        <li>
          <strong>Green:</strong> o menor código que faz os testes passarem.
        </li>
        <li>
          <strong>Refactor:</strong> limpar o código com os testes como rede de
          segurança.
        </li>
      </ol>

      <h2>O que eu faria diferente</h2>
      <p>
        Dividir em pull requests menores e apresentar uma proposta curta antes.
        Próximo passo: garantir o TDD com uma verificação automática, e não só
        com uma instrução.
      </p>
    </>
  );
}
