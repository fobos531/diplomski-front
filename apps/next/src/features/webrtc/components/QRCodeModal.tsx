import React, { useEffect, useState } from 'react';
import { Modal, Button, Text, Input, Row, Loading } from '@nextui-org/react';
import { QRCode } from 'react-qrcode-logo';
import { joinRoom } from 'app/features/webrtc/api';

interface QRCodeModalProps {
  visible: boolean;
  onClose: () => void;
  videoId: string;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ visible, onClose, videoId }) => {
  const [qrCode, setQrCode] = useState<string>('');

  useEffect(() => {
    const getQrCode = async () => {
      const token = await joinRoom(videoId);

      setQrCode(`${window.location.origin}/webrtc?videoId=${videoId}&token=${token}`);
    };

    getQrCode();
  }, []);

  return (
    <Modal closeButton aria-labelledby="modal-title" open={visible} onClose={onClose}>
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Join session on web
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Row justify="center">
          {qrCode ? (
            <QRCode
              value="https://github.com/gcoro/react-qrcode-logo"
              logoImage="data:image/png;base64,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"
              removeQrCodeBehindLogo
            />
          ) : (
            <Loading />
          )}
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QRCodeModal;