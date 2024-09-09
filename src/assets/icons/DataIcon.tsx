interface DataIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

export default function DataIcon(props: DataIconProps) {
  const {
    color,
    ...rest
  } = props;
  return (
    <svg {...rest} color={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path d="M22 5v2h-3v3h-2V7h-3V5h3V2h2v3zm-3 14H5V5h6V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6h-2zm-4-6v4h2v-4zm-4 4h2V9h-2zm-2 0v-6H7v6z"></path>
    </svg>
  );
}