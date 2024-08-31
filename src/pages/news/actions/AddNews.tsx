
interface AddNewsProps {
  open: boolean;
  onClose: () => void;
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
}
function AddNews(props: AddNewsProps) {
  return (
    <div>AddNews</div>
  )
}

export default AddNews