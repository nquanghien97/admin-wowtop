import { Button, Modal } from "antd";
import { useState } from "react";
import { useNotification } from "../../../hooks/useNotification";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../../services/user";

interface DeleteProps {
  open: boolean;
  onCancel: () => void;
  id: string;
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
}

function Delete(props: DeleteProps) {
  const { open, onCancel, id, setRefreshKey } = props

  const [loading, setLoading] = useState(false);

  const notification = useNotification();
  const navigate = useNavigate();
  const onSubmit = async () => {
    setLoading(true);
    try {
      await deleteUser(+id)
      notification.success('Xóa người dùng thành công')
      onCancel();
      setRefreshKey(pre => !pre)
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.") {
          navigate('/login')
          notification.error(err.message)
        } else {
          notification.error('Xóa người dùng thất bại')
        }
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      open={open}
      className='!p-0 !w-1/2'
      onCancel={onCancel}
      footer={false}
      wrapClassName='!p-0'
    >
      <div className="w-full text-center p-3 h-[60px] leading-[36px] bg-[#84571B] rounded-t-lg uppercase font-bold">{`Bạn có chắc chắn muốn xóa không?`}</div>
      <div className="flex justify-center gap-12 p-4">
        <Button type="primary" danger onClick={onCancel}>Hủy</Button>
        <Button type="primary" onClick={onSubmit} loading={loading}>Xác nhận</Button>
      </div>
    </Modal>
  )
}

export default Delete