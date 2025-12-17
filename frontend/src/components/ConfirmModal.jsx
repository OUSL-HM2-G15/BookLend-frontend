import { Modal } from "antd";

function ConfirmModal({
  open,
  title = "Confirm",
  description,
  onConfirm,
  onCancel,
  okText = "Confirm",
  cancelText = "Cancel",
}) {
  return (
    <Modal
      title={title}
      open={open}
      onOk={onConfirm}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
    >
      {description}
    </Modal>
  );
}

export default ConfirmModal;

//  This component is reusable for any confirmation (borrow, delete, cancel, etc.)