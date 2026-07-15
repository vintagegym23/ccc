interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
}

const SectionHeading = ({
  eyebrow,
  heading,
  tone = 'light',
  align = 'left',
}: SectionHeadingProps) => {
  const eyebrowColor = tone === 'light' ? 'text-caramel' : 'text-matcha';
  const headingColor = tone === 'light' ? 'text-coffee' : 'text-milk';

  return (
    <div className={align === 'center' ? 'text-center' : ''}>
      <p
        className={`${eyebrowColor} text-[10px] tracking-[0.4em] uppercase mb-6 font-medium`}
      >
        {eyebrow}
      </p>
      <h2
        className={`${headingColor} font-display font-normal leading-[1.1]`}
        style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}
      >
        {heading}
      </h2>
    </div>
  );
};

export default SectionHeading;
