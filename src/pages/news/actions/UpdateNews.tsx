interface EditNewsProps {
  open: boolean;
  onClose: () => void;
  id: number
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
}

function UpdateNews(props: EditNewsProps) {
  return (
    <div>UpdateNews</div>
  )
}

export default UpdateNews