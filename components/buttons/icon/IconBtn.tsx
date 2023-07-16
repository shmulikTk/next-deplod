interface IconBtnProps {
    icon?: JSX.Element[] | JSX.Element;
}

export default function IconBtn({ icon }: IconBtnProps) {
  return (
    <div className={`w-8 h-8 rounded-lg border-2 grid place-items-center shadow-sm bg-gradient-to-r from-[#e9ecef] to-[#e9ecef]`}>
        {icon}
    </div>
  )
}
