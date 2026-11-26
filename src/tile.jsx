// One lettered square. The status decides its colour through a CSS class.
export default function Tile({ letter, status }) {
  const className = ['tile', status, letter && !status ? 'filled' : '']
    .filter(Boolean)
    .join(' ');

  return <div className={className}>{letter}</div>;
}