export default function Navigation() {
  return (
    <ul className="flex items-center justify-end gap-4 [&_li]:font-medium [&_li]:text-foreground/60 [&_li]:text-sm [&_li]:leading-none [&_li]:transition [&_li]:hover:text-foreground [&_li]:hover:underline">
      <a href="https://lingua-lair.vercel.app" target="_blank" rel="noreferrer">
        <li>Docs</li>
      </a>
    </ul>
  )
}
