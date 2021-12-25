import React, { useState } from 'react';
import EasyCropper from 'react-easy-crop';
import { ICropper, IPixelCrop } from './types'
import { Slider, Button } from '@arco-design/web-react';
import { IconMinus, IconPlus, IconRotateLeft } from '@arco-design/web-react/icon';
import './index'

async function _getCroppedImg(url: string, pixelCrop: IPixelCrop, rotation = 0) {
  const image: HTMLImageElement = await new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = url;
  });

  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx || !image) {
    return null;
  }

  const imageSize = 2 * ((Math.max(image.width, image.height) / 2) * Math.sqrt(2));
  canvas.width = imageSize;
  canvas.height = imageSize;

  if (rotation) {
    ctx.translate(imageSize / 2, imageSize / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-imageSize / 2, -imageSize / 2);
  }
  
  
  ctx.drawImage(image, imageSize / 2 - image.width / 2, imageSize / 2 - image.height / 2);
  const data = ctx.getImageData(0, 0, imageSize, imageSize);

  canvas.width = pixelCrop.width; //图片左侧到九宫格左侧的距离
  canvas.height = pixelCrop.height;

  ctx.putImageData(
    data,
    Math.round(0 - imageSize / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - imageSize / 2 + image.height * 0.5 - pixelCrop.y)
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    });
  });
}

const Cropper: React.FC<ICropper> = (props: any) => {
  const { file, onOk, onCancel } = props
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [newFile, setNewFile] = useState(file);


  const url = React.useMemo(() => {
    return URL.createObjectURL(file);
  }, [file]);

  return (
    <div>
      <div style={{ width: '100%', height: 280, position: 'relative' }}>
        <EasyCropper
          style={{ containerStyle: { width: '100%', height: 280 } }}
          cropSize={{ width: 280, height: 280 }}
          aspect={4 / 4}
          image={url}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          onRotationChange={setRotation}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={async (_, pixels) => {
            const blob: any = await _getCroppedImg(url || '', pixels, rotation);
            if (blob) {
              const newFile = new File([blob], file.name || 'image', {
                type: file.type || 'image/*',
              });
              setNewFile(newFile);
            }
          }}
        />
      </div>
      <div className="sliderWrapper">
        <IconMinus
          style={{ marginRight: 10 }}
          onClick={() => {
            setZoom(Math.max(1, zoom - 0.1));
          }}
        />
        <Slider
          step={0.1}
          value={zoom}
          onChange={(v) => {
            (typeof v === 'number') && setZoom(v);
          }}
          min={0.8}
          max={3}
        />
        <IconPlus
          style={{ marginLeft: 10 }}
          onClick={() => {
            setZoom(Math.min(3, zoom + 0.1));
          }}
        />
          <IconRotateLeft
          onClick={() => {
            setRotation(rotation - 90);
          }}
        />
      </div>
      <div className="footerBtn">
      <Button onClick={() => onCancel()} style={{ marginRight: 20 }}>
          取消
        </Button>
        <Button
          type='primary'
          onClick={() => {
            onOk(newFile);
          }}
        >
          确定
        </Button>
      </div>
    </div>
  )
}
export default Cropper;