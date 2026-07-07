import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  contenido: string;
}

export default function RenderizadorMarkdown({ contenido }: Props) {
  return (
    <div className="prosa">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children, ...rest }) => {
            const externo = !!href && /^https?:\/\//i.test(href);
            return (
              <a
                href={href}
                target={externo ? '_blank' : undefined}
                rel={externo ? 'noopener noreferrer' : undefined}
                {...rest}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {contenido}
      </ReactMarkdown>
    </div>
  );
}
