interface DeleteNewsProps {
  open: boolean;
  onCancel: () => void;
  id: number;
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
}
function DeleteNews(props: DeleteNewsProps) {
  return (
    <div>DeleteNews</div>
  )
}

export default DeleteNews