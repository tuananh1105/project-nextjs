type Tab = {
    name: string
    value: string
    label: string
    image: string
  }

type ButtonProps = {
  name: string;
  icon: FC;
  onClick: () => void
}
  