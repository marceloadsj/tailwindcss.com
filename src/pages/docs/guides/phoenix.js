import { DocumentationLayout } from '@/layouts/DocumentationLayout'
import { FrameworkGuideLayout } from '@/layouts/FrameworkGuideLayout'
import { Steps } from '@/components/Steps'

let steps = [
  {
    title: 'Create your project',
    body: () => (
      <>
        <p>
          Start by creating a new Phoenix project if you don't have one set up already. You can follow
          the <a href="https://hexdocs.pm/phoenix/installation.html">Installation</a> guide to get up
          and running.
        </p>
        <p className="text-sm">
          Make sure you have PostgreSQL installed and running. See the Phoienix docs for more details.
        </p>
      </>
    ),
    code: {
      name: 'Terminal',
      lang: 'terminal',
      code: 'mix phx.new myproject\ncd myproject\nmix ecto.create',
    },
  },
  {
    title: 'Update your dependencies',
    body: () => (
      <p>
        Add the Phoenix Tailwind plugin to your Elixir dependencies.
      </p>
    ),
    code: {
      name: 'mix.exs',
      lang: 'elixir',
      code: `  defp deps do
    [
>     {:tailwind, "~> 0.1", runtime: Mix.env() == :dev}
    ]
  end`,
    },
  },
  {
    title: 'Configure the Phoenix Tailwind plugin',
    body: () => (
      <p>
        Phoenix uses the Standalone CLI to integrate with Tailwind CSS. You'll have to configure the
        version, and asset paths necessary.
      </p>
    ),
    code: {
      name: 'config.exs',
      lang: 'elixir',
      code: `  # Use Jason for JSON parsing in Phoenix
  config :phoenix, :json_library, Jason

> config :tailwind, version: "3.0.13", default: [
>   args: ~w(
>     --config=tailwind.config.js
>     --input=css/app.css
>     --output=../priv/static/assets/app.css
>   ),
>   cd: Path.expand("../assets", __DIR__)
> ]`,
    },
  },
  {
    title: 'Build tailwind on deploy',
    body: () => (
      <p>
        You need to explicitly enable watching during development by adding an entry to the <code>./config/dev.exs</code> file.
      </p>
    ),
    code: {
      name: 'mix.exs',
      lang: 'elixir',
      code: `  defp aliases do
    [
>     "assets.deploy": ["tailwind default --minify", "esbuild default --minify", "phx.digest"]
    ]
  ]`,
    },
  },
  {
    title: 'Enable watching during development',
    body: () => (
      <p>
        You need to explicitly enable watching during development by adding an entry to the <code>./config/dev.exs</code> file.
      </p>
    ),
    code: {
      name: 'dev.exs',
      lang: 'elixir',
      code: `  watchers: [
>   tailwind: {Tailwind, :install_and_run, [:default, ~w(--watch)]}
  ]`,
    },
  },
  {
    title: 'Install Tailwind CSS',
    body: () => (
      <p>
        Phoenix uses the Standalone CLI to integrate with Tailwind CSS. You'll have to configure the
        version, and asset paths necessary.
      </p>
    ),
    code: {
      name: 'Terminal',
      lang: 'terminal',
      code: `mix deps.get\nmix tailwind.install`,
    },
  },
  {
    title: 'Configure your template paths',
    body: () => (
      <p>
        Add the paths to all of your template files in your <code>assets/tailwind.config.js</code> file.
      </p>
    ),
    code: {
      name: 'tailwind.config.js',
      lang: 'js',
      code: `  module.exports = {
>   content: [
>     './js/**/*.js',
>     '../lib/*_web.ex',
>     '../lib/*_web/**/*.*ex',
>   ],
    theme: {
      extend: {},
    },
    plugins: [],
  }`,
    },
  },
  {
    title: 'Add the Tailwind directives to your CSS',
    body: () => (
      <p>
        Add the <code>@tailwind</code>{' '}
        directives for each of Tailwind’s layers to <code>./assets/css/app.css</code>
      </p>
    ),
    code: {
      name: 'app.css',
      lang: 'css',
      code: '@tailwind base;\n@tailwind components;\n@tailwind utilities;',
    },
  },
  {
    title: 'Remove the default CSS import',
    body: () => (
      <p>
        The css import in <code>./assets/js/app.js</code> must be removed as Phoenix is no longer handling the css build pipeline directly.
      </p>
    ),
    code: {
      name: 'app.js',
      lang: 'diff-js',
      code: `- // Remove this line if you add a your own CSS build pipeline (e.g postcss).
- import "../css/app.css"`,
    },
  },
  {
    title: 'Start your build process',
    body: () => (
      <p>
        Run your build process with <code>mix phx.server</code>.
      </p>
    ),
    code: {
      name: 'Terminal',
      lang: 'terminal',
      code: 'mix phx.server',
    },
  },
  {
    title: 'Start using Tailwind in your project',
    body: () => <p>Start using Tailwind’s utility classes to style your content.</p>,
    code: {
      name: 'index.html.heex',
      lang: 'html',
      code: `<h1 class="text-3xl font-bold underline">
  Hello world!
</h1>`,
    },
  },
]

export default function UsingPhoenix({ code }) {
  return (
    <FrameworkGuideLayout
      title="Install Tailwind CSS with Phoenix"
      description="Setting up Tailwind CSS in a Phoenix project."
    >
      <Steps steps={steps} code={code} />
    </FrameworkGuideLayout>
  )
}

export function getStaticProps() {
  let { highlightCode } = require('../../../../remark/utils')

  return {
    props: {
      code: steps.map(({ code }) => {
        if (code.lang && code.lang !== 'terminal') {
          return highlightCode(code.code, code.lang)
        }
        return code.code
      }),
    },
  }
}

UsingPhoenix.layoutProps = {
  meta: {
    title: 'Install Tailwind CSS with Phoenix',
    section: 'Installation',
  },
  Layout: DocumentationLayout,
  allowOverflow: false,
}
